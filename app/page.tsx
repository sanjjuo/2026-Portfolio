import Home from "@/components/home/Home";
import { Footer } from "@/components/home/index";
import Menu from "@/components/common/Menu/Menu";
import GsapAnimations from "@/components/common/GsapAnimations/GsapAnimations";

export default function page() {
  return (
    <>
      {/* ScrollSmoother moves #smooth-content (lib/animations.ts). Fixed
          elements like the menu must stay outside it. */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Home />
          </main>
          <Footer />
        </div>
      </div>
      <Menu />
      <GsapAnimations />
    </>
  );
}
