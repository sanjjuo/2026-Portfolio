import ContentPart from "./components/ContentPart";
import GridPattern from "./components/GridPattern";

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative">
      <div className="relative h-svh min-h-160 overflow-hidden bg-paper">
        {/* Soft sun glow behind the grid. A gradient, not a blur filter, so it
            costs nothing while scrolling. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[20%] -top-[45%] size-[80vmax] rounded-full bg-radial from-sun/55 via-sun/15 to-transparent to-60%"
        />
        <GridPattern />
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
