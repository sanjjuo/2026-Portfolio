"use client";

import LazyMount from "@/components/common/LazyMount/LazyMount";
import dynamic from "next/dynamic";

// The logo loop's code is downloaded only when the Skills section comes near
// the screen, not with the first page load.
const SkillsLoop = dynamic(() => import("./SkillsLoop"), { ssr: false });

export default function LazySkillsLoop() {
  return (
    <LazyMount className="min-h-26 md:min-h-30">
      <SkillsLoop />
    </LazyMount>
  );
}
