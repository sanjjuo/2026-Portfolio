import { ArrowUpRight } from "lucide-react";
import type { Project } from "../projectsData";
import ProjectMedia from "./ProjectMedia";

const darkCovers = ["#0F1B2D", "#ff5a1f"];

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { title, description, tags, category, href, images = [], cover } =
    project;
  const number = String(index + 1).padStart(2, "0");
  const isExternal = href.startsWith("http");
  const host = isExternal ? new URL(href).hostname.replace(/^www\./, "") : "";

  return (
    <article className="group relative">
      <div className="relative mb-5 flex items-center justify-between gap-4 pt-4 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted md:mb-8 md:text-sm">
        <span
          aria-hidden="true"
          data-anim="line"
          className="absolute inset-x-0 top-0 h-px bg-line"
        />
        <span data-anim="fade-up">({number})</span>
        <span data-anim="fade-up">{category}</span>
      </div>

      <ProjectMedia
        images={images}
        title={title}
        href={href}
        cover={cover}
        isDark={darkCovers.includes(cover)}
      />

      <div className="mt-6 grid gap-5 md:mt-10 md:grid-cols-12 md:gap-10">
        <h3
          data-anim="fade-up"
          className="text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl md:col-span-7 lg:text-6xl">
          <a
            href={href}
            className="after:absolute after:inset-0"
            {...(isExternal && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
          >
            {title}
          </a>
        </h3>

        <div
          data-anim="stagger"
          className="flex flex-col gap-5 md:col-span-5 md:pt-2"
        >
          <p className="text-base text-ink-muted md:text-lg">{description}</p>

          <ul
            aria-label="Technologies"
            className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.15em] text-ink-muted md:text-sm"
          >
            {tags.map((tag, i) => (
              <li key={tag} className="flex items-center gap-3">
                {tag}
                {i < tags.length - 1 && <span aria-hidden="true">/</span>}
              </li>
            ))}
          </ul>

          {host && (
            <span className="inline-flex items-center gap-1.5 self-start border-b border-current pb-0.5 text-sm font-semibold uppercase tracking-[0.15em] transition-colors duration-300 group-hover:text-brand">
              {host}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
