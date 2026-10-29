import type { IconType } from "react-icons";
import { GiBearHead, GiDramaMasks } from "react-icons/gi";
import {
  SiBootstrap,
  SiCss,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGoogleanalytics,
  SiGoogletagmanager,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiMaterialdesign,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiReact,
  SiReactquery,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbApi, TbBrandReactNative, TbDevices } from "react-icons/tb";

export interface Skill {
  name: string;
  icon: IconType;
  // Brand color shown on hover (the section is dark, so black logos use white).
  color?: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

// Zustand and Playwright have no official icon here, so their mascots stand in:
// the Zustand bear and the Playwright theater masks.
export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript (ES6+)", icon: SiJavascript, color: "#E9C600" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
      { name: "GSAP", icon: SiGreensock, color: "#0AE448" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "shadcn/ui", icon: SiShadcnui, color: "#FFFFFF" },
      { name: "Material Tailwind", icon: SiMaterialdesign, color: "#757575" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "Responsive Design", icon: TbDevices, color: "#ff5a1f" },
    ],
  },
  {
    title: "State & Data Fetching",
    skills: [
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
      { name: "RTK Query", icon: SiRedux, color: "#764ABC" },
      { name: "Zustand", icon: GiBearHead, color: "#C8955C" },
      { name: "React Query", icon: SiReactquery, color: "#FF4154" },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "RESTful APIs", icon: TbApi, color: "#ff5a1f" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Mongoose", icon: SiMongoose, color: "#D2554F" },
    ],
  },
  {
    title: "Testing & Analytics",
    skills: [
      { name: "Playwright", icon: GiDramaMasks, color: "#2EAD33" },
      { name: "Google Tag Manager", icon: SiGoogletagmanager, color: "#246FDB" },
      { name: "Google Analytics", icon: SiGoogleanalytics, color: "#E37400" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "NPM", icon: SiNpm, color: "#CB3837" },
    ],
  },
  {
    title: "Familiar With",
    skills: [{ name: "React Native", icon: TbBrandReactNative, color: "#61DAFB" }],
  },
];
