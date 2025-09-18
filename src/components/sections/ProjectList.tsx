import { CiFolderOn } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  skills?: string[];
  githubLink?: string;
  deployLink?: string;
}

function ProjectList() {
  const revealProjects = useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const ProjectData: ProjectCardData[] = [
    {
      id: "1",
      title: "Civil Guruji App",
      description:
        "Civil Guruji is India leading civil engineering training institute, offering online and offline courses, helping engineers secure jobs in top companies.",
      skills: ["React-Native", "Nativewind"],
      githubLink: "",
      deployLink:
        "https://play.google.com/store/apps/details?id=com.civilguruji.learn&pcampaignid=web_share",
    },
    {
      id: "2",
      title: "Civil Guruji Web",
      description:
        "Civil Guruji is India leading civil engineering training institute, offering online and offline courses, helping engineers secure jobs in top companies.",
      skills: ["Next Js", "Tailwind CSS"],
      githubLink: "",
      deployLink: "https://civilguruji.com/",
    },
    {
      id: "3",
      title: "TeenHive",
      description:
        "A cutting-edge networking platform designed specifically for high school students set to revolutionize the way teenagers connect, collaborate, and grow in the digital age.",
      skills: ["Next Js", "Tailwind Css"],
      githubLink: "https://github.com/adityas-ops/job2",
      deployLink: "https://job2-six.vercel.app/",
    },
    {
      id: "4",
      title: "The Headliner",
      description:
        "The Headliner is basically a platform that provides the latest news with search and filter functionality.",
      skills: ["Next Js", "Chakra UI", "SSR"],
      githubLink: "https://github.com/adityas-ops/the-headliner",
      deployLink: "https://the-headliner-amber.vercel.app/",
    },
    {
      id: "5",
      title: "Portfolio-v3",
      description:
        "Developed a responsive personal portfolio website showcasing my experience, projects, and skills with a clean design, smooth navigation, and optimized performance",
      skills: ["React Js", "Tailwind CSS", "Vite", "GSAP"],
      githubLink: "https://github.com/adityas-ops/aditya-sharma-portfolio",
      deployLink: "https://adityaops.vercel.app/",
    },
    {
      id: "6",
      title: "PosMart",
      description:
        "A user-friendly point-of-sale interface featuring intuitive navigation, clear visuals, transaction management, and responsive design to enhance the sales process and customer experience.",
      skills: ["React Js", "react-router", "jspdf"],
      githubLink: "https://github.com/adityas-ops/posmart",
      deployLink: "https://posmart-sage.vercel.app/",
    },
    {
      id: "7",
      title: "Career",
      description:
        "Built a career website UI clone with job search, company insights Page and smooth navigation",
      skills: ["Next Js", "Tailwind CSS", "@splidejs/react-splide"],
      githubLink: "https://github.com/adityas-ops/career",
      deployLink: "https://career-livid.vercel.app/",
    },
    {
      id: "8",
      title: "Resume Builder",
      description:
        "Interactive resume platform that create professional background, education, skills, and portfolio in a clean, accessible format.",
      skills: ["React", "CSS", "react-to-print"],
      githubLink: "https://github.com/adityas-ops/resumeadi",
      deployLink: "https://resumeadi.vercel.app/",
    },
    {
      id: "9",
      title: "Portfolio-v2",
      description:
        "Designed a personal portfolio inspired by VSCode’s interface, presenting my name, role, and GitHub link in a minimalist, code-like UI with clear visuals and intuitive navigation.",
      skills: ["Next JS", "Chakra", "react-markdown"],
      githubLink: "https://github.com/adityas-ops/nextportfolio",
      deployLink: "https://nextportfolio-sigma.vercel.app/",
    },
    {
      id: "10",
      title: "Cafe Street",
      description:
        "Developed a clean and engaging e-commerce landing page that highlights products, features, and calls-to-action with appealing visuals and responsive layout.",
      skills: ["Next JS", "framer-motion", "Tailwind"],
      githubLink: "https://github.com/adityas-ops/e-commerce-landing",
      deployLink: "https://e-commerce-landing.vercel.app/",
    },
    {
      id: "11",
      title: "Portfolio-v1",
      description:
        "Created my first personal portfolio site to showcase my profile, projects, and skills with a simple design, welcoming layout, and easy navigation.",
      skills: ["React JS", "Material UI", "tsparticles"],
      githubLink: "https://github.com/adityas-ops/portfolio",
      deployLink: "https://portfolio-aditya-ten.vercel.app/",
    },
    {
      id: "12",
      title: "ARC",
      description:"Designed a responsive landing page UI showcasing features of a remote job platform with a clean layout and engaging visuals.",
      skills:["Next JS","animate.css"],
      githubLink: "https://github.com/adityas-ops/arc",
      deployLink: "https://arc-xi.vercel.app/",
    },
  ];

  // Get the projects to display based on showAll state
  const displayedProjects = showAll ? ProjectData : ProjectData.slice(0, 6);

  useGSAP(() => {
    // Filter out null refs and only animate the currently displayed projects
    const validRefs = revealProjects.current.filter(ref => ref !== null);
    
    gsap.set(validRefs, { y: 30, opacity: 0 });

    gsap.to(validRefs, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: containerRef, dependencies: [showAll, displayedProjects.length] });

  return (
    <div ref={containerRef} className=" h-full w-full pt-[40px] sm:pt-[100px]">
      <div className=" flex justify-center items-center">
        <h2 className=" text-[1.5rem] sm:text-[2rem] font-Calibre-Semibold text-[#ccd6f6]">
          Other Noteworthy projects
        </h2>
      </div>
      <div className="pt-[20px] sm:pt-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {displayedProjects.map((item: ProjectCardData, index: number) => {
          return (
            <a
              key={item.id}
              ref={(el) => {
                if (revealProjects.current.length <= index) {
                  revealProjects.current.length = index + 1;
                }
                revealProjects.current[index] = el;
              }}
              target="_black"
              href={item.deployLink}
              className=" relative shadow-2xl py-[25px] px-[25px] hover:cursor-pointer w-full h-[325px] bg-[#112240] brightness-110 rounded-[4px] feature_card_shadow hover:-translate-y-4 duration-75"
            >
              <div className=" mb-[25px] flex flex-row justify-between items-center">
                <CiFolderOn className=" text-active-color text-[40px]" />
                <div className="  flex flex-row items-center gap-[15px]">
                  {item.githubLink && item.githubLink.length > 0 && (
                    <a target="_blank" href={item.githubLink} onClick={(e) => e.stopPropagation()}>
                      <FiGithub className=" text-[#A8B2D2] text-[18px]" />
                    </a>
                  )}

                  <a>
                    <FiExternalLink className=" text-[#A8B2D2] text-[18px]" />
                  </a>
                </div>
              </div>
              <h3 className="mb-[0px] text-[#ccd6f6] text-[22px] font-Calibre-Semibold capitalize">
                {item.title}
              </h3>
              <div className=" text-[#a8b2d1] text-[17px] font-Calibre-Regular text-start">
                {item.description}
              </div>
              <footer className=" text-[12px] flex flex-row items-center justify-start gap-[10px] flex-wrap text-[#8892b0] font-SFMono-Regular absolute bottom-[25px] px-[25px] left-0 right-0">
                {item?.skills?.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </footer>
            </a>
          );
        })}
      </div>
      
      {/* Show More Button */}
      <div className="flex justify-center mt-[50px]">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-8 py-3 border border-[#64ffda] text-[#64ffda] font-SFMono-Regular text-sm hover:bg-[#64ffda] hover:text-[#08192F] hover:bg-opacity-10 transition-all duration-300 rounded-sm"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

export default ProjectList;
