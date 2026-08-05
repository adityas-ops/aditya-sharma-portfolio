import { useRef } from 'react';
import { gsap } from 'gsap';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export interface FeaturedProjectData {
  label: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  color: string;
  image?: string;
}

interface FeaturedProjectProps {
  project: FeaturedProjectData;
  index: number;
}

export function FeaturedProject({ project, index }: FeaturedProjectProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const handleMouseEnter = () => {
    if (frameRef.current) {
      gsap.to(frameRef.current, { y: -8, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (frameRef.current) {
      gsap.to(frameRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
    }
  };

  return (
    <div className="featured-project-item flex flex-col lg:flex-row items-center gap-8 lg:gap-12 my-16 lg:my-24">
      <div
        className={`w-full lg:w-7/12 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={frameRef}
          className="bg-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl border border-black/10 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
        >
          <div className="px-4 py-3 bg-[#242424] flex items-center gap-2 border-b border-white/5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="ml-2 font-mono-accent text-xs text-white/40 truncate">
              {project.title.toLowerCase().replace(/\s+/g, '')}.app
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
                style={{ backgroundColor: project.color + '22' }}
              >
                {project.title}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`w-full lg:w-5/12 flex flex-col ${
          isEven ? 'lg:order-2 lg:items-end lg:text-right' : 'lg:order-1 lg:items-start lg:text-left'
        }`}
      >
        <span className="font-mono-accent text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
          {project.label}
        </span>
        <h3 className="font-syne text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4">{project.title}</h3>

        <div className="bg-[#F0EDE8]/95 p-6 rounded-xl border border-black/5 shadow-md mb-6 z-10">
          <p className="font-inter text-base text-[#7A7067] leading-relaxed">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono-accent text-xs text-[#7A7067] mb-6">
          {project.tech.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1A] text-xl hover:text-[var(--accent)] transition-all transform hover:scale-110"
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
              className="text-[#1A1A1A] text-xl hover:text-[var(--accent)] transition-all transform hover:scale-110"
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
