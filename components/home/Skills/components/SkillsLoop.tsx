"use client";

import LogoLoop, { type LogoItem } from "@/components/effects/LogoLoop";
import { skillGroups, type Skill } from "../skillsData";

const toLogos = (skills: Skill[]): LogoItem[] =>
  // Skip repeated icons, so Redux, Redux Toolkit and RTK Query show one "Redux" logo.
  skills
    .filter(
      (skill, i, all) => all.findIndex((s) => s.icon === skill.icon) === i,
    )
    .map(({ name, icon: Icon, color }) => ({
      node: <Icon />,
      title: name,
      ariaLabel: name,
      hoverColor: color,
    }));

// Top row: frontend. Bottom row: everything else.
const [frontend, ...rest] = skillGroups;
const topRow = toLogos(frontend.skills);
const bottomRow = toLogos(rest.flatMap((group) => group.skills));

export default function SkillsLoop() {
  return (
    <div className="space-y-6 text-paper/50 md:space-y-10">
      {[topRow, bottomRow].map((logos, row) => (
        <LogoLoop
          key={row}
          logos={logos}
          direction={row === 0 ? "left" : "right"}
          speed={60}
          hoverSpeed={0}
          logoHeight={40}
          gap={56}
          labels="inline"
          scaleOnHover
          ariaLabel="Skills and technologies"
        />
      ))}
    </div>
  );
}
