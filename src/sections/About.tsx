import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "𝗧𝗦" },
      { name: "JavaScript", icon: "𝗝𝗦" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "GSAP", icon: "✦" },
      { name: "Three.js", icon: "◆" },
      { name: "HTML/CSS", icon: "◈" },
      { name: "React Native", icon: "📱" },
      { name: "Expo", icon: "◉" },
      { name: "NativeWind", icon: "💨" },
      { name: "Node.js", icon: "⬢" },
      { name: "Zustand", icon: "🐻" },
      { name: "Git", icon: "⎇" },
      { name: "Figma", icon: "◎" },
      { name: "REST APIs", icon: "⇄" },
    ],
  },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-label", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: { trigger: ".about-section", start: "top 75%" },
      });

      gsap.from(".about-heading", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: { trigger: ".about-section", start: "top 75%" },
      });

      gsap.from(".about-body p", {
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        scrollTrigger: { trigger: ".about-section", start: "top 75%" },
      });

      gsap.from(".skill-group", {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".about-section", start: "top 60%" },
      });

      gsap.from(".skill-chip", {
        scale: 0.85,
        opacity: 0,
        stagger: 0.02,
        duration: 0.4,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".about-section", start: "top 85%" },
      });

      gsap.from(".portrait-wrap", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: ".about-section", start: "top 75%" },
      });

      gsap.fromTo(
        ".portrait-img",
        { filter: "grayscale(100%) sepia(20%)" },
        {
          filter: "grayscale(0%) sepia(0%)",
          duration: 1.2,
          scrollTrigger: { trigger: ".about-section", start: "top 70%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      data-bg="#F5F0E8"
      className="about-section relative w-full bg-[#F5F0E8] py-24 md:py-32 text-[#1A1A1A] overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
        {/* Left Column — Bio & Skills */}
        <div className="w-full lg:w-[60%] flex flex-col items-start">
          <span className="about-label font-mono-accent text-xs md:text-sm font-bold text-[var(--accent)] tracking-wider uppercase mb-3">
            01. About Me
          </span>

          <h2 className="about-heading font-syne text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1A1A1A] leading-tight mb-4">
            Build. Ship. Iterate.
          </h2>

          <div className="about-body space-y-3 font-inter text-base text-[#6B6157] leading-relaxed mb-8">
            <p>
              Hello! I'm Aditya, a frontend and mobile app developer passionate
              about crafting beautiful, responsive interfaces. I love turning
              ideas into reality using React, React Native, and modern web
              technologies.
            </p>
          </div>

          {/* Integrated Skills / Toolkit Section */}
          <div className="pt-6 border-t border-[#1A1A1A]/10 w-full space-y-3">
            <span className="font-mono-accent text-xs font-bold text-[var(--accent)] tracking-wider uppercase block">
              Technologies I Work With
            </span>

            <div className="space-y-1">
              {SKILL_GROUPS.map((group) => (
                <div key={group.category}>
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className=" group flex items-center gap-2 px-4 py-2.5 bg-white border border-black/10 rounded-xl shadow-sm hover:shadow-md hover:border-[var(--accent)]/50 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                      >
                        <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                          {skill.icon}
                        </span>
                        <span className="font-inter text-xs font-semibold text-[#1A1A1A] group-hover:text-[var(--accent)] transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Portrait (sticky top) */}
        <div className="w-full lg:w-[36%] flex justify-center lg:justify-end lg:sticky lg:top-28">
          <div className="portrait-wrap w-full max-w-[340px]">
            <img
              src="/assets/adicar.jpeg"
              alt="Aditya Sharma"
              loading="lazy"
              decoding="async"
              className="portrait-img rounded-xl shadow-md border border-black/10"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                if (target.parentElement) {
                  const fallback = document.createElement("div");
                  fallback.className =
                    "w-full h-64 rounded-xl border-2 border-[#1A1A1A] bg-[#D4C9B8] flex items-center justify-center font-syne text-5xl font-bold text-[#1A1A1A]";
                  fallback.innerText = "A.S";
                  target.parentElement.appendChild(fallback);
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
