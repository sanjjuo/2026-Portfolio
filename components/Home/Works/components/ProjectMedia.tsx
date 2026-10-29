"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

// A screenshot in a minimal browser window, never scaled so its text stays
// sharp. "cropped" shows only the top 16:9 part, so cards of different
// screenshots line up.
function BrowserFrame({
  image,
  alt,
  host,
  isDark,
  sizes,
  cropped = false,
}: {
  image: StaticImageData;
  alt: string;
  host: string;
  isDark: boolean;
  sizes: string;
  cropped?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 md:rounded-xl ${
        isDark ? "bg-ink ring-white/10" : "bg-white ring-black/5"
      }`}
    >
      <div className="flex items-center gap-3 px-3 py-2 md:px-4 md:py-2.5">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className={`size-1.5 rounded-full md:size-2 ${isDark ? "bg-white/20" : "bg-black/15"}`}
            />
          ))}
        </div>
        {host && (
          <span
            className={`mx-auto truncate rounded-full px-3 py-0.5 text-[9px] font-medium tracking-wide md:text-[11px] ${
              isDark ? "bg-white/10 text-white/60" : "bg-black/5 text-black/50"
            }`}
          >
            {host}
          </span>
        )}
        {/* Balances the dots so the address stays centered. */}
        <span className="w-6 md:w-8" />
      </div>
      {cropped ? (
        <div className="relative aspect-video">
          <Image
            src={image}
            alt={alt}
            fill
            sizes={sizes}
            quality={90}
            placeholder="blur"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <Image
          src={image}
          alt={alt}
          sizes={sizes}
          quality={90}
          placeholder="blur"
          className="block h-auto w-full"
        />
      )}
    </div>
  );
}

// Project screenshots on the cover color: the main shot in front, the others
// fanned out behind it (and spreading further on hover). The scroll reveal
// comes from data-anim="project" (lib/animations.ts), and a "View site" badge
// follows the cursor.
export default function ProjectMedia({
  images,
  title,
  href,
  cover,
  isDark,
}: {
  images: StaticImageData[];
  title: string;
  href: string;
  cover: string;
  isDark: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const [mainImage, ...moreImages] = images;
  const host = href.startsWith("http")
    ? new URL(href).hostname.replace(/^www\./, "")
    : "";

  // Moves the badge with a GPU transform, at most once per frame, so it never
  // triggers layout.
  const frame = useRef(0);
  const moveBadge = (event: React.PointerEvent) => {
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect || !badgeRef.current) return;
      badgeRef.current.style.transform = `translate3d(${clientX - rect.left}px, ${clientY - rect.top}px, 0)`;
    });
  };

  // Left and right card positions. GSAP animates the inner [data-anim-item],
  // so these transforms on the wrapper stay untouched.
  const fan = [
    "-translate-x-[24%] -translate-y-[20%] -rotate-6 group-hover/media:-translate-x-[32%] group-hover/media:-rotate-9",
    "translate-x-[24%] -translate-y-[20%] rotate-6 group-hover/media:translate-x-[32%] group-hover/media:rotate-9",
  ];

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      data-anim="project"
      onPointerMove={moveBadge}
      className="group/media relative z-10 block aspect-4/3 overflow-hidden rounded-2xl sm:aspect-16/10 md:cursor-none md:rounded-[28px]"
      style={{ backgroundColor: cover }}
    >
      {/* Soft light from the top so flat covers get some depth. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.25),transparent_70%)]"
      />

      {mainImage ? (
        <div className="absolute inset-0 grid place-items-center">
          {moreImages.slice(0, 2).map((image, i) => (
            <div
              key={image.src}
              className={`absolute w-[62%] transition-[translate,rotate] duration-1000 ease-out-expo will-change-transform ${fan[i]}`}
            >
              <div data-anim-item className="opacity-90">
                <BrowserFrame
                  image={image}
                  alt={`${title} screenshot ${i + 2}`}
                  host={host}
                  isDark={isDark}
                  sizes="(min-width: 1280px) 800px, 62vw"
                  cropped
                />
              </div>
            </div>
          ))}

          <div className="relative mt-[10%] w-[78%] will-change-transform">
            <div data-anim-item>
              <BrowserFrame
                image={mainImage}
                alt={`${title} home page`}
                host={host}
                isDark={isDark}
                sizes="(min-width: 1280px) 1040px, 80vw"
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          data-anim-item
          className={`absolute inset-0 grid place-content-center px-6 text-center text-5xl font-bold uppercase tracking-tighter sm:text-7xl lg:text-9xl ${
            isDark ? "text-white" : "text-ink"
          }`}
        >
          <span className="transition-[scale] duration-1000 ease-out-expo group-hover/media:scale-105">
            {title}
          </span>
        </div>
      )}

      <span
        ref={badgeRef}
        className="pointer-events-none absolute top-0 left-0 z-10 hidden size-28 -translate-x-1/2 -translate-y-1/2 scale-0 will-change-transform place-content-center rounded-full bg-brand text-center text-xs font-semibold uppercase leading-snug tracking-[0.15em] text-white shadow-lg transition-[scale] duration-500 ease-out-expo group-hover/media:scale-100 md:grid lg:size-32"
      >
        View
        <br />
        site
      </span>
    </a>
  );
}
