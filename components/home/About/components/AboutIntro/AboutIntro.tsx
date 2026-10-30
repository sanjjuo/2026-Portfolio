import DotGridBackground from "@/components/common/DotGridBackground/DotGridBackground";
import { Accent } from "@/components/common/SectionHeading/SectionHeading";
import { site } from "@/lib/site";
import { ArrowUpRight, Clock, Download } from "lucide-react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import DubaiTime from "@/components/common/DubaiTime/DubaiTime";

// Set to false when you are not taking new work.
const isAvailable = true;

// The "Download CV" link only shows when this file exists in /public.
const hasCv = existsSync(join(process.cwd(), "public", site.cvFile));

const services = [
  "Web apps & dashboards",
  "E-commerce storefronts",
  "Design systems",
  "Motion & interaction",
];

// The number in each value counts up on scroll (data-anim="count").
const stats = [
  { value: "2.5+", label: "Years of experience" },
  { value: "20+", label: "Live projects shipped" },
  { value: "2", label: "Countries worked in" },
];

const pill =
  "inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-4 text-xs font-medium text-paper sm:h-12 sm:px-5 sm:text-sm";

export default function AboutIntro() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <DotGridBackground
          height="100%"
          width="100%"
          backgroundColor="var(--color-sun)"
        />
      </div>

      {/* Top padding clears the hero's stepped edge. */}
      <div className="container relative z-20 pt-36 pb-12 md:pt-48 md:pb-16">
        <div className="relative flex items-center justify-between gap-4 pt-4 text-xs font-medium uppercase tracking-[0.25em] md:text-sm">
          <span
            aria-hidden="true"
            data-anim="line"
            className="absolute inset-x-0 top-0 h-px bg-ink/20"
          />
          <p data-anim="fade-up">
            (01) <span className="ml-2">About me</span>
          </p>
          {hasCv && (
            // A plain link: next/link would prefetch the PDF on page load.
            <a
              href={`/${site.cvFile}`}
              download
              data-anim="fade-up"
              className="group inline-flex items-center gap-1.5 border-b border-current pb-0.5 transition-colors duration-300 hover:text-brand"
            >
              Download CV
              <Download className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          )}
        </div>

        <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-12">
          <p
            data-anim="split"
            className="text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:col-span-8 lg:text-6xl"
          >
            I&apos;m Mohamed Sanjeed, a frontend developer in Dubai turning
            ideas into <Accent>fast</Accent>, <Accent>accessible</Accent> and
            good-looking web experiences.
          </p>

          <div className="space-y-8 md:col-span-4 md:pt-3">
            <p data-anim="fade-up" className="text-base text-ink/75 md:text-lg">
              I build trading platforms, dashboards and online stores with
              clean, reusable code, and the kind of motion that makes an
              interface feel alive.
            </p>
            <ul data-anim="stagger" aria-label="What I do">
              {services.map((service) => (
                <li
                  key={service}
                  className="group flex items-center justify-between border-t border-ink/20 py-3 text-base font-medium last:border-b md:text-lg"
                >
                  {service}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-3 gap-4 md:mt-28 md:gap-8">
          {stats.map(({ value, label }) => (
            <li key={label} className="relative pt-5 text-center md:pt-6">
              <span
                aria-hidden="true"
                data-anim="line"
                className="absolute inset-x-0 top-0 h-px bg-ink/20"
              />
              <p
                data-anim="count"
                className="font-serif text-5xl leading-none tracking-tight sm:text-7xl lg:text-9xl"
              >
                {value}
              </p>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/70 sm:text-xs md:text-sm">
                {label}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 md:mt-24">
          {isAvailable && (
            <p className={pill}>
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              Available for freelance
            </p>
          )}
          <p className={pill}>
            <Clock className="size-4" />
            <DubaiTime />
          </p>
        </div>
      </div>
    </div>
  );
}
