/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

interface GenerateSvgResponse {
  svg: string;
}

export const generateSvgFromPrompt = async (prompt: string): Promise<string> => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    const message = errorPayload?.error || 'Failed to generate SVG.';
    throw new Error(message);
  }

  const data = (await response.json()) as GenerateSvgResponse;
  return data.svg;
};
