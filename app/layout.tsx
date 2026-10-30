import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Fraunces,
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const sansFont = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const monoFont = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serifFont = Fraunces({
  variable: "--font-fraunces",
  axes: ["opsz"],
  subsets: ["latin"],
});

// Display face for the hero name: a condensed, heavy grotesque that eases
// thinner as the cursor comes close (VariableProximity).
const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  axes: ["opsz", "wdth"],
  subsets: ["latin"],
});

const description =
  "Mohamed Sanjeed is a frontend developer in Dubai, UAE, building fast, responsive and animated web apps with React, Next.js, TypeScript and GSAP.";

export const metadata: Metadata = {
  title: "Mohamed Sanjeed — Frontend Developer",
  description,
  keywords: [
    "Mohamed Sanjeed",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Dubai",
    "UAE",
    "Portfolio",
  ],
  authors: [{ name: "Mohamed Sanjeed" }],
  openGraph: {
    title: "Mohamed Sanjeed — Frontend Developer",
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Sanjeed — Frontend Developer",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        sansFont.variable,
        monoFont.variable,
        serifFont.variable,
        displayFont.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <div className="pointer-events-none fixed inset-y-0 inset-x-2 z-40 mx-auto max-w-400 border-x border-black/20 md:inset-x-4" />
      </body>
    </html>
  );
}
