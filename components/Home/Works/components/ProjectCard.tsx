import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Project } from "../projectsData";

const darkCovers = ["#242424", "#ff5a1f"];

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { title, description, tags, year, href, image, cover } = project;
  const number = String(index + 1).padStart(2, "0");
  const isDark = darkCovers.includes(cover);

  return (
    <article className="group relative flex flex-col gap-5">
      <div
        className="relative aspect-4/3 overflow-hidden rounded-3xl"
        style={{ backgroundColor: cover }}
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <span
            aria-hidden="true"
            className={`absolute inset-0 grid place-content-center px-6 text-center text-4xl font-bold uppercase tracking-tight transition-transform duration-700 ease-out group-hover:scale-105 sm:text-5xl lg:text-6xl ${
              isDark ? "text-white" : "text-[#1a1a1a]"
            }`}
          >
            {title}
          </span>
        )}

        <span
          aria-hidden="true"
          className="absolute right-4 top-4 grid size-12 place-content-center rounded-full bg-white text-black transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-white md:size-14"
        >
          <ArrowUpRight className="size-5 md:size-6" />
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          <span>{number}</span>
          <span>{year}</span>
        </div>

        <h3 className="text-2xl font-bold md:text-3xl">
          <a href={href} className="after:absolute after:inset-0">
            {title}
          </a>
        </h3>

        <p className="text-base text-neutral-600 md:text-lg">{description}</p>

        <ul aria-label="Technologies" className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium uppercase tracking-wider md:text-sm"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
