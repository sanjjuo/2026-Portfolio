import TestimonialSlider from "./components/TestimonialSlider";
import { visibleTestimonials } from "./testimonialsData";

export default function Testimonials() {
  // Hidden until at least one quote is approved (see testimonialsData.ts).
  if (!visibleTestimonials.length) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-ink text-paper"
    >
      <div className="container pt-24 pb-24 md:pt-36 md:pb-36">
        <TestimonialSlider
          heading={
            <div>
              <p
                data-anim="fade-up"
                className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-paper/60 md:mb-10 md:text-sm"
              >
                (04) <span className="ml-2">Testimonials</span>
              </p>
              <h2
                id="testimonials-title"
                data-anim="split"
                className="font-serif text-5xl leading-[1.22] tracking-tight sm:text-6xl md:text-7xl xl:text-8xl"
              >
                They say it
                <br />
                <span className="bg-brand px-[0.1em] text-ink [box-decoration-break:clone]">
                  better than me.
                </span>
              </h2>
            </div>
          }
        />
      </div>
    </section>
  );
}
