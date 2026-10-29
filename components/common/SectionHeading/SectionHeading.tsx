import type { ReactNode } from "react";

// Shared editorial header: a numbered label over a divider, then a large
// title with an optional intro on the right. Animations come from the
// data-anim attributes (lib/animations.ts).
export default function SectionHeading({
  id,
  index,
  label,
  title,
  intro,
  aside,
  dark = false,
}: {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  // Small text on the right of the label row.
  aside?: ReactNode;
  dark?: boolean;
}) {
  const muted = dark ? "text-paper/60" : "text-ink-muted";

  return (
    <div className="space-y-10 md:space-y-16">
      <div
        className={`relative flex items-center justify-between gap-4 pt-4 text-xs font-medium uppercase tracking-[0.25em] md:text-sm ${muted}`}
      >
        <span
          aria-hidden="true"
          data-anim="line"
          className={`absolute inset-x-0 top-0 h-px ${dark ? "bg-paper/15" : "bg-line"}`}
        />
        <span data-anim="fade-up">
          ({index}) <span className="ml-2">{label}</span>
        </span>
        {aside && <span data-anim="fade-up">{aside}</span>}
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <h2
          id={id}
          data-anim="split"
          className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {title}
        </h2>
        {intro && (
          <p
            data-anim="fade-up"
            className={`max-w-sm text-base sm:text-lg md:text-right ${muted}`}
          >
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}

// Serif italic word used inside section titles, e.g. "Selected <Accent>Work</Accent>".
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal italic">{children}</em>;
}
