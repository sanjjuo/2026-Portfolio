import ContentPart from "./components/ContentPart";
import GridPattern from "./components/GridPattern";

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative">
      <div className="relative bg-[#F7F1ED] h-svh min-h-140 flex items-center justify-center pb-[8vh] md:pb-[14vh]">
        <GridPattern />
        <ContentPart />
      </div>
      <div aria-hidden="true" className="absolute bottom-0 flex justify-between w-full z-10 -mb-12 md:-mb-25">
        <div className="bg-[#F7F1ED] w-full h-[14vh] md:h-[30vh]" />
        <div className="bg-[#F7F1ED] w-full h-[11vh] md:h-[24vh]" />
        <div className="bg-[#F7F1ED] w-full h-[8vh] md:h-[18vh]" />
        <div className="bg-[#F7F1ED] w-full h-[11vh] md:h-[24vh]" />
        <div className="bg-[#F7F1ED] w-full h-[14vh] md:h-[30vh]" />
      </div>
    </section>
  );
}
