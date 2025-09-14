import { useRef, useEffect, useState } from "react";
import Featured from "./Featured";
import ProjectList from "./ProjectList";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom hook for reduced motion preference
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

function Project() {
  const revealContainer = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  useGSAP(() => {
    if (prefersReducedMotion || !revealContainer.current) {
      return;
    }

    // Animation 1: Headline section
    if (headlineRef.current) {
      gsap.set(headlineRef.current, { y: 30, opacity: 0 });
      gsap.to(headlineRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: revealContainer.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === revealContainer.current) {
          trigger.kill();
        }
      });
    };
  }, { scope: revealContainer, dependencies: [prefersReducedMotion] });

  return (
    <div
      ref={revealContainer}
      className="min-h-screen pt-[100px] sm:pt-[70px] max-w-full  mx-auto"
    >
      <div
        ref={headlineRef}
        className="flex justify-start items-center gap-[20px] mb-[50px]"
      >
        <div className="flex items-end">
          <p className="relative before:content-['03.'] before:font-SFMono-Regular before:text-[1.25rem] sm:before:text-[1.5rem] before:text-active-color before:mr-[10px] leading-none text-[1.75rem] sm:text-[2rem] font-Calibre-Semibold text-[#ccd6f6] a font-[600]">
            Some Things I've Built
          </p>
        </div>
        <div className="sm:w-[150px] w-[16%] h-[1.5px] bg-[#233554]"></div>
      </div>
      <Featured />
      <ProjectList />
    </div>
  );
}

export default Project;
