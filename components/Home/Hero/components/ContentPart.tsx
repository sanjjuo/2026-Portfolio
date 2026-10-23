"use client";
import VariableProximity from "@/components/VariableProximity";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

// Lines below the name fade up one after another on load (skipped with reduced motion).
const enter =
  "animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards motion-reduce:animate-none";

const serifAccent = "italic text-[#1a1a1a] [font-family:var(--font-fraunces)]";

export default function ContentPart() {
  const containerRef = React.useRef<HTMLHeadingElement>(null);
  return (
    <div className="container flex w-full flex-col items-center justify-center select-none h-screen">
      <div className="flex w-full flex-col items-center gap-4 md:gap-6">
        <h1 id="hero-title" ref={containerRef} className="relative text-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 -top-9 z-10 aspect-650/313 w-24 -rotate-8 bg-[#ff5a1f] animate-[sign_1.4s_cubic-bezier(0.6,0,0.2,1)_0.4s_both] motion-reduce:animate-none sm:-top-11 sm:w-32 md:-right-8 md:-top-14 md:w-40 lg:-right-12 lg:-top-16 lg:w-48"
            style={{
              maskImage: "url(/sanjeed.svg)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
            }}
          />
          <VariableProximity
            label={"MOHAMED SANJEED"}
            className="variable-proximity-demo leading-[1.05]"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
            smoothing={0.2}
            scale={1}
            lift={0}
            idleWave={false}
            fontSize="min(14vw, 13svh, 150px)"
          />
        </h1>

        <p
          className={`${enter} delay-150 flex w-full items-center justify-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-700 sm:gap-6 sm:text-sm md:text-base`}
        >
          <span
            aria-hidden="true"
            className="h-px max-w-40 flex-1 bg-neutral-400 max-sm:hidden"
          />
          <span className="whitespace-nowrap">
            Frontend Developer <span className="text-[#ff5a1f]">·</span> Dubai,
            UAE
          </span>
          <span
            aria-hidden="true"
            className="h-px max-w-40 flex-1 bg-neutral-400 max-sm:hidden"
          />
        </p>

        <p
          className={`${enter} delay-300 max-w-2xl text-center text-lg leading-snug text-neutral-600 sm:text-xl md:text-2xl`}
        >
          I build <em className={serifAccent}>fast</em>,{" "}
          <em className={serifAccent}>modern</em> websites and web apps that
          help startups and businesses grow online.
        </p>

        <div
          className={`${enter} delay-500 mt-2 flex flex-wrap items-center justify-center gap-3 select-auto`}
        >
          <Link
            href="#contact"
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#1a1a1a] pl-6 pr-1.5 font-medium text-white transition-colors duration-300 hover:bg-black md:h-14 md:pl-7 md:text-lg"
          >
            Let&apos;s talk
            <span className="grid size-9 place-content-center rounded-full bg-[#ff5a1f] transition-transform duration-500 group-hover:rotate-45 md:size-11">
              <ArrowUpRight className="size-5" />
            </span>
          </Link>
          <Link
            href="#works"
            className="inline-flex h-12 items-center rounded-full border border-[#1a1a1a] px-6 font-medium transition-colors duration-300 hover:bg-[#1a1a1a] hover:text-white md:h-14 md:px-7 md:text-lg"
          >
            See my work
          </Link>
        </div>
      </div>
    </div>
  );
}
