import DotGridBackground from "@/components/common/DotGridBackground/DotGridBackground";
import { ArrowDown, Clock, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import DubaiTime from "./DubaiTime";

// Set to false when you are not taking new work.
const isAvailable = true;

// The "Download CV" button only shows once public/cv.pdf exists.
const hasCv = existsSync(join(process.cwd(), "public", "cv.pdf"));

const pill =
  "inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#1a1a1a] px-3 text-xs font-medium text-white sm:h-12 sm:gap-2 sm:px-5 sm:text-base lg:h-14 lg:text-lg";

export default function ImageSection() {
  return (
    <div className="relative h-120 overflow-hidden sm:h-160 md:h-200">
      <DotGridBackground
        height="100%"
        width="100%"
        activeColor="#3a3446"
        baseColor="#3a3446"
        backgroundColor="#FFE862"
      />

      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 select-none text-center font-bold uppercase leading-none text-white/70 sm:top-28 md:top-44"
        style={{
          fontFamily: "var(--font-fraunces)",
          fontSize: "min(24vw, 340px)",
        }}
      >
        Hello
      </p>

      <Image
        src="/aboutme.png"
        alt="Portrait of Mohamed Sanjeed"
        width={2500}
        height={2500}
        sizes="(min-width: 768px) 800px, (min-width: 640px) 600px, 440px"
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-auto w-full max-w-110 sm:max-w-150 md:max-w-200 object-contain"
      />

      <p className="container absolute inset-x-0 top-16 z-20 text-xs font-medium uppercase tracking-[0.25em] sm:top-20 md:top-32 md:text-sm">
        ( About me )
      </p>

      <div className="container absolute inset-x-0 bottom-36 z-20 hidden items-end justify-between xl:flex">
        <p className="max-w-64 text-lg font-medium leading-snug">
          I&apos;m Sanjeed, a frontend developer turning ideas into fast,
          accessible and good-looking web experiences.
        </p>

        <div className="flex flex-col items-end">
          <p
            className="text-8xl font-bold leading-none"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            2+
          </p>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.25em]">
            Years of experience
          </p>
          {hasCv && (
            <Link
              href="/cv.pdf"
              download
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-black px-5 py-2.5 font-medium transition-colors duration-300 hover:bg-black hover:text-[#FFE862]"
            >
              Download CV
              <Download className="size-4" />
            </Link>
          )}
        </div>
      </div>

      <div className="container absolute inset-x-0 bottom-5 z-30 flex items-center justify-between gap-2 md:grid md:grid-cols-3">
        {isAvailable ? (
          <p className={`${pill} justify-self-start`}>
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
            </span>
            Available for freelance
          </p>
        ) : (
          <span />
        )}

        <span
          aria-hidden="true"
          className={`${pill} justify-self-center max-md:hidden`}
        >
          Scroll
          <ArrowDown className="size-4 animate-bounce lg:size-5" />
        </span>

        <p className={`${pill} justify-self-end`}>
          <Clock className="size-4 max-sm:hidden lg:size-5" />
          <DubaiTime />
        </p>
      </div>
    </div>
  );
}
