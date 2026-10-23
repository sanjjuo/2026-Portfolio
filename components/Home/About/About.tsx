import DescSection from "./components/DescSection/DescSection";
import ImageSection from "./components/ImageSection/ImageSection";

export default function About() {
  return (
    <section id="about" aria-label="About me">
      <ImageSection />
      <DescSection />
    </section>
  );
}
