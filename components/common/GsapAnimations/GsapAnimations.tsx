"use client";

import { useEffect } from "react";

// Starts the GSAP animations from lib/animations.ts and draws the scroll
// progress bar. Render once, after the page content. GSAP is loaded after
// the page is interactive, so it stays out of the startup bundle; the hero
// intro is CSS and doesn't wait for it.
export default function GsapAnimations() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import("@/lib/animations").then(({ initAnimations }) => {
      if (!cancelled) cleanup = initAnimations();
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-anim="progress"
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.75 origin-left scale-x-0 bg-brand motion-reduce:hidden"
    />
  );
}
