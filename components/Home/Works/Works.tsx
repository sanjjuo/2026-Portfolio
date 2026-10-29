import SectionHeading, { Accent } from "@/components/common/SectionHeading/SectionHeading";
import ProjectCard from "./components/ProjectCard";
import { projectsData } from "./projectsData";

const projects = projectsData.filter((project) => !project.draft);

export default function Works() {
  return (
    <section id="works" aria-labelledby="works-title">
      <div className="container pt-16 pb-32 md:pt-24 md:pb-40">
        <SectionHeading
          id="works-title"
          index="03"
          label="Selected work"
          aside={`${String(projects.length).padStart(2, "0")} projects`}
          title={
            <>
              Selected <Accent>Work</Accent>
            </>
          }
          intro="A selection of websites and web apps I've built - fast, responsive and crafted with care."
        />

        <ul className="mt-16 space-y-24 md:mt-28 md:space-y-40">
          {projects.map((project, index) => (
            <li key={project.title}>
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
