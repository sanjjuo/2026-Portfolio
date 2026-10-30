"use client";
import DotGridBackground from "@/components/common/DotGridBackground/DotGridBackground";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Image from "next/image";
import FloatingModel from "../FloatingModel/FloatingModel";

export default function AboutStatement() {
  return (
    <div className="relative h-150 md:h-200">
      <DotGridBackground
        height="100%"
        width="100%"
        backgroundColor="var(--color-ink-soft)"
        intro={false}
      />
      <div className="container absolute inset-0 z-20 place-content-center">
        <ScrollReveal
          mode="scrub"
          splitBy="words"
          effect="fade"
          stagger={0.5}
          duration={3}
          smoothing={0}
          baseOpacity={0.4}
          baseRotation={0}
          baseOffset={0}
          enableBlur={false}
          wordAnimationEnd="center center"
          textClassName="text-white text-3xl! sm:text-5xl! md:text-6xl! lg:text-7xl! xl:text-8xl! font-semibold leading-tight text-start lg:text-center"
        >
          <span className="text-5xl! md:text-7xl! xl:text-9xl! font-black">
            2.5+ years
          </span>{" "}
          <br className="lg:hidden" />
          of turning ideas into clean, responsive web experiences.
        </ScrollReveal>
        <FloatingModel
          image="/models/frontend.glb"
          startAngle={-35}
          className="absolute left-2 top-0 z-30 md:left-6 md:top-8 xl:left-20 xl:top-10"
        />
        <FloatingModel
          image="/models/github.glb"
          startAngle={30}
          className="absolute right-2 top-28 z-30 md:right-6 md:top-8 xl:right-20 xl:top-10"
        />
        <FloatingModel
          image="/models/claude.glb"
          startAngle={-10}
          className="absolute bottom-16 left-1/2 z-30 -translate-x-1/2 md:bottom-12 xl:bottom-0"
        />
      </div>
      <Image
        src="/images/brush-stroke.webp"
        alt=""
        width={1000}
        height={800}
        unoptimized
        className="pointer-events-none absolute bottom-0 w-full translate-y-1/2 object-contain"
      />
    </div>
  );
}
