import type { Metadata } from "next";
import { Eczar, Jaini, Newsreader, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const eczar = Eczar({
  variable: "--font-eczar",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700", "800"],
});

const jaini = Jaini({
  variable: "--font-jaini",
  subsets: ["devanagari"],
  weight: "400",
});

const tiroDevanagari = Tiro_Devanagari_Hindi({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const newsreader = Newsreader({
  variable: "--font-latin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "शाश्वत सत्य | Shashvat Satya",
  description:
    "Obituaries, shradhanjali, and tributes honoring India's martyrs and departed souls.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hi"
      className={`${eczar.variable} ${jaini.variable} ${tiroDevanagari.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink">{children}</body>
    </html>
  );
}
