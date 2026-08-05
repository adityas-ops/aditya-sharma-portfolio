import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { FiFolder, FiGithub, FiExternalLink } from 'react-icons/fi';

export interface ProjectCardData {
  title: string;
  desc: string;
  tech: string[];
  github?: string;
  live?: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotateY: x * 12,
      rotateX: -y * 12,
      transformPerspective: 800,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-grid-card bg-white border border-black/10 rounded-xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow duration-300"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <FiFolder className="text-3xl text-[var(--accent)]" />
          <div className="flex items-center gap-3">
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A1A1A] hover:text-[var(--accent)] text-lg transition-colors"
                aria-label="GitHub Repository"
              >
                <FiGithub />
              </a>
            )}
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A1A1A] hover:text-[var(--accent)] text-lg transition-colors"
                aria-label="Live Demo"
              >
                <FiExternalLink />
              </a>
            )}
          </div>
        </div>

        <h4 className="font-inter text-lg font-semibold text-[#1A1A1A] mb-2 hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h4>

        <p className="font-inter text-sm text-[#7A7067] leading-relaxed mb-6">
          {project.desc}
        </p>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono-accent text-xs text-[#7A7067]">
        {project.tech.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;
