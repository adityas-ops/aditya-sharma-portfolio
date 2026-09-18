import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeaturedProject } from "../components/FeaturedProject";
import type { FeaturedProjectData } from "../components/FeaturedProject";
import { ProjectCard } from "../components/ProjectCard";
import type { ProjectCardData } from "../components/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const FEATURED_PROJECTS: FeaturedProjectData[] = [
  {
    label: "Featured Project",
    title: "DevHub",
    description: `DevHub is a mobile application for exploring and managing GitHub workflows on the go. It allows users to authenticate via GitHub
OAuth, explore trending repositories by programming language, manage starred projects, and search across repositories, code, users,
and issues. Key features include an in-app file browser with syntax-highlighted code viewing, native Markdown rendering for repository
READMES, detailed issue and pull request tracking, real-time GitHub notifications, and comprehensive user profile views complete with
contribution heatmaps and repository statistics.`,
    tech: [
      "React Native CLI",
      "Github API",
      "TypeScript",
      "iOS",
      "Android",
      "Automate",
    ],
    github: "https://github.com/adityas-ops",
    live: "https://play.google.com/store/apps/details?id=com.devhub&pcampaignid=web_share",
    color: "#1D9E75",
    image: "/assets/feature/devhub.jpeg",
    field: "mobile",
  },
  {
    label: "Featured Project",
    title: "AI Interview Coach",
    description:
      "Interview Guru is an AI-powered mock interview app that helps professionals practice technical, behavioral, and situational interviews before the real thing. It uses Google's Gemini 2.5 Flash to generate adaptive questions based on your domain, tech stack, and difficulty level, provides instant AI-evaluated scoring with question-by-question feedback, and suggests targeted learning resources to improve weak areas. Built with React Native and deployed on both Play Store and App Store, it demonstrates full-stack mobile development including speech-to-text integration, LLM API implementation, and production-level deployment.",
    tech: [
      "React Native",
      "NativeWind",
      "Gemini 2.5 Flash",
      "Expo",
      "Firebase",
    ],
    github: "https://github.com/adityas-ops/interview-guru",
    live: "https://github.com/adityas-ops/interview-guru/releases/tag/interviewguruv1",
    color: "#2A7AE4",
    image: "/assets/feature/interviewguru.jpeg",
    field: "mobile",
  },
  {
    label: "Featured Project",
    title: "Leafy Blend",
    description:
      "A modern e-commerce platform for premium tea and accessories. Features advanced product filtering, mobile-first UI, and a cart/checkout system powered by Zustand and Razorpay integration.",
    tech: ["Next.js", "Tailwind CSS", "Zustand", "Razorpay", "Nodemailer"],
    github: "https://github.com/adityas-ops/LeafyBlends",
    live: "https://leafy-blends.vercel.app/",
    color: "#1D9E75",
    image: "/assets/feature/leafy_blend.jpeg",
    field: "web",
  },
  {
    label: "Featured Project",
    title: "GriHub",
    description:
      "Cross-platform mobile marketplace app connecting buyers and suppliers. Built from scratch with React Native and NativeWind, featuring real-time messaging, product listings, and an internal CRM dashboard.",
    tech: [
      "React Native",
      "NativeWind",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
    ],
    github: "https://github.com/adityas-ops",
    live: "https://play.google.com/store/apps/details?id=com.civilguruji.sbui&pcampaignid=web_share",
    color: "#2A7AE4",
    image: "/assets/feature/grihub.jpeg",
    field: "mobile",
  },
];

const OTHER_PROJECTS: ProjectCardData[] = [
  {
    title: "Civil Guruji App",
    desc: "India's leading civil engineering training platform — online and offline courses for top company placements.",
    tech: ["React Native", "NativeWind"],
    github: "https://github.com/adityas-ops",
  },
  {
    title: "Civil Guruji Web",
    desc: "Web counterpart of the Civil Guruji platform with full course management, payment portal, and student analytics.",
    tech: ["Next.js", "Tailwind CSS"],
    github: "https://github.com/adityas-ops",
    live: "https://civilguruji.com",
  },
  {
    title: "TeenHive",
    desc: "Cutting-edge networking platform designed for high school students — connect, collaborate, and build projects.",
    tech: ["Next.js", "Tailwind CSS"],
    github: "https://github.com/adityas-ops",
  },
  {
    title: "The Headliner",
    desc: "News platform featuring real-time search, category filtering, and server-side rendered news feed.",
    tech: ["Next.js", "Chakra UI", "SSR"],
    github: "https://github.com/adityas-ops",
  },
  {
    title: "PosMart",
    desc: "Point-of-sale interface with intuitive product catalog navigation, cart calculation, and receipt generation.",
    tech: ["React.js", "react-router"],
    github: "https://github.com/adityas-ops",
  },
  {
    title: "Portfolio V3",
    desc: "Previous iteration of portfolio — high performance, GSAP animated, Vite powered single page layout.",
    tech: ["React", "Tailwind", "GSAP"],
    github: "https://github.com/adityas-ops",
    live: "https://adityaops.vercel.app",
  },
  {
    title: "E-Commerce Dashboard",
    desc: "Admin panel with real-time sales analytics, product inventory management, and order tracking.",
    tech: ["React", "Chart.js", "Tailwind"],
    github: "https://github.com/adityas-ops",
  },
  {
    title: "Fitness Tracker",
    desc: "Mobile-first fitness app for workout logging, progress tracking, and daily calorie management.",
    tech: ["React Native", "Expo", "AsyncStorage"],
    github: "https://github.com/adityas-ops",
  },
  {
    title: "Blog CMS",
    desc: "Full-featured content management system with rich text editing, SEO tools, and image optimization.",
    tech: ["Next.js", "MDX", "Tailwind"],
    github: "https://github.com/adityas-ops",
  },
  {
    title: "Weather Now",
    desc: "Minimalist weather app with geolocation, 5-day forecast, and dynamic background theming.",
    tech: ["React", "OpenWeather API", "CSS"],
    github: "https://github.com/adityas-ops",
  },
  {
    title: "Task Flow",
    desc: "Kanban-style project management tool with drag-and-drop boards, labels, and team collaboration.",
    tech: ["React", "DnD Kit", "Zustand"],
    github: "https://github.com/adityas-ops",
  },
  {
    title: "DevLinks",
    desc: "Link-in-bio tool for developers with custom themes, analytics dashboard, and social integrations.",
    tech: ["Next.js", "Prisma", "Tailwind"],
    github: "https://github.com/adityas-ops",
  },
];

const INITIAL_SHOW_COUNT = 6;

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll
    ? OTHER_PROJECTS
    : OTHER_PROJECTS.slice(0, INITIAL_SHOW_COUNT);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-header", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 85%",
          once: true,
        },
      });

      const featuredItems = gsap.utils.toArray<HTMLElement>(
        ".featured-project-item",
      );
      featuredItems.forEach((item) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });

      gsap.fromTo(
        ".project-grid-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".other-projects-grid",
            start: "top 92%",
            once: true,
          },
        },
      );
    }, sectionRef);

    // Refresh ScrollTrigger after initial render and image loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
      ctx.revert();
    };
  }, []);

  const handleShowMore = () => {
    setShowAll(true);
    // Animate the newly revealed cards
    requestAnimationFrame(() => {
      const newCards = document.querySelectorAll(".project-grid-card");
      newCards.forEach((card, i) => {
        if (i >= INITIAL_SHOW_COUNT) {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              delay: (i - INITIAL_SHOW_COUNT) * 0.06,
              ease: "power2.out",
            },
          );
        }
      });
    });
  };

  return (
    <section id="projects" ref={sectionRef} className="relative w-full">
      {/* Featured Projects with alternating backgrounds */}
      {FEATURED_PROJECTS.map((project, idx) => {
        const isDark = idx % 2 === 1;
        const bgHex = isDark ? "#111118" : "#F5F0E8";

        return (
          <div
            key={idx}
            data-bg={bgHex}
            className={`w-full py-20 md:py-28 transition-colors duration-500 ${
              isDark
                ? "bg-[#111118] text-[#E8E8E8] border-y border-white/5"
                : "bg-[#F5F0E8] text-[#1A1A1A]"
            }`}
          >
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              {/* Header only rendered above the first featured project */}
              {idx === 0 && (
                <div className="projects-header mb-16">
                  <span className="font-mono-accent text-xs md:text-sm font-bold text-[var(--accent)] tracking-wider uppercase mb-2 block">
                    03. Some Things I've Built
                  </span>
                  <h2 className="font-syne text-4xl md:text-5xl font-bold text-[#1A1A1A]">
                    Featured Work & Projects.
                  </h2>
                </div>
              )}

              <FeaturedProject
                project={project}
                index={idx}
                theme={isDark ? "dark" : "light"}
              />
            </div>
          </div>
        );
      })}

      {/* Other Projects Section (Light / White) */}
      <div
        data-bg="#F5F0E8"
        className="w-full bg-[#F5F0E8] py-24 md:py-32 text-[#1A1A1A] transition-colors duration-500 border-t border-black/5"
      >
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h3 className="font-syne text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
              Other Noteworthy Projects
            </h3>
            <p className="font-mono-accent text-xs md:text-sm text-[var(--accent)]">
              view the archive on github
            </p>
          </div>

          {/* 3-Column Grid */}
          <div className="other-projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} theme="light" />
            ))}
          </div>

          {/* Show More Button */}
          {!showAll && OTHER_PROJECTS.length > INITIAL_SHOW_COUNT && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleShowMore}
                className="group font-mono-accent text-sm px-8 py-3 border border-[var(--accent)] text-[var(--accent)] rounded hover:bg-[var(--accent)] hover:text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,77,0,0.2)] cursor-pointer"
              >
                Show More Projects
                <span className="inline-block ml-2 transition-transform group-hover:translate-y-0.5">
                  ↓
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
