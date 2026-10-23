export interface Project {
  title: string;
  description: string;
  tags: string[];
  year: string;
  href: string;
  // Path in /public, e.g. "/projects/nova.webp". Without it, a colored cover is shown.
  image?: string;
  cover: string;
}

// Placeholder projects: replace with your own work.
export const projectsData: Project[] = [
  {
    title: "Nova Dashboard",
    description:
      "Analytics dashboard with real-time charts, role-based access and reusable UI components.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    year: "2026",
    href: "#",
    cover: "#FFE862",
  },
  {
    title: "Atlas Travel",
    description:
      "Booking experience for boutique stays, focused on fast search and smooth checkout on mobile.",
    tags: ["React", "GSAP", "REST API"],
    year: "2025",
    href: "#",
    cover: "#242424",
  },
  {
    title: "Pulse Fitness",
    description:
      "Marketing site with scroll-driven storytelling, 3D product shots and a CMS-powered blog.",
    tags: ["Next.js", "Three.js", "CMS"],
    year: "2025",
    href: "#",
    cover: "#ff5a1f",
  },
  {
    title: "Leaf Studio",
    description:
      "Portfolio website for an architecture studio, built for speed, SEO and smooth animations.",
    tags: ["Next.js", "Tailwind", "GSAP"],
    year: "2024",
    href: "#",
    cover: "#E9DFD6",
  },
];
