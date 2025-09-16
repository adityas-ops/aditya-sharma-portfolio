import { forwardRef } from "react";
import { FiGithub } from "react-icons/fi";
import { GoLinkExternal } from "react-icons/go";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  external: string;
  cta?: string;
  image: string;
  overline: string;
}

interface ProjectCardProps {
  project: Project;
  isEven?: boolean;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, isEven = false }, ref) => {
    return (
      <div ref={ref} className={`w-full relative flex items-center ${isEven? " justify-end":" justify-start"}`}>
        {/* Image */}
        <div className={`sm:h-[360px] h-[420px]  w-full sm:w-[60%] relative border-[1px] `}>
          <img
            src={project.image}
            className="w-full h-full object-cover rounded-lg"
            alt={project.title}
          />
          <div className="absolute top-0 rounded-lg left-0 right-0 bottom-0 inset-0 picture-overlay bg-[#000000]/90 sm:bg-[#64ffda]/90 contrast-100 duration-300 group-hover:opacity-0 mix-blend-multiply sm:hover:opacity-0 opacity-100"></div>
        </div>

        {/* Feature content */}
        <div className={`sm:w-[50%] z-30 w-full px-[20px] py-[20px] absolute ${isEven ? " left-0":"right-0"} `}>
          <p className={`text-[13px] font-SFMono-Regular text-active-color text-start ${isEven ? " sm:text-start":"sm:text-end"}  `}>
            {project.overline}
          </p>
          <a href={project.external} target="_blank" rel="noopener noreferrer">
            <p className={`text-[28px] font-Calibre-Semibold mt-2 sm:mt-0 text-[#ccd6f6] text-start ${isEven ? " sm:text-start":"sm:text-end"} hover:text-active-color transition-colors duration-300`}>
              {project.title}
            </p>
          </a>
          <div className={`sm:p-[25px] w-full sm:bg-[#112240] sm:feature_card_shadow mt-[10px] rounded-sm text-start ${isEven ? " sm:text-start":"sm:text-end"} text-[18px] font-Calibre-Regular text-[#a8b2d1]`}>
            {project.description}
          </div>
          <div className={`w-full flex mt-3 flex-row gap-[8px] sm:gap-[15px] items-center justify-start ${isEven ? "sm:justify-start":" sm:justify-end"}   flex-wrap`}>
            {project.tech.map((tech, index) => (
              <p key={index} className="text-[13px] text-[#a8b2d1] font-SFMono-Medium">
                {tech}
              </p>
            ))}
          </div>
          <div className={`w-full flex mt-3 flex-row gap-[15px] items-center justify-start ${isEven ? " sm:justify-start":"sm:justify-end"} `}>
            <a
              className="hover:text-active-color hover:scale-105 duration-300 text-white text-xl cursor-pointer"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub />
            </a>
            <a
              className="hover:text-active-color hover:scale-105 duration-300 text-white text-xl cursor-pointer"
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GoLinkExternal />
            </a>
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
