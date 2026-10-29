"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Renders its children only once they come near the viewport, so heavy
// widgets (WebGL, measuring loops) don't slow down the first page load.
export default function LazyMount({
  children,
  className,
  rootMargin = "400px",
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {show && children}
    </div>
  );
}
