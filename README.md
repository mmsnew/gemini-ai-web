<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally with Next.js (frontend + backend API).

View your app in AI Studio: https://ai.studio/apps/bundled/svg_generator

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env.local` (or copy `.env.example`) and set `GEMINI_API_KEY` (server-side only). Optional: set `GEMINI_MODEL` (default: `gemini-2.5-flash`).
3. Run the app:
   `npm run dev`

## Troubleshooting

If `/api/generate` fails with `TypeError: fetch failed sending request`, the server likely cannot reach Gemini API.
Try one of these:

1. If you are behind a proxy:
   - Set `HTTPS_PROXY` (and optionally `HTTP_PROXY`) in `.env.local`
2. If you are on an IPv6-hostile network:
   - Set `PREFER_IPV4=1` in `.env.local`
