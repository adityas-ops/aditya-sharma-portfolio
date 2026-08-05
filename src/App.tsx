import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

gsap.registerPlugin(ScrollTrigger);

export function App() {
  useLenis();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-bg]");
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const bg = section.dataset.bg;
      if (!bg) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () =>
          gsap.to("body", {
            backgroundColor: bg,
            duration: 0.6,
            ease: "power2.out",
          }),
        onEnterBack: () =>
          gsap.to("body", {
            backgroundColor: bg,
            duration: 0.6,
            ease: "power2.out",
          }),
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-[#FF4D00]/30 selection:text-white">
      <Cursor />
      <Navbar />
      {/* <SocialSidebar /> */}

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <footer className="w-full bg-[#0A0A0F] py-8 text-center border-t border-white/5 font-mono-accent text-xs text-[#6B6B7A]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>Designed & Built by Aditya Sharma</p>
          <p>© {new Date().getFullYear()} — All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
