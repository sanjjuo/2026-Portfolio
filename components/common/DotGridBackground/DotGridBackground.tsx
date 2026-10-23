import DotGrid from "@/components/DotGrid";

interface Props {
  width: string;
  height: string;
  baseColor: string;
  activeColor: string;
  backgroundColor: string;
  intro?: boolean;
}
export default function DotGridBackground({
  intro = true,
  baseColor,
  activeColor,
  backgroundColor,
  height,
  width,
}: Props) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: width,
        height: height,
        position: "relative",
        backgroundColor: backgroundColor,
      }}
    >
      <DotGrid
        baseColor={baseColor}
        activeColor={activeColor}
        shape="circle"
        dotSize={2}
        gap={20}
        proximity={140}
        strength={1}
        bounce={0.6}
        tension={0.05}
        returnDuration={0.8}
        shockRadius={320}
        shockStrength={5}
        swell={0.8}
        stretch={0.5}
        glow={0.5}
        fade={0}
        intro={intro}
        opacity={1}
        mouseInteraction
        clickShock
      />
    </div>
  );
}
