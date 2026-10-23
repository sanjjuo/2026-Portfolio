"use client";
import DotGridBackground from "@/components/common/DotGridBackground/DotGridBackground";
import VariableProximity from "@/components/VariableProximity";
import React from "react";
import BottomFooter from "./components/BottomFooter";

export default function Footer() {
  const nameRef = React.useRef<HTMLDivElement>(null);
  return (
    <footer id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <DotGridBackground
          height="100%"
          width="100%"
          activeColor="#3a3446"
          baseColor="#3a3446"
          backgroundColor="#FFE862"
        />
      </div>

      <div className="container relative flex min-h-120 flex-col justify-between gap-16 pt-16 pb-28 sm:min-h-160 md:min-h-200 md:pt-24 md:pb-32">
        <div
          ref={nameRef}
          aria-hidden="true"
          className="relative text-center opacity-20"
        >
          <VariableProximity
            label={"MOHAMED SANJEED"}
            className="leading-none"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={nameRef}
            radius={100}
            falloff="linear"
            smoothing={0.2}
            scale={1}
            lift={0}
            idleWave={false}
            fontSize="min(15vw, 250px)"
          />
        </div>

        <BottomFooter />
      </div>
    </footer>
  );
}
