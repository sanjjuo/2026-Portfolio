import DubaiTime from "@/components/common/DubaiTime/DubaiTime";
import { site } from "@/lib/site";
import Link from "next/link";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { PiGithubLogoLight, PiWhatsappLogoLight } from "react-icons/pi";

const icons = {
  LinkedIn: CiLinkedin,
  GitHub: PiGithubLogoLight,
  Instagram: CiInstagram,
  WhatsApp: PiWhatsappLogoLight,
};

// External links (starting with "http") open in a new tab.
const socialLinks = site.socials.map((social) => ({
  ...social,
  icon: icons[social.label as keyof typeof icons],
}));

export default function BottomFooter() {
  return (
    <div className="space-y-12 md:space-y-16">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
        <p
          data-anim="fade-up"
          className="max-w-sm text-base text-paper/60 md:text-lg"
        >
          Open to full-time roles and freelance projects. I usually reply within
          a day.
        </p>

        <div data-anim="stagger" className="space-y-5 lg:text-right">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-paper/60 md:text-sm">
            Reach out
          </p>
          <Link
            href={`mailto:${site.email}`}
            className="block bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_2px] bg-bottom-left bg-no-repeat pb-1 text-xl font-semibold transition-[background-size,color] duration-500 ease-out-expo hover:bg-size-[100%_2px] hover:text-sun sm:text-2xl md:text-3xl"
          >
            {site.email}
          </Link>
          <ul className="flex items-center gap-3 lg:justify-end">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  aria-label={label}
                  title={label}
                  className="grid size-12 place-content-center rounded-full border border-paper/20 transition-colors duration-300 hover:border-sun hover:bg-sun hover:text-ink focus-visible:border-sun focus-visible:bg-sun focus-visible:text-ink focus-visible:outline-none md:size-14"
                  {...(href.startsWith("http") && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  <Icon className="size-6 md:size-7" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-paper/15 pt-5 text-xs font-medium uppercase tracking-[0.2em] text-paper/60 sm:flex-row sm:items-center sm:justify-between md:text-sm">
        <span>© 2026 {site.name}</span>
        <DubaiTime />
        <a
          href="#home"
          className="cursor-pointer transition-colors duration-300 hover:text-sun"
        >
          Back to top ↑
        </a>
      </div>
    </div>
  );
}
