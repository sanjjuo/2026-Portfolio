import AboutStatement from "./components/AboutStatement/AboutStatement";
import AboutIntro from "./components/AboutIntro/AboutIntro";

export default function About() {
  return (
    <section id="about" aria-label="About me">
      <AboutIntro />
      <AboutStatement />
    </section>
  );
}
