import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Job {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  tech: string[];
}

const JOBS: Job[] = [
  {
    title: "Frontend Engineer & App Developer",
    company: "Civil Guruji",
    period: "Sep 2023 — Present",
    bullets: [
      "Built 3+ responsive websites and mobile apps serving over 50,000 active student users.",
      "Collaborated closely with product designers and PMs to ship production-grade user experiences.",
      "Led core frontend architecture decisions and mentored junior developers across the team.",
    ],
    tech: ["React JS", "Next.js", "React Native", "Tailwind CSS", "NativeWind"],
  },
  {
    title: "App Developer",
    company: "GriHub",
    period: "Aug 2024 — Dec 2025",
    bullets: [
      "Built GriHub mobile app from scratch using React Native and NativeWind for cross-platform iOS & Android.",
      "Created seamless e-commerce and communication experiences connecting buyers and suppliers.",
      "Designed and developed custom internal CRM portal with Next.js and Tailwind CSS.",
    ],
    tech: [
      "React Native",
      "NativeWind",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
    ],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-header", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: ".experience-section", start: "top 75%" },
      });

      gsap.from(".exp-tabs", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: { trigger: ".experience-section", start: "top 70%" },
      });

      gsap.from(".exp-content", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        scrollTrigger: { trigger: ".experience-section", start: "top 70%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTabChange = (index: number) => {
    // Animate content out then in
    const content = document.querySelector(".exp-content-inner");
    if (content) {
      gsap.to(content, {
        opacity: 0,
        y: 10,
        duration: 0.15,
        onComplete: () => {
          setActiveTab(index);
          gsap.fromTo(
            content,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          );
        },
      });
    } else {
      setActiveTab(index);
    }
  };

  const activeJob = JOBS[activeTab];

  return (
    <section
      id="experience"
      ref={sectionRef}
      data-bg="#111118"
      className="experience-section relative w-full bg-[#111118] text-white py-28 md:py-36 overflow-hidden"
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="exp-header mb-12">
          <span className="font-mono-accent text-xs md:text-sm font-bold text-[var(--accent)] tracking-wider uppercase mb-2 block">
            02. Where I've Worked
          </span>
          <h2 className="font-syne text-3xl md:text-5xl font-bold text-white">
            Experience.
          </h2>
        </div>

        {/* Tab Layout: left tabs + right content */}
        <div className="flex flex-col md:flex-row gap-0 md:gap-0">
          {/* Tab Buttons — Left Side */}
          <div className="exp-tabs flex md:flex-col border-b md:border-b-0 md:border-l-2 border-white/10 relative">
            {/* Active indicator */}
            <div
              className="hidden md:block absolute left-[-2px] w-[2px] h-[42px] bg-[var(--accent)] transition-all duration-300 ease-out rounded-full"
              style={{ top: `${activeTab * 42}px` }}
            />
            <div
              className="md:hidden absolute bottom-[-2px] h-[2px] bg-[var(--accent)] transition-all duration-300 ease-out rounded-full"
              style={{
                left: `${activeTab * (100 / JOBS.length)}%`,
                width: `${100 / JOBS.length}%`,
              }}
            />

            {JOBS.map((job, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`px-5 py-2.5 text-left font-mono-accent text-sm transition-all duration-200 whitespace-nowrap ${
                  activeTab === index
                    ? "text-[var(--accent)] bg-[var(--accent)]/5"
                    : "text-[#8A8A9E] hover:text-[var(--accent)] hover:bg-white/[0.03]"
                }`}
              >
                {job.company}
              </button>
            ))}
          </div>

          {/* Content Panel — Right Side */}
          <div className="exp-content flex-1 md:pl-8 pt-6 md:pt-0 min-h-[320px]">
            <div className="exp-content-inner">
              {/* Role & Company */}
              <h3 className="font-inter text-xl md:text-2xl font-semibold text-white mb-1">
                {activeJob.title}{" "}
                <span className="text-[var(--accent)]">
                  @ {activeJob.company}
                </span>
              </h3>

              {/* Period */}
              <p className="font-mono-accent text-xs text-[#8A8A9E] mb-6">
                {activeJob.period}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-4 mb-8">
                {activeJob.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 font-inter text-[15px] text-[#B0B0C0] leading-relaxed"
                  >
                    <span className="text-[var(--accent)] text-base mt-0.5 flex-shrink-0">
                      ▹
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {activeJob.tech.map((item, idx) => (
                  <span
                    key={idx}
                    className="font-mono-accent text-[11px] text-[#8A8A9E] border border-white/10 px-2.5 py-1 rounded bg-white/[0.02]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
