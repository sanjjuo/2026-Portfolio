import Home from "@/components/Home/Home";
import { Footer } from "@/components/Home/index";
import Menu from "@/components/common/Menu/Menu";

export default function page() {
  return (
    <>
      <main>
        <Home />
      </main>
      <Footer />
      <Menu />
    </>
  );
}
