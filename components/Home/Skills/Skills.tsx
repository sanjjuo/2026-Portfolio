import SectionHeading, { Accent } from "@/components/common/SectionHeading/SectionHeading";
import LazyMount from "@/components/common/LazyMount/LazyMount";
import SkillsLoop from "./components/SkillsLoop";
import { skillGroups } from "./skillsData";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="bg-ink-soft text-paper"
    >
      <div className="pt-24 pb-24 md:pt-36 md:pb-32">
        <div className="container">
          <SectionHeading
            id="skills-title"
            index="04"
            label="Skills & tools"
            dark
            title={
              <>
                My <Accent>toolbox</Accent>
              </>
            }
            intro="The technologies I use to build fast, responsive and animated web experiences."
          />
        </div>

        {/* Full width so the logos run edge to edge. */}
        <div data-anim="fade-up" className="mt-16 md:mt-24">
          <LazyMount className="min-h-26 md:min-h-30">
            <SkillsLoop />
          </LazyMount>
        </div>

        <div
          data-anim="stagger"
          className="container mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-24 lg:grid-cols-3"
        >
          {skillGroups.map(({ title, skills }) => (
            <div key={title} className="space-y-4 border-t border-paper/15 pt-5">
              <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-paper/60">
                {title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {skills.map(({ name, icon: Icon }) => (
                  <li
                    key={name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-paper/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-paper/85 transition-colors duration-300 hover:border-brand hover:text-brand md:text-sm"
                  >
                    <Icon aria-hidden="true" className="size-3.5 md:size-4" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
