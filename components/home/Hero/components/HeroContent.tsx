"use client";
import VariableProximity from "@/components/effects/VariableProximity";
import { site } from "@/lib/site";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const serifAccent = "font-serif font-normal italic";

const proximity = {
  fromFontVariationSettings: "'wght' 800",
  toFontVariationSettings: "'wght' 250",
  radius: 140,
  falloff: "linear" as const,
  smoothing: 0.2,
  scale: 1,
  lift: 0,
  idleWave: false,
};

// A layered poster on every screen: the giant name at the back, the figure
// standing in front of it on the bottom edge, and the statement and actions
// on top. Phones and tablets center it all, with the statement over the
// faded lower part of the figure; from lg up the statement sits at the
// bottom-left beside it. data-hero sets the order of the CSS intro
// (app/globals.css).
export default function HeroContent() {
  const nameRef = React.useRef<HTMLHeadingElement>(null);

  return (
    <div className="container relative flex h-full flex-col pt-6 md:pt-10 lg:pb-[9vh]">
      <div
        data-hero="1"
        className="relative z-20 grid grid-cols-2 items-center gap-4 font-mono text-[9px] uppercase tracking-[0.06em] min-[360px]:text-[10px] min-[360px]:tracking-[0.12em] whitespace-nowrap text-ink-muted sm:text-[11px] sm:tracking-[0.2em] md:text-xs lg:grid-cols-3"
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
        className="relative z-12 mt-[4svh] select-none text-[min(23vw,30svh)] leading-[0.84] uppercase md:mt-[3svh] lg:absolute lg:inset-x-12 lg:top-[16%] lg:mt-0 lg:text-[16vw]"
      >
        <span data-hero="2" className="block text-left">
          <VariableProximity
            label="MOHAMED"
            containerRef={nameRef}
            {...proximity}
          />
        </span>
        <span data-hero="3" className="relative block text-right">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[-0.42em] right-[1%] z-10 aspect-650/313 w-[1.5em] -rotate-8 bg-brand animate-[sign_1.4s_cubic-bezier(0.6,0,0.2,1)_calc(var(--intro-delay)+1.2s)_both] motion-reduce:animate-none"
            style={{
              maskImage: "url(/images/signature.svg)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
            }}
          />
          <VariableProximity
            label="SANJEED"
            containerRef={nameRef}
            {...proximity}
          />
        </span>
      </h1>

      {/* Paper fade behind the statement on phones and tablets, so it reads
          clearly over the figure. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-16 h-[50%] bg-linear-to-t from-paper from-40% via-paper/80 to-transparent lg:hidden"
      />

      {/* Statement and actions: centered at the bottom over the figure on
          phones and tablets, at the bottom-left beside it from lg up. */}
      <div className="relative z-20 mt-auto flex items-end justify-center gap-8 pb-[max(13svh,6.5rem)] md:pb-[17svh] lg:justify-between lg:pb-0">
        <div className="max-w-md space-y-4 max-lg:text-center min-[360px]:space-y-5 sm:space-y-6 md:max-w-lg lg:max-w-md">
          <p
            data-hero="5"
            className="text-lg font-medium leading-[1.15] tracking-tight min-[360px]:text-xl sm:text-2xl lg:text-3xl"
          >
            I build <em className={serifAccent}>fast</em>,{" "}
            <em className={serifAccent}>modern</em> websites &amp; web apps that
            help businesses <span className="text-brand">grow online.</span>
          </p>

          <div
            data-hero="6"
            className="flex items-center gap-2 max-lg:justify-center min-[360px]:gap-3"
          >
            <a
              href="#contact"
              data-magnetic
              className="group inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full bg-ink pl-4 pr-1.5 text-[15px] font-medium min-[360px]:h-12 min-[360px]:gap-3 min-[360px]:pl-6 min-[360px]:text-base text-paper transition-colors duration-300 hover:bg-black md:h-14 md:pl-7 md:text-lg"
            >
              Let&apos;s talk
              <span className="grid size-8 place-content-center rounded-full bg-brand min-[360px]:size-9 transition-transform duration-500 group-hover:rotate-45 md:size-11">
                <ArrowUpRight className="size-5" />
              </span>
            </a>
            <a
              href="#works"
              data-magnetic
              className="inline-flex h-11 shrink-0 items-center rounded-full border border-ink bg-paper/70 px-4 text-[15px] font-medium min-[360px]:h-12 min-[360px]:px-6 min-[360px]:text-base backdrop-blur-sm transition-colors duration-300 hover:bg-ink hover:text-paper md:h-14 md:px-7 md:text-lg"
            >
              See my work
            </a>
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

      {/* The figure: a head-to-thigh crop fading out at the bottom, standing
          on the bottom edge in front of the name and above the hero's stepped
          edge (z-10). Centered on phones and tablets, beside the statement
          from lg up. Shown close to its natural size so it stays sharp. On
          large screens it drifts slower than the page while scrolling. */}
      <div
        data-anim="parallax"
        data-speed="12"
        data-parallax-from="1024"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-15 flex justify-center lg:justify-end lg:pr-[3%] xl:justify-center xl:pr-0 xl:pl-[20%]"
      >
        <div
          data-hero="4"
          className="relative h-[83svh] w-full max-w-md overflow-hidden mask-[linear-gradient(to_bottom,black_62%,transparent_97%)] md:h-[70svh] md:max-w-xl lg:aspect-[0.88] lg:h-[76svh] lg:w-auto lg:max-w-none xl:h-[84svh]"
        >
          <Image
            src="/images/avatar.png"
            alt="Illustration of Mohamed Sanjeed"
            width={608}
            height={1088}
            loading="eager"
            fetchPriority="high"
            quality={90}
            sizes="(min-width: 1024px) 74vh, 60vh"
            className="absolute top-[-5%] left-1/2 lg:top-[2%] h-[158%] w-auto max-w-none -translate-x-1/2"
          />
        </div>
      </div>
    </div>
  );
}
