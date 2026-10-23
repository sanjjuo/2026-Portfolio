import Link from "next/link";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { PiWhatsappLogoLight } from "react-icons/pi";

const email = "mohamedsanjeed.k@gmail.com";

const socialLinks = [
  { label: "Instagram", icon: CiInstagram, href: "#" },
  { label: "LinkedIn", icon: CiLinkedin, href: "#" },
  { label: "WhatsApp", icon: PiWhatsappLogoLight, href: "#" },
];

const scrollToTop = (event: React.MouseEvent) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function BottomFooter() {
  return (
    <div className="space-y-10 md:space-y-14">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2 md:space-y-3">
          <p className="text-xl font-semibold md:text-3xl">
            Let&apos;s build something
          </p>
          <h2 className="max-w-lg text-4xl font-bold uppercase leading-none sm:text-5xl md:text-6xl">
            Meaningful and memorable
          </h2>
        </div>

        <div className="space-y-4 lg:text-right">
          <h3 className="text-lg font-semibold md:text-2xl">Reach out</h3>
          <Link
            href={`mailto:${email}`}
            className="block text-base font-medium underline-offset-4 hover:underline md:text-xl"
          >
            {email}
          </Link>
          <ul className="flex items-center gap-3 lg:justify-end">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http") && {
                    target: "_blank",
                    rel: "noreferrer",
                  })}
                >
                  <Icon className="size-10 md:size-14" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-black/20 pt-5 text-xs font-medium uppercase tracking-[0.2em] sm:flex-row sm:items-center sm:justify-between md:text-sm">
        <span>© 2026 Mohamed Sanjeed</span>
        <Link
          href="#home"
          onClick={scrollToTop}
          className="underline-offset-4 hover:underline cursor-pointer"
        >
          Back to top ↑
        </Link>
      </div>
    </div>
  );
}
