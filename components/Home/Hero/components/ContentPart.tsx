"use client";
import VariableProximity from "@/components/VariableProximity";
import { site } from "@/lib/site";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const serifAccent = "font-serif font-normal italic";

const proximity = {
  fromFontVariationSettings: "'wght' 400, 'opsz' 9",
  toFontVariationSettings: "'wght' 1000, 'opsz' 40",
  radius: 140,
  falloff: "linear" as const,
  smoothing: 0.2,
  scale: 1,
  lift: 0,
  idleWave: false,
};

// Phones and tablets stack the hero top to bottom: details, name, statement,
// then the figure filling the rest. From lg up it layers: the giant name at
// the back, the figure in front of it, details on top. data-hero sets the
// order of the CSS intro (app/globals.css).
export default function ContentPart() {
  const nameRef = React.useRef<HTMLHeadingElement>(null);

  return (
    <div className="container relative flex h-full flex-col pt-6 md:pt-10 lg:pb-[9vh]">
      <div
        data-hero="1"
        className="relative z-20 grid grid-cols-2 items-center gap-4 font-mono text-[10px] uppercase tracking-[0.12em] whitespace-nowrap text-ink-muted sm:text-[11px] sm:tracking-[0.2em] md:text-xs lg:grid-cols-3"
      >
        <span>{site.role}</span>
        <span className="hidden text-center lg:block">
          Currently @ EUNX Investments
        </span>
        <span className="flex items-center justify-end gap-2 text-ink">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          Available for work
        </span>
      </div>

      {/* The name, over two staggered lines. Behind the figure from lg up. */}
      <h1
        id="hero-title"
        ref={nameRef}
        aria-label={site.name}
        className="relative z-12 mt-[6svh] select-none text-[16vw] leading-[0.82] lg:absolute lg:inset-x-12 lg:top-[16%] lg:mt-0 lg:text-[14vw]"
      >
        <span data-hero="2" className="block text-left">
          <VariableProximity
            label="MOHAMED"
            className="variable-proximity-demo"
            containerRef={nameRef}
            {...proximity}
          />
        </span>
        <span data-hero="3" className="relative block text-right">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-[0.42em] right-[1%] z-10 aspect-650/313 w-[1.5em] -rotate-8 bg-brand animate-[sign_1.4s_cubic-bezier(0.6,0,0.2,1)_calc(var(--intro-delay)+1.2s)_both] motion-reduce:animate-none"
            style={{
              maskImage: "url(/sanjeed.svg)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
            }}
          />
          <VariableProximity
            label="SANJEED"
            className="variable-proximity-demo"
            containerRef={nameRef}
            {...proximity}
          />
        </span>
      </h1>

      {/* Statement and actions: right under the name on phones (buttons float
          at the bottom), at the bottom-left from lg up. */}
      <div className="z-20 mt-5 flex items-end justify-between gap-8 sm:mt-7 lg:mt-auto">
        <div className="max-w-xl space-y-6 lg:max-w-md">
          <p
            data-hero="5"
            className="text-xl font-medium leading-[1.15] tracking-tight sm:text-2xl lg:text-3xl"
          >
            I build <em className={serifAccent}>fast</em>,{" "}
            <em className={serifAccent}>modern</em> websites &amp; web apps that
            help businesses <span className="text-brand">grow online.</span>
          </p>

          <div
            data-hero="6"
            className="z-20 flex flex-wrap items-center gap-3 max-lg:absolute max-lg:inset-x-6 max-lg:bottom-[12svh] md:max-lg:inset-x-12"
          >
            <Link
              href="#contact"
              data-magnetic
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink pl-6 pr-1.5 font-medium text-paper transition-colors duration-300 hover:bg-black md:h-14 md:pl-7 md:text-lg"
            >
              Let&apos;s talk
              <span className="grid size-9 place-content-center rounded-full bg-brand transition-transform duration-500 group-hover:rotate-45 md:size-11">
                <ArrowUpRight className="size-5" />
              </span>
            </Link>
            <Link
              href="#works"
              data-magnetic
              className="inline-flex h-12 items-center rounded-full border border-ink bg-paper/70 px-6 font-medium backdrop-blur-sm transition-colors duration-300 hover:bg-ink hover:text-paper md:h-14 md:px-7 md:text-lg"
            >
              See my work
            </Link>
          </div>
        </div>

        {/* Spinning "scroll" badge. */}
        <a
          data-hero="6"
          href="#about"
          aria-label="Scroll to explore"
          className="group relative hidden size-36 shrink-0 place-content-center lg:grid xl:size-44"
        >
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="absolute inset-0 size-full animate-[spin_16s_linear_infinite] motion-reduce:animate-none"
          >
            <defs>
              <path
                id="hero-badge-circle"
                d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
              />
            </defs>
            <text className="fill-ink text-[8px] font-medium uppercase">
              <textPath
                href="#hero-badge-circle"
                textLength="250"
                lengthAdjust="spacing"
              >
                Scroll to explore ✦ Scroll to explore ✦
              </textPath>
            </text>
          </svg>
          <span
            data-magnetic="0.5"
            className="grid size-14 place-content-center rounded-full bg-ink text-paper transition-colors duration-300 group-hover:bg-brand lg:size-16"
          >
            <ArrowDown className="size-5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
        </a>
      </div>

      {/* The figure: a head-to-thigh crop fading out at the bottom, above the
          hero's stepped edge (z-10). On phones it fills the space left under
          the statement; from lg up it stands on the bottom edge beside it.
          Shown close to its natural size so it stays sharp. On large
          screens it drifts slower than the page while scrolling. */}
      <div
        data-anim="parallax"
        data-speed="12"
        data-parallax-from="1024"
        className="pointer-events-none relative z-15 mt-1 flex min-h-0 flex-1 justify-center lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:flex-none lg:justify-end lg:pr-[3%] xl:justify-center xl:pr-0 xl:pl-[20%]"
      >
        <div
          data-hero="4"
          className="relative aspect-[0.88] h-full max-w-full overflow-hidden mask-[linear-gradient(to_bottom,black_62%,transparent_97%)] lg:h-[76svh] xl:h-[84svh]"
        >
          <Image
            src="/aboutme.png"
            alt="Illustration of Mohamed Sanjeed"
            width={608}
            height={1088}
            loading="eager"
            fetchPriority="high"
            quality={90}
            sizes="(min-width: 1024px) 74vh, 60vh"
            className="absolute -top-[5%] left-1/2 lg:top-[2%] h-[158%] w-auto max-w-none -translate-x-1/2"
          />
        </div>
      </div>
    </div>
  );
}
