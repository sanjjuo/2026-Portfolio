import type { Metadata } from "next";
import { Geist, Geist_Mono, Englebert, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const appFont = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const monoFont = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appFont2 = Englebert({
  variable: "--font-englebert",
  weight: ["400"],
  subsets: ["latin"],
});

const appFont3 = Fraunces({
  variable: "--font-fraunces",
  axes: ["opsz"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohamed Sanjeed — Frontend Developer",
  description:
    "Portfolio of Mohamed Sanjeed, a frontend developer based in Dubai, UAE.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        appFont.variable,
        monoFont.variable,
        appFont2.variable,
        appFont3.variable,
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
