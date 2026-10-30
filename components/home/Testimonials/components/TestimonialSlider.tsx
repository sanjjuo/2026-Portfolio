"use client";

import DecryptedText from "@/components/effects/DecryptedText";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { CiLinkedin } from "react-icons/ci";
import { useState, type ReactNode } from "react";
import {
  testimonialGroups,
  visibleTestimonials as testimonials,
  type TestimonialGroup,
} from "../testimonialsData";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const arrow =
  "grid size-12 place-content-center border transition-colors duration-300 disabled:pointer-events-none disabled:opacity-30 md:size-14";

// One quote at a time, so the section stays one screen tall however many
// testimonials there are. Tabs switch between clients and colleagues, the
// arrows step through the quotes, and each new quote decrypts into place.
export default function TestimonialSlider({ heading }: { heading: ReactNode }) {
  const groups = testimonialGroups.filter(({ id }) =>
    testimonials.some((t) => t.group === id),
  );
  const [group, setGroup] = useState<TestimonialGroup>(groups[0]?.id);
  const [index, setIndex] = useState(0);

  const list = testimonials.filter((t) => t.group === group);
  const current = list[index];
  if (!current) return null;

  const pick = (next: TestimonialGroup) => {
    setGroup(next);
    setIndex(0);
  };

  return (
    // Phones: heading, quote, arrows. From lg up: heading and arrows on the
    // left, the quote on the right.
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
      <div className="lg:col-span-5 lg:row-start-1">{heading}</div>

      <div
        data-anim="fade-up"
        className="flex items-center gap-3 lg:col-span-5 lg:row-start-2 lg:self-end"
      >
        <button
          type="button"
          aria-label="Previous testimonial"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
          className={`${arrow} border-paper/40 hover:border-paper hover:bg-paper hover:text-ink`}
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          disabled={index === list.length - 1}
          onClick={() => setIndex(index + 1)}
          className={`${arrow} border-paper bg-paper text-ink hover:border-brand hover:bg-brand`}
        >
          <ArrowRight className="size-5" />
        </button>
        <span className="ml-3 font-mono text-xs tracking-[0.2em] text-paper/50 tabular-nums">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(list.length).padStart(2, "0")}
        </span>
      </div>

      <div
        data-anim="fade-up"
        className="max-lg:row-start-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1"
      >
        {groups.length > 1 && (
          <div
            role="tablist"
            aria-label="Testimonials from"
            className="flex flex-wrap gap-2"
          >
            {groups.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={id === group}
                onClick={() => pick(id)}
                className="border border-paper/30 px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:border-paper aria-selected:border-paper aria-selected:bg-paper aria-selected:text-ink"
              >
                {label} <sup aria-hidden="true">↗</sup>
              </button>
            ))}
          </div>
        )}

        {/* Every quote sits in the same grid cell, all but the current one
            invisible, so the area always takes the height of the longest
            quote. Switching quotes or tabs never moves the page, whatever
            the screen width. */}
        <div aria-live="polite" className="mt-10 grid md:mt-14">
          {testimonials.map((t) => {
            const shown = t === current;
            return (
              <figure
                key={t.name}
                aria-hidden={!shown}
                className={`col-start-1 row-start-1 ${shown ? "" : "invisible"}`}
              >
                <blockquote className="font-serif text-2xl leading-[1.15] tracking-tight sm:text-3xl md:text-4xl xl:text-5xl">
                  <p>
                    {shown ? (
                      <DecryptedText
                        key={`${group}-${index}`}
                        text={`« ${t.quote} »`}
                        animateOn="view"
                        sequential
                        speed={18}
                        scrambleColor="var(--color-brand)"
                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                      />
                    ) : (
                      `« ${t.quote} »`
                    )}
                  </p>
                </blockquote>

                <figcaption className="mt-8 flex flex-wrap items-center gap-4">
                  {t.photo ? (
                    <Image
                      src={t.photo}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid size-12 place-content-center bg-brand font-mono text-sm font-semibold text-ink"
                    >
                      {initials(t.name)}
                    </span>
                  )}
                  <span className="text-sm">
                    {t.linkedin ? (
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t.name} on LinkedIn`}
                        className="inline-flex items-center gap-1.5 font-semibold transition-colors duration-300 hover:text-brand"
                      >
                        {t.name}
                        <CiLinkedin aria-hidden="true" className="size-4.5" />
                      </a>
                    ) : (
                      <span className="block font-semibold">{t.name}</span>
                    )}
                    <span className="block text-paper/60">{t.role}</span>
                  </span>
                  {!t.approved && (
                    // Only ever seen locally: drafts are hidden on the live site.
                    <span className="border border-brand px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-brand sm:ml-auto">
                      Draft, awaiting approval
                    </span>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
