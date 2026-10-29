import Preloader from "@/components/common/Preloader/Preloader";

// Wraps every page and remounts on navigation, so the intro screen plays on
// first load and on each page change.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      {children}
    </>
  );
}
