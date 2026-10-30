# Mohamed Sanjeed — Portfolio

My personal portfolio: a single-page site with editorial typography, scroll-driven GSAP animations, WebGL dot-grid backgrounds and 3D models, tuned for fast loading on phones as well as desktops.

## Tech stack

| Area       | Tools                                                                  |
| ---------- | ---------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack), React 19, TypeScript               |
| Styling    | Tailwind CSS v4, with design tokens in `app/theme.css`                 |
| Animation  | GSAP 3 (ScrollTrigger, SplitText, ScrollSmoother), plus CSS keyframes  |
| 3D / WebGL | three.js with `@react-three/fiber` and `drei`, plus a raw WebGL2 dot grid |
| Icons      | `lucide-react`, `react-icons`                                          |
| Fonts      | Geist, Geist Mono, Fraunces and Bricolage Grotesque, via `next/font`   |

## Getting started

```bash
npm install
npm run dev      # http://localhost:4000
npm run build    # production build
npm run start    # serve the production build on port 4000
npm run lint
```

> This project uses Next.js 16, which changes some APIs. For example, `next/image` uses `loading="eager"` and `fetchPriority="high"` instead of the deprecated `priority`. The bundled docs in `node_modules/next/dist/docs/` match the installed version.

### Editor setup

Install the extensions recommended in `.vscode/extensions.json`: Tailwind CSS IntelliSense and ESLint. `.vscode/settings.json` opens `.css` files in Tailwind mode, so `@theme`, `@apply` and `@utility` aren't flagged as unknown at-rules.

### Tailwind v4 conventions

Classes follow Tailwind v4's canonical forms, the ones IntelliSense suggests. The editor only checks open files, so `npm run lint:tw` checks the whole project with Tailwind's own engine (`scripts/check-tailwind-classes.mjs`), and `npm run lint:tw -- --fix` rewrites anything it finds.

| Instead of                    | Write                      |
| ----------------------------- | -------------------------- |
| `-top-[5%]`, `-translate-x-[24%]` | `top-[-5%]`, `translate-x-[-24%]` (negative goes inside the brackets) |
| `bg-gradient-to-t`            | `bg-linear-to-t`           |
| `bg-left-bottom`              | `bg-bottom-left`           |
| `!text-xl`                    | `text-xl!` (important goes at the end) |
| `z-[100]`, `h-[1px]`          | `z-100`, `h-px` (use the scale when it exists) |
| `tailwind.config.js` colours  | `@theme` tokens in `app/theme.css` |

## Project structure

```
app/                         Routes, layout and global styles
components/
  common/                    Shared building blocks (Menu, Preloader, SectionHeading, ...)
  effects/                   Standalone visual effects (DotGrid, LogoLoop, ModelViewer, ...)
  home/                      One folder per section of the home page
    Hero/
      Hero.tsx               Section shell: glow, grid, stepped edge
      components/            Parts used only by this section
    About/  Experience/  Works/  Skills/  Marquee/  Footer/
    Home.tsx                 Puts the sections in order
    index.ts                 Re-exports every section
lib/                         Animation engine, GSAP setup, site details
public/
  images/                    Avatar, signature, brush stroke, project screenshots
  models/                    3D models (.glb)
  *.pdf                      CV, kept at the root for a short download link
```

### `app/`: routes and global setup

| File          | What it does |
| ------------- | ------------ |
| `layout.tsx`  | Root HTML shell. Loads the fonts through `next/font` and sets the SEO, Open Graph and Twitter metadata. Also draws the two thin vertical guide lines that frame the whole page. |
| `template.tsx`| Wraps every page and remounts on navigation, so the **preloader** plays on first load. |
| `page.tsx`    | The home page. Puts the content inside `#smooth-wrapper > #smooth-content`, the structure that GSAP ScrollSmoother needs. The menu and the animation starter sit outside it, so they stay fixed. |
| `theme.css`   | Design tokens in Tailwind v4 `@theme` format: colours, fonts and easing. Change a colour here and it updates everywhere (`bg-brand`, `text-ink`, ...). |
| `globals.css` | Tailwind import, base styles, and the **CSS-only animations**: the hero intro, the preloader, and hover rules that switch off during scrolling. |

**Colour tokens** (`app/theme.css`):

| Token      | Value     | Used for                     |
| ---------- | --------- | ---------------------------- |
| `paper`    | `#f7f1ed` | Page background              |
| `ink`      | `#1a1a1a` | Text, dark sections          |
| `ink-soft` | `#242424` | Skills and About backgrounds |
| `brand`    | `#ff5a1f` | Orange accent, buttons       |
| `sun`      | `#ffe862` | Yellow highlight, glow       |
| `ink-muted`| `#6b6560` | Secondary text               |
| `dot`      | `#3a3446` | Dot-grid dots                |

### `lib/`: logic shared by the whole site

| File            | What it does |
| --------------- | ------------ |
| `animations.ts` | **All GSAP animations live here.** Components never call GSAP directly. They mark elements with `data-anim` attributes, and `initAnimations()` finds them and wires them up (see [Animation system](#animation-system)). |
| `gsap.ts`       | Registers ScrollTrigger and SplitText once, in the browser only. Sets `ignoreMobileResize`, so the page doesn't jump when the mobile address bar shows or hides. |
| `site.ts`       | Personal details used everywhere: name, role, location, email and the CV file name. |
| `utils.ts`      | `cn()` helper for joining class names. |

### `components/common/`: shared building blocks

| Component           | What it does |
| ------------------- | ------------ |
| `Preloader`         | Full-screen intro: the name rises in letter by letter, a counter runs to 100, an orange bar fills, then the panel slides up. **Pure CSS**, so it shows from the first paint without waiting for JavaScript. Hidden when the visitor prefers reduced motion. |
| `Menu`              | Floating yellow "Menu" pill at the bottom of the screen. Opens a full menu of section links and closes when one is picked. The links are plain `<a href="#...">` tags so ScrollSmoother can glide to them. |
| `GsapAnimations`    | Calls `initAnimations()` once, and renders the orange **scroll progress bar** at the top of the screen. |
| `SectionHeading`    | Shared section header: a numbered label such as `(03) Selected work` over a line that draws in, a large title that reveals line by line, and an optional intro. `Accent` renders the italic serif word inside titles. |
| `DotGridBackground` | Wraps the WebGL `DotGrid` and loads it only when it nears the screen. |
| `DubaiTime`         | Live Dubai clock, used in the About section and the footer. |
| `LazyMount`         | Renders its children only when they come within 400px of the viewport. Used to delay heavy widgets such as WebGL and the logo loop. |

### `components/home/`: the page sections, top to bottom

`Home.tsx` puts the sections in order, and `index.ts` re-exports them.

#### 1. `Hero/`
- **`Hero.tsx`**: full-screen section with a soft yellow sun glow, an SVG grid (`GridPattern.tsx`) and a **stepped edge** at the bottom. The five paper blocks shrink away in a wave from the centre as you scroll (`data-anim="steps"`).
- **`components/HeroContent.tsx`**: a layered poster layout.
  - The giant name, **MOHAMED / SANJEED**, uses `VariableProximity`. Each letter gets thinner as the cursor comes near and returns to bold when it moves away.
  - A handwritten **"sanjeed" signature** (`public/images/signature.svg`) draws itself in after the intro.
  - The **figure** (`public/images/avatar.png`) stands in front of the name. On desktop it moves more slowly than the page while scrolling (parallax).
  - The tagline, plus the **magnetic buttons** "Let's talk" and "See my work", which lean toward the cursor.
  - A **spinning "Scroll to explore" badge**, shown on desktop only.
  - **Responsive:** phones and tablets centre everything, the head overlaps the name, and the tagline sits on a paper fade over the photo. From `lg` up, the statement sits at the bottom-left beside the figure.
  - **Intro:** each piece has `data-hero="1..6"` and rises in through a CSS animation, in that order. It's plain CSS, so the hero image counts as the page's main content (Largest Contentful Paint, LCP) straight away instead of waiting for JavaScript.

#### 2. `About/`
- **`AboutIntro`**: editorial "about me" block on a yellow dot-grid background.
  - Shows availability, a live **Dubai clock** (`common/DubaiTime`, which ticks every second and is also used in the footer), the services list, and a "Download CV" link that only appears when the PDF exists in `/public`.
  - The **stats** (2.5+ years, 20+ projects, 2 countries) count up from 0 when scrolled into view (`data-anim="count"`).
- **`AboutStatement`**: a dark band where a sentence lights up **word by word as you scroll** (`ScrollReveal`, scrubbed to the scroll position).
  - Three floating **3D models** (`FloatingModel`, `public/models/*.glb`) rise in, auto-rotate, tilt on hover and can be dragged.
  - three.js is downloaded only when a model is about to come into view.

#### 3. `Experience/`
- **`experienceData.ts`** holds the jobs and education. **`Experience.tsx`** renders them as a timeline.
- Each row has a divider that draws in, and content that fades up.
- On hover, the job title slides right and turns orange. The current job shows a pulsing green "Now" badge.

#### 4. `Works/`
- **`projectsData.ts`** holds each project's title, description, tags, live URL and screenshots. Bullet points are kept in the data but not shown. Projects with `draft: true` are hidden.
- **`ProjectCard.tsx`**: the project number, title, description, tags and a **live-site link** (for example "eunx.eu ↗"). The whole card is clickable and opens the live site in a new tab.
- **`ProjectMedia.tsx`**: screenshots in minimal **browser-window frames** on the project's cover colour.
  - The main shot sits in front, and two more fan out behind it and spread further on hover.
  - **Scroll reveal:** the panel opens from a cropped, rounded frame, then each screenshot rises in. There's no scaling, so the screenshots stay pixel-sharp.
  - A round orange **"View site" badge follows the cursor** with easing, using GPU transforms only. It's hidden on touch devices.

#### 5. `Skills/`
- **`skillsData.ts`** holds the skill groups, each skill with an icon and a brand colour.
- **`SkillsLoop.tsx`**: two endless rows of logos (`LogoLoop`) running in opposite directions. Hovering stops the row, and the logo under the cursor grows and lights up in its brand colour. It's loaded lazily (`LazySkillsLoop.tsx`).
- Below them, the grouped skill pills appear one after another (`data-anim="stagger"`).

#### 6. `Marquee/`
- A tilted orange band of scrolling text: "Open to new opportunities ✱ Frontend Developer ✱ ...".
- It loops endlessly, **speeds up while you scroll**, and runs backwards when you scroll up (`data-anim="marquee"`).

#### 7. `Footer/`
- **`Footer.tsx`**: a giant "Let's work *together.*" headline that reveals line by line, plus a round **magnetic "Get in touch" button**. A yellow fill rises inside it on hover, and it opens an email.
- **`components/BottomFooter.tsx`**: availability, email, social links (LinkedIn, GitHub, Instagram and WhatsApp, each in a new tab) and a back-to-top link.

### `components/effects/`: standalone visual effects

| Component           | What it does |
| ------------------- | ------------ |
| `DotGrid`           | WebGL2 field of dots drawn on the GPU. Dots near the cursor swell and stretch with its speed, a click sends out a shockwave, and an optional intro ripples them in. Accepts theme colours such as `var(--color-sun)`. |
| `VariableProximity` | Splits text into letters and changes each letter's variable-font axes (weight, width) based on cursor distance. Used for the hero name. |
| `ScrollReveal`      | Reveals text word by word, tied to the scroll position. |
| `LogoLoop`          | Smooth, endlessly looping row of logos with pause and hover states. |
| `ModelViewer`       | three.js / react-three-fiber viewer for `.glb` models: studio lighting, auto-rotate, drag-to-rotate, hover tilt, floating motion and a soft shadow. |

### `public/`

| File / folder                               | Used for |
| ------------------------------------------- | -------- |
| `images/avatar.png`                                | Hero figure |
| `images/signature.svg`                             | Handwritten signature, used as a CSS mask |
| `images/brush-stroke.webp`                         | Brush stroke under the About section |
| `images/projects/eunx/`, `images/projects/urbaan/` | Project screenshots |
| `models/frontend.glb`, `github.glb`, `claude.glb`  | 3D models in the About section |
| `Mohamed_Sanjeed_Frontend_Developer_CV.pdf` | Downloadable CV |

## Animation system

Components only describe **what** should animate, using data attributes. `lib/animations.ts` decides **how**. This keeps the components clean and puts every motion setting in one file.

| Attribute                 | Effect |
| ------------------------- | ------ |
| `data-hero="1..n"`        | Hero intro order (CSS, in `globals.css`) |
| `data-anim="split"`       | Heading reveals line by line from a mask (SplitText) |
| `data-anim="fade-up"`     | Fades and slides up when scrolled into view |
| `data-anim="stagger"`     | Fade-up for each child in turn |
| `data-anim="line"`        | Divider draws from left to right |
| `data-anim="parallax"`    | Drifts while scrolling (`data-speed`, `data-parallax-from`) |
| `data-anim="count"`       | Number counts up, for example `0 → 2.5+` |
| `data-anim="project"`     | Project panel opens from a cropped frame, then its `[data-anim-item]`s rise in |
| `data-anim="marquee"`     | Endless loop whose speed reacts to scroll velocity |
| `data-anim="steps"`       | Children shrink away in a wave while scrolling (hero edge) |
| `data-anim="progress"`    | Scroll progress bar |
| `data-magnetic[="0.4"]`   | Element leans toward the cursor with an elastic ease |

**How it starts:**
1. `GsapAnimations` calls `initAnimations()` after the page renders.
2. On mouse and trackpad devices, **ScrollSmoother** is loaded on demand and gives the page smooth, eased scrolling. In-page links glide through it. Touch devices keep native scrolling, which feels best there, with CSS `scroll-behavior: smooth`.
3. The animation groups are set up one at a time, yielding to the browser between each, so startup never blocks the page for long.
4. Magnetic buttons and the "scrolling" flag, which pauses hover effects mid-scroll to avoid lag, only run on devices that can hover.
5. Everything is skipped when the visitor has **reduced motion** turned on.

## Performance techniques

- **The hero and preloader are pure CSS**, so the first screen paints without waiting for JavaScript. The hero image loads eagerly with `fetchPriority="high"`.
- **Heavy code is lazy-loaded:** WebGL dot grids, three.js models and the logo loop are downloaded only when they come near the viewport (`LazyMount`, `next/dynamic` with `ssr: false`). ScrollSmoother is loaded only on mouse and trackpad devices.
- **GPU-only motion:** cursor-follow and parallax effects use transforms, never layout properties.
- **Responsive, optimised images:** `next/image` serves sized images in modern formats with blur placeholders. Screenshots use quality 90 to keep text crisp.
- **Hover effects are disabled while scrolling**, so the project panels don't repaint mid-scroll.

## Accessibility

- Semantic sections with headings, labelled links and `aria-hidden` on purely decorative layers.
- Screen readers get the full name and text, even where the visuals are split into letters or lines.
- Animations are skipped when the visitor prefers reduced motion.
- Every external link opens in a new tab with `rel="noopener noreferrer"`.

## Editing content

| To change...               | Edit |
| -------------------------- | ---- |
| Name, role, email, CV file | `lib/site.ts` |
| Projects                   | `components/home/Works/projectsData.ts`, with screenshots in `public/images/projects/` |
| Jobs and education         | `components/home/Experience/experienceData.ts` |
| Skills                     | `components/home/Skills/skillsData.ts` |
| Colours and fonts          | `app/theme.css` (colours), `app/layout.tsx` (fonts) |
| Animation timing and feel  | `lib/animations.ts` |
| Available for work         | `isAvailable` in `components/home/About/components/AboutIntro/AboutIntro.tsx` |
