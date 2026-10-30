"use client";

import { visibleTestimonials } from "@/components/home/Testimonials/testimonialsData";
import { site } from "@/lib/site";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "works", label: "Works" },
  { id: "testimonials", label: "Testimonials" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
  // No link while the Testimonials section is hidden.
].filter(({ id }) => id !== "testimonials" || visibleTestimonials.length > 0);

const number = (i: number) => String(i + 1).padStart(2, "0");

// Ring around the section number: its length is the page's scroll progress.
const RING = 2 * Math.PI * 15;

// The section crossing the middle of the screen.
function useActiveSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(sections.findIndex((s) => s.id === hit.target.id));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

// Site navigation: a small pill at the bottom of the screen shows the current
// section and how far down the page you are. Clicking it opens a compact
// card of links just above it; the page stays visible. The links are plain
// "#section" anchors, so ScrollSmoother glides to them (lib/animations.ts).
// The card only moves, scales and fades, which the GPU handles smoothly.
export default function SectionNav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const navRef = useRef<HTMLElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Draw scroll progress without re-rendering.
  useEffect(() => {
    let frame = 0;
    const draw = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      ringRef.current?.setAttribute(
        "stroke-dashoffset",
        String(RING * (1 - progress)),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // While open, Escape or a click anywhere else closes the card.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="fixed bottom-4 left-1/2 z-80 w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 md:bottom-6 md:w-72"
    >
      <div
        id="site-menu"
        inert={!open}
        className={`absolute inset-x-0 bottom-full mb-2 origin-bottom rounded-3xl bg-ink p-2 text-paper shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] transition-[opacity,scale,translate] ease-out-expo motion-reduce:transition-none ${
          open
            ? "translate-y-0 scale-100 opacity-100 duration-500"
            : "pointer-events-none translate-y-3 scale-95 opacity-0 duration-300"
        }`}
      >
        <ul>
          {sections.map(({ id, label }, i) => (
            <li
              key={id}
              style={{ "--i": i } as CSSProperties}
              className={`transition-[opacity,translate] ease-out-expo motion-reduce:transition-none ${
                open
                  ? "translate-y-0 opacity-100 delay-[calc(var(--i)*30ms+60ms)] duration-500"
                  : "translate-y-2 opacity-0 duration-200"
              }`}
            >
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                aria-current={i === active ? "location" : undefined}
                className="group/link flex items-center gap-4 rounded-2xl px-3 py-2 transition-colors duration-300 hover:bg-paper/8 aria-[current=location]:text-brand"
              >
                <span className="font-mono text-[11px] text-paper/40 tabular-nums">
                  {number(i)}
                </span>
                <span className="text-lg font-medium tracking-tight transition-[translate] duration-300 ease-out-expo group-hover/link:translate-x-1">
                  {label}
                </span>
                {i === active && (
                  <span
                    aria-hidden="true"
                    className="ml-auto size-1.5 rounded-full bg-brand"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex items-center justify-between border-t border-paper/10 px-3 pt-3 pb-1.5 font-mono text-[10px] uppercase tracking-[0.15em]">
          <span className="flex gap-3">
            {site.socials.map(({ label, short, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex items-center gap-0.5 text-paper/60 transition-colors duration-300 hover:text-sun"
              >
                {short}
                <ArrowUpRight aria-hidden="true" className="size-3" />
              </a>
            ))}
          </span>
          <a
            href={`/${site.cvFile}`}
            download
            className="inline-flex items-center gap-1 text-brand transition-colors duration-300 hover:text-sun"
          >
            CV
            <ArrowDown aria-hidden="true" className="size-3" />
          </a>
        </div>
      </div>

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="flex h-12 w-full items-center gap-3 rounded-full bg-ink pr-5 pl-1.5 text-paper shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] md:h-14 md:pl-2"
      >
        <span className="relative grid size-9 place-content-center md:size-10">
          <svg
            viewBox="0 0 36 36"
            aria-hidden="true"
            className="absolute inset-0 size-full -rotate-90"
          >
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              strokeWidth="2"
              className="stroke-current opacity-15"
            />
            <circle
              ref={ringRef}
              cx="18"
              cy="18"
              r="15"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={RING}
              strokeDashoffset={RING}
              className="stroke-brand"
            />
          </svg>
          <span className="font-mono text-[10px] tabular-nums md:text-xs">
            {number(active)}
          </span>
        </span>

        <span className="h-4 flex-1 overflow-hidden text-left font-mono text-xs font-medium uppercase leading-4 tracking-[0.2em]">
          <span
            key={open ? "menu" : active}
            className="block animate-[nav-label_0.5s_var(--ease-out-expo)] motion-reduce:animate-none"
          >
            {open ? "Menu" : sections[active].label}
          </span>
        </span>

        {/* Two lines that cross into an X while open. */}
        <span aria-hidden="true" className="relative h-2.5 w-5">
          <span
            className={`absolute inset-x-0 h-0.5 rounded-full bg-current transition-[top,rotate] duration-500 ease-out-expo ${
              open ? "top-1 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute inset-x-0 h-0.5 rounded-full bg-current transition-[top,rotate] duration-500 ease-out-expo ${
              open ? "top-1 -rotate-45" : "top-2"
            }`}
          />
        </span>
      </button>
    </nav>
  );
}
