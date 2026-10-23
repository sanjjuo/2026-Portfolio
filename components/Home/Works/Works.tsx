import ProjectCard from "./components/ProjectCard";
import { projectsData } from "./projectsData";

export default function Works() {
  return (
    <section id="works" aria-labelledby="works-title">
      <div className="container pt-16 pb-32 md:pt-30 md:pb-40">
        <div className="mx-auto max-w-3xl space-y-4 text-center md:space-y-5">
          <h2 id="works-title" className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Curated Projects
          </h2>
          <p className="text-base sm:text-lg md:text-xl">
            A selection of websites and web apps I&apos;ve built - fast,
            responsive and crafted with care.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-2 md:gap-y-20">
          {projectsData.map((project, index) => (
            <li key={project.title} className={index % 2 === 1 ? "md:mt-24" : undefined}>
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
