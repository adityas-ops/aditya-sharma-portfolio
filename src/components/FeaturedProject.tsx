import { useRef } from "react";
import { gsap } from "gsap";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export interface FeaturedProjectData {
  label: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  color: string;
  image?: string;
  field: "web" | "mobile";
}

interface FeaturedProjectProps {
  project: FeaturedProjectData;
  index: number;
  theme?: "light" | "dark";
}

export function FeaturedProject({
  project,
  index,
  theme = "light",
}: FeaturedProjectProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  const isDark = theme === "dark";
  const isMobile = project.field === "mobile";

  const handleMouseEnter = () => {
    if (frameRef.current) {
      gsap.to(frameRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (frameRef.current) {
      gsap.to(frameRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <div className="featured-project-item flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
      {/* Visual Media Column (Phone Mockup or Browser Mockup) */}
      <div
        className={`w-full ${isMobile ? "lg:w-1/2 flex justify-center" : "lg:w-7/12"} ${
          isEven ? "lg:order-1" : "lg:order-2"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isMobile ? (
          /* Sleek Mobile Phone Frame Mockup */
          <div className="py-2 flex justify-center w-full">
            <div
              ref={frameRef}
              className={`relative w-[250px] sm:w-[275px] md:w-[290px] rounded-[38px] md:rounded-[44px] p-[6px] md:p-[8px] transition-all duration-300 ${
                isDark
                  ? "bg-[#1C1C26] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
                  : "bg-[#22222A] border border-black/20 shadow-[0_25px_50px_rgba(0,0,0,0.3)] ring-1 ring-black/10"
              }`}
            >
              {/* Phone Side Buttons */}
              <div className="absolute -left-[8px] md:-left-[10px] top-20 w-[3px] h-6 bg-[#2D2D3A] rounded-l-sm" />
              <div className="absolute -left-[8px] md:-left-[10px] top-32 w-[3px] h-10 bg-[#2D2D3A] rounded-l-sm" />
              <div className="absolute -left-[8px] md:-left-[10px] top-46 w-[3px] h-10 bg-[#2D2D3A] rounded-l-sm" />
              <div className="absolute -right-[8px] md:-right-[10px] top-28 w-[3px] h-14 bg-[#2D2D3A] rounded-r-sm" />

              {/* Screen Area */}
              <div className="relative rounded-[32px] md:rounded-[36px] overflow-hidden bg-black aspect-[9/19]">
                {/* Dynamic Island Pill */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-between px-2 border border-white/10 shadow-sm pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] ring-1 ring-white/10" />
                  <span className="w-2 h-2 rounded-full bg-[#161622] ring-1 ring-[#333]" />
                </div>

                {/* Screen Image */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center font-syne text-xl font-bold text-white/40 p-4 text-center"
                    style={{ backgroundColor: project.color + "22" }}
                  >
                    {project.title}
                  </div>
                )}

                {/* Home Indicator Bar */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full z-20 pointer-events-none" />
              </div>
            </div>
          </div>
        ) : (
          /* Web Browser Frame Mockup */
          <div
            ref={frameRef}
            className={`w-full rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${
              isDark
                ? "bg-[#14141C] border border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                : "bg-[#1A1A1A] border border-black/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            }`}
          >
            <div className="px-4 py-3 bg-[#202028] flex items-center gap-2 border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-2 font-mono-accent text-xs text-white/40 truncate">
                {project.title.toLowerCase().replace(/\s+/g, "")}.app
              </span>
            </div>

            <div className="relative aspect-video bg-[#0A0A0F] overflow-hidden flex items-center justify-center">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center font-syne text-3xl font-bold text-white/40"
                  style={{ backgroundColor: project.color + "22" }}
                >
                  {project.title}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Project Details Column */}
      <div
        className={`w-full ${isMobile ? "lg:w-1/2" : "lg:w-5/12"} flex flex-col ${
          isEven
            ? "lg:order-2 lg:items-end lg:text-right"
            : "lg:order-1 lg:items-start lg:text-left"
        }`}
      >
        <span className="font-mono-accent text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
          {project.label}
        </span>
        <h3
          className={`font-syne text-3xl lg:text-4xl font-bold mb-4 ${
            isDark ? "text-white" : "text-[#1A1A1A]"
          }`}
        >
          {project.title}
        </h3>

        <div
          className={`p-6 rounded-xl shadow-md mb-6 z-10 backdrop-blur-sm ${
            isDark
              ? "bg-[#181824]/95 border border-white/10"
              : "bg-white/95 border border-black/5"
          }`}
        >
          <p
            className={`font-inter text-base leading-relaxed ${
              isDark ? "text-[#B0B0C0]" : "text-[#7A7067]"
            }`}
          >
            {project.description}
          </p>
        </div>

        <div
          className={`flex flex-wrap gap-x-4 gap-y-1 font-mono-accent text-xs mb-6 ${
            isDark ? "text-[#8A8A9E]" : "text-[#7A7067]"
          }`}
        >
          {project.tech.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl hover:text-[var(--accent)] transition-all transform hover:scale-110 ${
                isDark ? "text-white" : "text-[#1A1A1A]"
              }`}
              aria-label="GitHub Repository"
            >
              <FiGithub />
            </a>
          )}
          {project.live && project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl hover:text-[var(--accent)] transition-all transform hover:scale-110 ${
                isDark ? "text-white" : "text-[#1A1A1A]"
              }`}
              aria-label="Live Demo"
            >
              <FiExternalLink />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProject;
