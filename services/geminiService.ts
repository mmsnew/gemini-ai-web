/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from '@google/genai';
import dns from 'dns';
import { ProxyAgent, setGlobalDispatcher } from 'undici';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set in the server environment.');
}

const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
if (proxyUrl) {
  setGlobalDispatcher(new ProxyAgent(proxyUrl));
}

if (process.env.PREFER_IPV4 === '1') {
  dns.setDefaultResultOrder('ipv4first');
}

const ai = new GoogleGenAI({ apiKey });

const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

/**
 * Generates an SVG string based on the user's prompt.
 * This runs on the server only.
 */
export async function generateSvgFromPrompt(prompt: string): Promise<string> {
  const systemPrompt = `
    You are a world-class expert in Scalable Vector Graphics (SVG) design and coding.
    Your task is to generate a high-quality, visually stunning, and detailed SVG based on the user's description of an object or item.

    Guidelines:
    1.  **Output Format**: Return ONLY the raw SVG code. Do not wrap it in markdown code blocks (e.g., no \`\`\`xml). Do not add any conversational text before or after.
    2.  **Quality**: Use gradients, proper pathing, and distinct colors to create depth and visual appeal. Avoid simple stroked lines unless requested. The style should be "flat art" or "material design" unless specified otherwise.
    3.  **Technical**:
        - Always include a \`viewBox\` attribute.
        - Ensure the SVG is self-contained (no external references).
        - Use semantic IDs or classes if helpful, but inline styles are preferred for portability.
        - Default size should be square (e.g., 512x512) unless the aspect ratio suggests otherwise.
  `;

  const fullPrompt = `Create an SVG representation of the following object/item: "${prompt}"`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: fullPrompt,
    config: {
      systemInstruction: systemPrompt,
      temperature: 0.4,
      topP: 0.95,
      topK: 40,
    },
  });

  const rawText = response.text || '';
  const svgMatch = rawText.match(/<svg[\s\S]*?<\/svg>/i);

  if (svgMatch && svgMatch[0]) {
    return svgMatch[0];
  }

  return rawText.replace(/```xml/g, '').replace(/```svg/g, '').replace(/```/g, '').trim();
}
