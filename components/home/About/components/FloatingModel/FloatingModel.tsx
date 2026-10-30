"use client";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Three.js is heavy, so it is only downloaded when a viewer is about to scroll into view.
const ModelViewer = dynamic(() => import("@/components/effects/ModelViewer"), {
  ssr: false,
});

export default function FloatingModel({
  image,
  className,
  startAngle = -35,
}: {
  image: string;
  className?: string;
  startAngle?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("size-44 lg:size-52", className)}>
      {inView && (
        <ModelViewer
          url={image}
          width="100%"
          height="100%"
          environment="studio"
          autoRotate
          environmentIntensity={1}
          exposure={1}
          intro="rise"
          autoRotateSpeed={0.4}
          autoRotateDelay={2}
          dragRotate
          turntable={false}
          zoom={false}
          hoverTilt={0.15}
          float={0.3}
          shadow
          shadowOpacity={0.45}
          fit={0.8}
          offsetX={0}
          offsetY={0}
          startAngle={startAngle}
          tilt={12}
          resetOnDoubleClick
        />
      )}
    </div>
  );
}
