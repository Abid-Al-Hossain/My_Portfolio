import ThreeBackground from "@/components/ThreeBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Career from "@/components/Career";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen w-full overflow-hidden">
        <ThreeBackground />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Career />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
