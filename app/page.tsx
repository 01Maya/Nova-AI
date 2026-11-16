import BrandCarousel from "@/components/sections/BrandCarousel";
import Company from "@/components/sections/Company";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Proof from "@/components/sections/Proof";
import Statement from "@/components/sections/Statement";
import Stats from "@/components/sections/Stats";
import Workspace from "@/components/sections/Workspace";

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <BrandCarousel />
        <Statement />
        <Company />
        <Stats />
        <Workspace />
        <Proof />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
