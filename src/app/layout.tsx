import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Lato, Manrope } from "next/font/google";
import { LanguageProvider, languageBootScript } from "@/i18n/LanguageProvider";
import { en } from "@/i18n/dictionaries/en";
import "./globals.css";

/* EN interface + hero display type (Lato has no Cyrillic) */
const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "swap",
});

/* RU interface + hero display type: contemporary grotesk with full Cyrillic */
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
  preload: false,
});

/* editorial serif for both languages */
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
};

export const viewport: Viewport = {
  themeColor: "#e9e1d5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${manrope.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageBootScript }} />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
