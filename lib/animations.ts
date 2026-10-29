import { gsap, ScrollSmoother, ScrollTrigger, SplitText } from "./gsap";

/*
 * All site animations live here. Components only mark elements with data
 * attributes, and initAnimations() wires them up:
 *
 *   data-hero="1..n"         Hero intro order. Runs in CSS (app/globals.css)
 *                            so the hero never waits for JavaScript.
 *   data-magnetic            Leans toward the cursor while hovered. An
 *                            optional value sets the pull (default 0.35).
 *   data-anim="steps"        Children shrink away in a wave while the page
 *                            scrolls past their parent (hero stepped edge).
 *   data-anim="split"        Heading reveals line by line from a mask.
 *   data-anim="fade-up"      Fades and slides up when scrolled into view.
 *   data-anim="stagger"      Same as fade-up, for each child in turn.
 *   data-anim="line"         Horizontal rule that draws from left to right.
 *   data-anim="parallax"     Drifts while scrolling. data-speed sets how far
 *                            (in % of its height, negative moves up), and
 *                            data-parallax-from a minimum screen width.
 *   data-anim="count"        Counts up to its number, e.g. "2.5+".
 *   data-anim="project"      Project panel: opens from a cropped frame, then
 *                            each [data-anim-item] rises in. (No scaling, so
 *                            screenshots end pixel-sharp.)
 *   data-anim="marquee"      Endless horizontal text loop that speeds up
 *                            while scrolling.
 *   data-anim="progress"     Bar that fills with page scroll progress.
 *
 * Scrolling is smoothed with ScrollSmoother when the page has
 * #smooth-wrapper > #smooth-content (see app/page.tsx).
 *
 * Nothing runs when the visitor prefers reduced motion.
 */

const EASE = "expo.out";
const startAt = "top 85%";

const all = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);

// Room in line masks for italic overhangs and descenders, without shifting
// layout.
const maskRoom = {
  paddingLeft: "0.08em",
  marginLeft: "-0.08em",
  paddingRight: "0.15em",
  marginRight: "-0.15em",
  paddingBottom: "0.3em",
  marginBottom: "-0.3em",
};

function splitReveal() {
  all('[data-anim="split"]').forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      // Lines read naturally to screen readers, and an aria-label isn't
      // allowed on every element (e.g. <p>), so leave ARIA alone.
      aria: "none",
      // Runs again after a resize re-splits the lines.
      onSplit: (self) => {
        gsap.set(self.masks, maskRoom);
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: startAt },
        });
      },
    });
  });
}

function fadeUp() {
  all('[data-anim="fade-up"]').forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 50,
      duration: 1.2,
      ease: EASE,
      delay: Number(el.dataset.delay ?? 0),
      scrollTrigger: { trigger: el, start: startAt },
    });
  });
}

function staggerChildren() {
  all('[data-anim="stagger"]').forEach((el) => {
    gsap.from(el.children, {
      autoAlpha: 0,
      y: 40,
      duration: 1,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: startAt },
    });
  });
}

function drawLine() {
  all('[data-anim="line"]').forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.4,
      ease: "power4.inOut",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });
}

function parallax() {
  all('[data-anim="parallax"]').forEach((el) => {
    // data-parallax-from="1024" limits the drift to screens at least that wide.
    const from = Number(el.dataset.parallaxFrom ?? 0);
    if (window.innerWidth < from) return;
    gsap.fromTo(
      el,
      { yPercent: 0 },
      {
        yPercent: Number(el.dataset.speed ?? -10),
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}

function countUp() {
  all('[data-anim="count"]').forEach((el) => {
    // Keep the original text: re-running (e.g. React StrictMode) must not
    // read back a half-counted number.
    el.dataset.countText ??= el.textContent ?? "";
    const text = el.dataset.countText;
    const match = text.match(/[\d.]+/);
    if (!match) return;
    const target = parseFloat(match[0]);
    const decimals = match[0].split(".")[1]?.length ?? 0;
    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: startAt },
      onUpdate: () => {
        el.textContent = text.replace(
          match[0],
          counter.value.toFixed(decimals),
        );
      },
    });
  });
}

function projectPanels() {
  all('[data-anim="project"]').forEach((panel) => {
    const items = panel.querySelectorAll<HTMLElement>("[data-anim-item]");

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: { trigger: panel, start: "top 80%" },
    });

    tl.fromTo(
      panel,
      { clipPath: "inset(12% 6% 0% 6% round 28px)", y: 80 },
      {
        clipPath: "inset(0% 0% 0% 0% round 28px)",
        y: 0,
        duration: 1.6,
        clearProps: "clipPath",
      },
    );
    if (items.length) {
      tl.from(
        items,
        { autoAlpha: 0, y: 60, duration: 1.4, stagger: 0.12 },
        0.2,
      );
    }
  });
}

function marquee() {
  all('[data-anim="marquee"]').forEach((track) => {
    // The track holds two copies, so moving it by half loops seamlessly.
    const loop = gsap.to(track, {
      xPercent: -50,
      duration: 30,
      ease: "none",
      repeat: -1,
      paused: true,
    });

    // Scrolling speeds the loop up, and scrolling up reverses it.
    ScrollTrigger.create({
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      // Only loop while on screen.
      onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5);
        gsap.fromTo(
          loop,
          { timeScale: self.direction * boost },
          {
            timeScale: self.direction,
            duration: 1,
            ease: "power2.out",
            overwrite: true,
          },
        );
      },
    });
  });
}

function steps() {
  all('[data-anim="steps"]').forEach((wrap) => {
    gsap.to(wrap.children, {
      scaleY: 0,
      transformOrigin: "center top",
      ease: "none",
      stagger: { each: 0.12, from: "center" },
      scrollTrigger: {
        trigger: wrap.parentElement ?? wrap,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  });
}

// Smooth, eased page scrolling. Touch devices keep native scrolling, which
// feels best there. Returns a cleanup.
function smoothScroll() {
  const wrapper = document.querySelector<HTMLElement>("#smooth-wrapper");
  const content = document.querySelector<HTMLElement>("#smooth-content");
  if (!wrapper || !content) return () => {};

  const smoother = ScrollSmoother.create({
    wrapper,
    content,
    smooth: 1.1,
    smoothTouch: false,
    // Off: this site uses data-speed for its own parallax.
    effects: false,
  });

  // In-page links ("#works") glide through the smoother instead of jumping.
  const onClick = (event: MouseEvent) => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    const target = link && document.querySelector(link.getAttribute("href")!);
    if (!target) return;
    event.preventDefault();
    smoother.scrollTo(target, true, "top top");
    history.replaceState(null, "", link.getAttribute("href"));
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    smoother.kill();
  };
}

// Returns a cleanup that removes the pointer listeners.
function magnetic() {
  const cleanups = all("[data-magnetic]").map((el) => {
    const pull = Number(el.dataset.magnetic || 0.35);
    const xTo = gsap.quickTo(el, "x", {
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });

    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * pull);
      yTo((event.clientY - (rect.top + rect.height / 2)) * pull);
    };
    const reset = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function scrollProgress() {
  all('[data-anim="progress"]').forEach((bar) => {
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.3,
        },
      },
    );
  });
}

// Starts every animation on the page. Returns a cleanup function.
export function initAnimations() {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", (context) => {
    // Create the smoother first, so every ScrollTrigger uses it. Touch
    // devices scroll natively, so phones skip it (less work on load).
    const stopSmoothing = window.matchMedia("(pointer: fine)").matches
      ? smoothScroll()
      : () => {};

    // Set the rest up one group per task, yielding in between, so loading
    // never blocks the page for long (better Total Blocking Time).
    const setups = [
      splitReveal,
      fadeUp,
      staggerChildren,
      drawLine,
      parallax,
      countUp,
      projectPanels,
      marquee,
      steps,
      scrollProgress,
    ];
    let next = 0;
    let timer = 0;
    const runNext = () => {
      if (next < setups.length) {
        context.add(setups[next++]);
        timer = window.setTimeout(runNext, 0);
      } else {
        ScrollTrigger.refresh();
      }
    };
    runNext();

    return () => {
      clearTimeout(timer);
      stopSmoothing();
    };
  });

  // Magnetic pull only makes sense with a mouse.
  mm.add("(prefers-reduced-motion: no-preference) and (hover: hover)", () =>
    magnetic(),
  );

  // Images and fonts change the page height after load.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);
  document.fonts?.ready.then(refresh);

  return () => {
    window.removeEventListener("load", refresh);
    mm.revert();
  };
}
