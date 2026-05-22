"use client";

import ThreeBackground from "@/components/ThreeBackground";
import SectionPortal from "@/components/Section";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ProductsSection from "@/components/ProductsSection";
import Career from "@/components/Career";
import Contact from "@/components/Contact";
import {
  ScrollProvider,
  SECTION_IDS,
  SCROLL_SPACER_HEIGHT,
} from "@/lib/useScrollCamera";

export default function Home() {
  return (
    <ScrollProvider>
      <Header />

      {/* 3D Background (stars, sparkles, nebulae) */}
      <ThreeBackground />

      {/* HTML Section Overlays */}
      <SectionPortal sectionIndex={0} id={SECTION_IDS[0]}>
        <Hero />
      </SectionPortal>
      <SectionPortal sectionIndex={1} id={SECTION_IDS[1]}>
        <About />
      </SectionPortal>
      <SectionPortal sectionIndex={2} id={SECTION_IDS[2]}>
        <Skills />
      </SectionPortal>
      <SectionPortal sectionIndex={3} id={SECTION_IDS[3]}>
        <Projects />
      </SectionPortal>
      <SectionPortal sectionIndex={4} id={SECTION_IDS[4]}>
        <ProductsSection />
      </SectionPortal>
      <SectionPortal sectionIndex={5} id={SECTION_IDS[5]}>
        <Career />
      </SectionPortal>
      <SectionPortal sectionIndex={6} id={SECTION_IDS[6]}>
        <Contact />
      </SectionPortal>

      {/* Scroll spacer */}
      <div
        className="scroll-spacer"
        style={{
          height: SCROLL_SPACER_HEIGHT,
          position: "relative",
          zIndex: 0,
        }}
      />

      <Footer />
    </ScrollProvider>
  );
}
