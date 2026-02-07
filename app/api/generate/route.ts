import { NextRequest } from 'next/server';
import { generateSvgFromPrompt } from '../../../services/geminiService';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== 'string') {
      return Response.json({ error: 'Prompt is required.' }, { status: 400 });
    }

    const svg = await generateSvgFromPrompt(prompt.trim());
    return Response.json({ svg });
  } catch (error: any) {
    const message = error?.message || 'Failed to generate SVG.';
    const cause = error?.cause;
    console.error('Generate API Error:', {
      message,
      name: error?.name,
      stack: error?.stack,
      cause: cause
        ? {
            name: cause?.name,
            message: cause?.message,
            stack: cause?.stack,
          }
        : undefined,
    });
    return Response.json({ error: message }, { status: 500 });
  }
}
