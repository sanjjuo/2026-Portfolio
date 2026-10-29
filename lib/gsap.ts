import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register plugins once, in the browser only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  // Mobile browsers resize the viewport as the address bar shows and hides.
  // Recalculating every trigger then makes the page jump, so skip it.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollSmoother, ScrollTrigger, SplitText };
