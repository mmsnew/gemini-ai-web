import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'VectorCraft AI',
  description: 'Generate SVG artwork with Gemini.',
};

const tailwindConfig = `
  tailwind.config = {
    theme: {
      extend: {
        animation: {
          'fade-in': 'fadeIn 0.5s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          }
        }
      }
    }
  };
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <Script id="tailwind-config" strategy="beforeInteractive">
          {tailwindConfig}
        </Script>
      </head>
      <body className="bg-zinc-950 antialiased">
        {children}
      </body>
    </html>
  );
}
