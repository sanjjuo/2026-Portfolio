import DotGridBackground from "@/components/common/DotGridBackground/DotGridBackground";
import { Accent } from "@/components/common/SectionHeading/SectionHeading";
import { site } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";
import BottomFooter from "./components/BottomFooter";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden text-paper">
      <div className="absolute inset-0">
        <DotGridBackground
          height="100%"
          width="100%"
          backgroundColor="var(--color-ink)"
        />
      </div>

      <div className="container relative flex min-h-120 flex-col justify-between gap-16 pt-20 pb-28 sm:min-h-160 md:min-h-200 md:gap-24 md:pt-32 md:pb-32">
        {/* Closing call to action: giant headline with a round magnetic
            "Get in touch" button that opens an email. */}
        <div className="relative">
          <p
            data-anim="fade-up"
            className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-paper/60 md:mb-10 md:text-sm"
          >
            ( Have a project or role in mind? )
          </p>
          <h2
            data-anim="split"
            className="text-[17vw] font-bold leading-[0.88] tracking-tighter lg:text-[13vw]"
          >
            Let&apos;s work
            <br />
            <span className="text-sun">
              <Accent>together.</Accent>
            </span>
          </h2>

          <div
            data-anim="fade-up"
            className="mt-10 flex justify-end lg:absolute lg:right-0 lg:bottom-[6%] lg:mt-0"
          >
            <a
              href={`mailto:${site.email}`}
              data-magnetic="0.4"
              className="group relative grid size-36 place-content-center overflow-hidden rounded-full bg-brand text-center text-sm font-semibold uppercase leading-tight tracking-[0.12em] text-ink sm:size-44 md:size-52 md:text-base"
            >
              {/* Sun fill that rises from the bottom on hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full rounded-full bg-sun transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
              />
              <span className="relative flex flex-col items-center gap-2">
                <ArrowUpRight className="size-7 transition-transform duration-500 group-hover:rotate-45 md:size-9" />
                Get in
                <br />
                touch
              </span>
            </a>
          </div>
        </div>

        <BottomFooter />
      </div>
    </footer>
  );
}
