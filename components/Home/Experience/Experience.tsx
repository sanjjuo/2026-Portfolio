import SectionHeading, { Accent } from "@/components/common/SectionHeading/SectionHeading";
import { site } from "@/lib/site";
import { ArrowDownRight } from "lucide-react";
import { education, jobs } from "./experienceData";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title">
      <div className="container pt-24 pb-24 md:pt-40 md:pb-32">
        <SectionHeading
          id="experience-title"
          index="02"
          label="Experience"
          aside="2.5+ years"
          title={
            <>
              Where I&apos;ve <Accent>worked</Accent>
            </>
          }
          intro="Building production web apps for teams in Dubai and India, from trading platforms to e-commerce."
        />

        <ol className="mt-16 md:mt-24">
          {jobs.map((job) => (
            <li
              key={job.company}
              className="group relative grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-12"
            >
              <span
                aria-hidden="true"
                data-anim="line"
                className="absolute inset-x-0 top-0 h-px bg-line"
              />

              <div
                data-anim="fade-up"
                className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-ink-muted md:col-span-3 md:flex-col md:items-start"
              >
                {job.period}
                {job.current && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 text-[11px] tracking-[0.15em] text-paper">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                    </span>
                    Now
                  </span>
                )}
              </div>

              <div data-anim="fade-up" className="md:col-span-5">
                <h3 className="text-2xl font-bold leading-tight tracking-tight transition-[translate,color] duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-brand md:text-4xl">
                  {job.role}
                </h3>
                <p className="mt-1 font-serif text-xl italic text-ink-muted md:text-2xl">
                  {job.company}
                </p>
              </div>

              <div data-anim="fade-up" className="space-y-3 md:col-span-4">
                <p className="text-base text-ink-muted md:text-lg">{job.summary}</p>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-muted/80">
                  {job.location} · {job.type}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="relative grid gap-6 pt-8 md:grid-cols-12 md:gap-8 md:pt-12">
          <span
            aria-hidden="true"
            data-anim="line"
            className="absolute inset-x-0 top-0 h-px bg-line"
          />
          <p
            data-anim="fade-up"
            className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted md:col-span-3"
          >
            Education
          </p>
          <div data-anim="fade-up" className="md:col-span-5">
            <p className="text-lg font-semibold md:text-xl">{education.title}</p>
            <p className="text-ink-muted">
              {education.school} · {education.period}
            </p>
          </div>
          <div data-anim="fade-up" className="md:col-span-4 md:text-right">
            <a
              href={`/${site.cvFile}`}
              download
              className="group/cv inline-flex items-center gap-2 border-b border-current pb-1 text-sm font-semibold uppercase tracking-[0.15em] transition-colors duration-300 hover:text-brand"
            >
              Download full CV
              <ArrowDownRight className="size-4 transition-transform duration-300 group-hover/cv:rotate-45" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
