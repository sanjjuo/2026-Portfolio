"use client";

import { initAnimations } from "@/lib/animations";
import { useLayoutEffect } from "react";

// Starts the GSAP animations from lib/animations.ts and draws the scroll
// progress bar. Render once, after the page content.
export default function GsapAnimations() {
  useLayoutEffect(() => initAnimations(), []);

  return (
    <div
      aria-hidden="true"
      data-anim="progress"
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.75 origin-left scale-x-0 bg-brand motion-reduce:hidden"
    />
  );
}
