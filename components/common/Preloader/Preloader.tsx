import { site } from "@/lib/site";

const letters = site.name.toUpperCase().split("");

// Intro screen shown on load: the name rises in letter by letter while a
// counter runs to 100, then the panel slides up to reveal the page. Pure CSS
// (app/globals.css, "Preloader"), so it covers the page from the very first
// paint without waiting for JavaScript. Skipped with reduced motion.
export default function Preloader() {
  return (
    <div
      aria-hidden="true"
      className="preloader pointer-events-none fixed inset-0 z-100 flex flex-col justify-between bg-ink p-6 text-paper motion-reduce:hidden md:p-12"
    >
      <div className="preloader-fade flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50 md:text-xs">
        <span>Portfolio © 2026</span>
        <span>{site.location}</span>
      </div>

      <p className="flex justify-center overflow-hidden font-serif text-[9vw] leading-none tracking-tight md:text-[6vw]">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="preloader-letter inline-block whitespace-pre"
            style={{ animationDelay: `${0.15 + i * 0.04}s` }}
          >
            {letter}
          </span>
        ))}
      </p>

      <div className="preloader-fade flex items-end justify-between gap-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50 md:text-xs">
          {site.role}
        </span>
        <span className="preloader-count font-serif text-6xl leading-none text-sun tabular-nums md:text-9xl" />
      </div>

      {/* Progress line along the bottom edge. */}
      <span className="preloader-bar absolute inset-x-0 bottom-0 h-1 origin-left bg-brand" />
    </div>
  );
}
