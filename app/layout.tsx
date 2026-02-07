import './globals.css';
import React from 'react';

export const metadata = {
  title: 'VectorCraft AI',
  description: 'Generate stunning SVGs with Gemini',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
        {children}
      </body>
    </html>
  );
}
