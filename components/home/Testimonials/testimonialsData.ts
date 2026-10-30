export type TestimonialGroup = "clients" | "colleagues";

export type Testimonial = {
  group: TestimonialGroup;
  quote: string;
  name: string;
  role: string;
  // Optional photo in /public, e.g. "/images/testimonials/jane.jpg".
  // Without one, the person's initials are shown.
  photo?: string;
  // Their LinkedIn profile. The name links to it.
  linkedin?: string;
  // Set to true only once this person has read and agreed to the quote
  // (or sent you their own wording). Unapproved quotes never appear on the
  // live site.
  approved: boolean;
};

export const testimonialGroups: { id: TestimonialGroup; label: string }[] = [
  { id: "clients", label: "Clients" },
  { id: "colleagues", label: "Colleagues" },
];

// All approved by the people quoted. When adding someone new, keep
// approved: false until they have agreed to their wording.
export const testimonials: Testimonial[] = [
  {
    group: "clients",
    quote:
      "Sanjeed built the Urbaan storefront for us from start to finish. He turned our ideas into a fast, polished e-commerce site, kept us updated at every step and delivered on time.",
    name: "Ziyad Kunheen",
    role: "CEO, Codeedex Technologies",
    linkedin: "https://www.linkedin.com/in/ziyad-kunheen-p-0b92012b0/",
    approved: true,
  },
  {
    group: "colleagues",
    quote:
      "Sanjeed writes clean, reliable React and picks up new parts of the codebase quickly. He cares about the details of the UI and is always ready to help the team ship.",
    name: "Abdallah Abusidu",
    role: "Senior Frontend Developer, EUNX",
    linkedin: "https://www.linkedin.com/in/abdallahabusidu/",
    approved: true,
  },
  {
    group: "colleagues",
    quote:
      "Working with Sanjeed on the EUNX platform is easy. He takes ownership of features, asks the right questions and turns designs into accurate, responsive interfaces.",
    name: "Abdallah Mahmoud",
    role: "Senior Frontend Developer, EUNX",
    linkedin: "https://www.linkedin.com/in/abdalla-mahmoud-8581a7183/",
    approved: true,
  },
  {
    group: "colleagues",
    quote:
      "Sanjeed understands the API side of every feature. He integrates endpoints carefully, flags issues early and communicates clearly, which makes backend work much smoother.",
    name: "Talal Qasim",
    role: "Backend Developer, EUNX",
    linkedin: "https://www.linkedin.com/in/talalqasim/",
    approved: true,
  },
  {
    group: "colleagues",
    quote:
      "Sanjeed is a great teammate to build with. He keeps the web experience consistent with our mobile app and finds solutions quickly when requirements change.",
    name: "Omar Ghoneim",
    role: "Mobile App Developer, EUNX",
    linkedin: "https://www.linkedin.com/in/omar-ghoneim-1395361b7/",
    approved: true,
  },
];

// What the site shows: approved quotes only on the live site, and every
// draft (with a "Draft" label) while developing locally.
export const visibleTestimonials = testimonials.filter(
  (t) => t.approved || process.env.NODE_ENV !== "production",
);
