import { Asterisk } from "lucide-react";

const phrases = [
  "Open to new opportunities",
  "Frontend Developer",
  "Based in Dubai",
  "Let's work together",
];

// Tilted orange band of scrolling text. The loop (and its speed-up while the
// page scrolls) comes from data-anim="marquee" in lib/animations.ts.
export default function Marquee() {
  return (
    <section
      aria-label={phrases.join(", ")}
      className="overflow-hidden bg-linear-to-b from-ink-soft to-ink py-10 md:py-16"
    >
      <div className="-rotate-2 scale-105 bg-brand py-5 text-ink md:py-8">
        <div data-anim="marquee" className="flex w-max">
          {/* Two identical copies, so shifting by half loops seamlessly. */}
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden="true" className="flex shrink-0 items-center">
              {phrases.map((phrase) => (
                <span
                  key={phrase}
                  className="flex items-center gap-6 pr-6 text-4xl font-bold uppercase tracking-tight whitespace-nowrap md:gap-12 md:pr-12 md:text-7xl lg:text-8xl"
                >
                  {phrase}
                  <Asterisk className="size-8 shrink-0 md:size-14" strokeWidth={2.5} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
