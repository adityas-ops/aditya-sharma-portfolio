import React, { useRef } from "react";
import { gsap } from "gsap";
import { FiFolder, FiGithub, FiExternalLink } from "react-icons/fi";

export interface ProjectCardData {
  title: string;
  desc: string;
  tech: string[];
  github?: string;
  live?: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
  theme?: "light" | "dark";
}

export function ProjectCard({ project, theme = "light" }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 800,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`project-grid-card rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
        isDark
          ? "bg-[#181824] border border-white/10 shadow-lg hover:border-[var(--accent)]/50 hover:shadow-2xl hover:-translate-y-1.5"
          : "bg-white border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-[var(--accent)]/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1.5"
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <FiFolder className="text-3xl text-[var(--accent)]" />
          <div className="flex items-center gap-3">
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-lg transition-colors ${
                  isDark
                    ? "text-white/80 hover:text-[var(--accent)]"
                    : "text-[#1A1A1A] hover:text-[var(--accent)]"
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
                className={`text-lg transition-colors ${
                  isDark
                    ? "text-white/80 hover:text-[var(--accent)]"
                    : "text-[#1A1A1A] hover:text-[var(--accent)]"
                }`}
                aria-label="Live Demo"
              >
                <FiExternalLink />
              </a>
            )}
          </div>
        </div>

        <h4
          className={`font-inter text-lg font-bold mb-2 transition-colors ${
            isDark
              ? "text-white hover:text-[var(--accent)]"
              : "text-[#1A1A1A] hover:text-[var(--accent)]"
          }`}
        >
          {project.title}
        </h4>

        <p
          className={`font-inter text-sm leading-relaxed mb-6 ${
            isDark ? "text-[#9E9EA8]" : "text-[#5C544B]"
          }`}
        >
          {project.desc}
        </p>
      </div>

      <div
        className={`flex flex-wrap gap-x-3 gap-y-1 font-mono-accent text-xs ${
          isDark ? "text-[#8A8A9E]" : "text-[#7A7067]"
        }`}
      >
        {project.tech.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;
