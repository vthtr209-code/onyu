import type { Metadata } from "next";

// Self-hosted fonts (avoids fetching from Google Fonts at build time).
import "@fontsource/playfair-display/latin-600.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/playfair-display/latin-600-italic.css";
import "@fontsource/playfair-display/vietnamese-600.css";
import "@fontsource/playfair-display/vietnamese-700.css";
import "@fontsource/playfair-display/vietnamese-600-italic.css";
import "@fontsource/noto-serif-kr/600.css";
import "@fontsource/noto-serif-kr/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/vietnamese-400.css";
import "@fontsource/inter/vietnamese-500.css";
import "@fontsource/inter/vietnamese-600.css";
import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/500.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "Onyu — Burnout & Workplace Well-being Knowledge Library",
  description:
    "Onyu is Korea's knowledge library on burnout and workplace well-being, in English, Korean, and Vietnamese.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ivory text-ink">{children}</body>
    </html>
  );
}
