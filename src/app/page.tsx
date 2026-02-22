"use client";

import ThreeBackground from "@/components/ThreeBackground";
import SectionPortal from "@/components/Section";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Career from "@/components/Career";
import Contact from "@/components/Contact";
import {
  ScrollProvider,
  getScrollHeight,
  SECTION_IDS,
} from "@/lib/useScrollCamera";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollHeight, setScrollHeight] = useState(3600);

  useEffect(() => {
    const update = () => setScrollHeight(getScrollHeight());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
        <Career />
      </SectionPortal>
      <SectionPortal sectionIndex={5} id={SECTION_IDS[5]}>
        <Contact />
      </SectionPortal>

      {/* Scroll spacer */}
      <div
        className="scroll-spacer"
        style={{ height: `${scrollHeight}px`, position: "relative", zIndex: 0 }}
      />

      <Footer />
    </ScrollProvider>
  );
}
