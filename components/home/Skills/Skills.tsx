import SectionHeading, {
  Accent,
} from "@/components/common/SectionHeading/SectionHeading";
import LazySkillsLoop from "./components/LazySkillsLoop";
import { skillGroups } from "./skillsData";
import { visibleTestimonials } from "../Testimonials/testimonialsData";

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
            // Follows Testimonials, which is hidden until a quote is approved.
            index={visibleTestimonials.length ? "05" : "04"}
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
          <LazySkillsLoop />
        </div>

        <div
          data-anim="stagger"
          className="container mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-24 lg:grid-cols-3"
        >
          {skillGroups.map(({ title, skills }) => (
            <div
              key={title}
              className="space-y-4 border-t border-paper/15 pt-5"
            >
              <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-paper/60">
                {title}
              </h3>
              {/* Text only: the logos already run in the loop above, and
                  dozens of inline icons here would bloat the page HTML. */}
              <ul className="flex flex-wrap gap-2">
                {skills.map(({ name }) => (
                  <li
                    key={name}
                    className="inline-flex items-center rounded-full border border-paper/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-paper/85 transition-colors duration-300 hover:border-brand hover:text-brand md:text-sm"
                  >
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
