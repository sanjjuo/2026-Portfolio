export interface Job {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  current?: boolean;
}

export const jobs: Job[] = [
  {
    role: "Frontend Developer",
    company: "EUNX Investments LLC",
    period: "Feb 2025 — Present",
    location: "Dubai, UAE",
    type: "Full-time · On-site",
    summary:
      "Building the trading platform and admin dashboard with Next.js, TypeScript and Tailwind CSS: reusable design-system components, REST APIs with RTK Query, GTM and GA tracking, and Playwright tests.",
    current: true,
  },
  {
    role: "React.js Developer",
    company: "W3 Digital Agency",
    period: "Jan 2024 — Jun 2024",
    location: "Kerala, India",
    type: "Full-time · On-site",
    summary:
      "Built responsive, cross-browser React interfaces, integrated REST APIs and third-party libraries, and fixed performance issues to make the app faster.",
  },
  {
    role: "MERN Stack Developer — Trainee",
    company: "Techmindz",
    period: "May 2023 — Aug 2023",
    location: "Kochi, India",
    type: "Traineeship",
    summary:
      "Hands-on full-stack training with MongoDB, Express.js, React.js and Node.js, building apps with authentication, CRUD operations and REST APIs.",
  },
];

export const education = {
  title: "Bachelor of Computer Applications (BCA)",
  school: "MES Kalladi College, University of Calicut",
  period: "2020 — 2023",
};
