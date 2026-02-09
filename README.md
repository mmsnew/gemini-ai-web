<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# VectorCraft AI (Next.js)

This project is a Next.js full-stack app that generates SVG artwork via Gemini. The Gemini API key is stored **server-side only** and used inside the `/api/generate` route, so it never ships to the browser.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in `.env.local` (server-side only):
   `GEMINI_API_KEY=your_key_here`
3. Run the app:
   `npm run dev`

Then open http://localhost:3000.
