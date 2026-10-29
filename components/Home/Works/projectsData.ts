import type { StaticImageData } from "next/image";
import eunxBusinessAccounts from "@/public/projects/eunx/business-accounts.png";
import eunxHero from "@/public/projects/eunx/hero.png";
import eunxTradingSteps from "@/public/projects/eunx/trading-steps.png";
import urbaanCategoryFilters from "@/public/projects/urbaan/category-filters.png";
import urbaanHome from "@/public/projects/urbaan/home.png";
import urbaanLatestProducts from "@/public/projects/urbaan/latest-products.png";

export interface Project {
  title: string;
  description: string;
  // Not shown on the card yet.
  highlights: string[];
  tags: string[];
  // Short label shown above the title, e.g. "Company Project".
  category: string;
  // Live site URL. External links open in a new tab.
  href: string;
  // Screenshots from public/projects/<name>/. The first one is the main shot.
  // Without any, a colored cover with the title is shown.
  images?: StaticImageData[];
  cover: string;
  // Hidden from the site while true, e.g. until screenshots are ready.
  draft?: boolean;
}

export const projectsData: Project[] = [
  {
    title: "EUNX Trading Platform & Admin Dashboard",
    description:
      "Trading platform and admin dashboard for EUNX Investments LLC, a Dubai-based trading company, built as part of the frontend team.",
    highlights: [
      "Convert design files into pixel-perfect, fully responsive interfaces and maintain the shared design system across both products.",
      "Integrate REST APIs with RTK Query in close collaboration with the backend team, and debug and fix UI issues.",
      "Implemented GTM and GA tracking, and set up Playwright automated testing for the platform.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "RTK Query",
      "Google Tag Manager",
      "Google Analytics",
      "Playwright",
    ],
    category: "Company Project",
    href: "https://eunx.eu/en",
    images: [eunxHero, eunxTradingSteps, eunxBusinessAccounts],
    cover: "#0F1B2D",
  },
  {
    title: "Urbaan",
    description:
      "Complete frontend of a live e-commerce platform for a women's fashion boutique, with product search, filters, checkout flow and real-time cart updates.",
    highlights: [
      "Developed the admin dashboard UI for managing products, orders, categories, and customers.",
      "Added smooth animations and interactions using Framer Motion for a modern shopping experience.",
      "Integrated REST APIs from the backend team and made the site fully responsive on all devices.",
    ],
    tags: ["React.js", "Tailwind CSS", "Material Tailwind", "Framer Motion"],
    category: "E-commerce Boutique",
    href: "https://www.urbaan.in/",
    images: [urbaanHome, urbaanLatestProducts, urbaanCategoryFilters],
    cover: "#F6E4E6",
  },
  {
    title: "Armaano",
    description:
      "A clean, modern e-commerce web app with product listing, product details and cart functionality.",
    highlights: [
      "Used Firebase for backend data and authentication, and Cloudinary for fast, optimized image delivery.",
      "Designed a fully responsive UI with Tailwind CSS and shadcn/ui components.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Firebase",
      "Cloudinary",
    ],
    category: "E-commerce Web App",
    href: "https://armaano.vercel.app/signin",
    draft: true,
    cover: "#ff5a1f",
  },
];
