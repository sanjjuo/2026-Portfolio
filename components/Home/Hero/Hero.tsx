import ContentPart from "./components/ContentPart";
import GridPattern from "./components/GridPattern";

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative">
      <div className="relative h-svh min-h-160 overflow-hidden bg-paper">
        {/* Glow and grid sit above the stepped edge below (z-10), which
            reaches into the hero, so they continue over it instead of
            stopping in a flat band. The grid fades out toward the bottom to
            blend into the edge. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-11 mask-[linear-gradient(to_bottom,black_70%,transparent)]"
        >
          {/* Soft sun glow. A gradient, not a blur filter, so it costs
              nothing while scrolling. */}
          <div className="absolute -right-[20%] -top-[45%] size-[80vmax] rounded-full bg-radial from-sun/55 via-sun/15 to-transparent to-60%" />
          <GridPattern />
        </div>
        <ContentPart />
      </div>
      {/* Stepped edge into the About section. The steps shrink away in a wave
          as the hero scrolls out (data-anim="steps", lib/animations.ts). */}
      <div
        aria-hidden="true"
        data-anim="steps"
        className="absolute bottom-0 z-10 -mb-12 flex w-full justify-between md:-mb-25"
      >
        <div className="bg-paper w-full h-[14vh] md:h-[30vh]" />
        <div className="bg-paper w-full h-[11vh] md:h-[24vh]" />
        <div className="bg-paper w-full h-[8vh] md:h-[18vh]" />
        <div className="bg-paper w-full h-[11vh] md:h-[24vh]" />
        <div className="bg-paper w-full h-[14vh] md:h-[30vh]" />
      </div>
    </section>
  );
}
