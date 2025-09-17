import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Email configuration
const email = "adityakushinagar123@gmail.com";

// Custom hook for reduced motion preference
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

const Contact = () => {
  const revealContainer = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !revealContainer.current) {
        return;
      }

      // Animation 1: "What's Next?" headline
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
          },
        });
      }

      // Animation 2: "Get In Touch" title
      if (titleRef.current) {
        gsap.set(titleRef.current, { y: 30, opacity: 0 });
        gsap.to(titleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: revealContainer.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Animation 3: Content (paragraph and button)
      if (contentRef.current) {
        gsap.set(contentRef.current, { y: 30, opacity: 0 });
        gsap.to(contentRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: revealContainer.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === revealContainer.current) {
            trigger.kill();
          }
        });
      };
    },
    { scope: revealContainer, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="contact"
      ref={revealContainer}
      className="max-w-[600px] mx-auto  text-center sm:mb-[50px] flex flex-col items-center justify-center min-h-[60vh]"
    >
      <h2
        ref={headlineRef}
        className="block mb-5 text-[#64ffda] font-SFMono-Regular text-[16px] font-normal before:content-['04.'] before:mr-2 before:text-[#64ffda] before:text-[14px]"
      >
        What's Next?
      </h2>

      <h2
        ref={titleRef}
        className="text-[clamp(40px,5vw,60px)] font-bold text-white mb-4"
      >
        Get In Touch
      </h2>

      <div ref={contentRef}>
        <p className="text-[#a8b2d1] text-[17px] leading-[1.3] mb-12">
          Although I'm not currently looking for any new opportunities, my inbox
          is always open. Whether you have a question or just want to say hi,
          I'll try my best to get back to you!
        </p>
        <a
          href={`mailto:${email}`}
          className="relative cursor-pointer inline-block w-[150px] h-[50px] group"
        >
          {/* Background div - lower z-index */}
          <div className="absolute inset-0 z-10  rounded-[4px] border-[1px] border-active-color bg-active-color"></div>

          {/* Button - higher z-index */}
          <div
            className="absolute z-50 inset-0 text-[16px] font-SFMono-Medium text-active-color cursor-pointer w-f flex justify-center items-center rounded-[4px] duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]  border-[1px] border-active-color bg-[#091930]"
          >
              Say Hello
          </div>
        </a>
      </div>
    </section>
  );
};

export default Contact;
