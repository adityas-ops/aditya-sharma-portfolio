import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../ProjectCard";

gsap.registerPlugin(ScrollTrigger);
// Dummy data for featured projects
const featuredProjects = [
  {
    id: 1,
    title: "Leafy Blend",
    description: "LeafyBlends is a modern e-commerce website built with Next.js for selling premium tea and accessories. It features advanced product filtering, a responsive mobile-first UI with Tailwind CSS, and a cart/checkout system powered by Zustand and Razorpay for secure payments.use IndexedDB for persistent user data.",
    tech: ["Next Js", "Razor Pay", "Nodemailer", "tailwindcss", "react-hot-toast", "zustand"],
    github: "https://github.com/adityas-ops/LeafyBlends",
    external: "https://leafy-blends.vercel.app/",
    image: "/assets/feature/leafy_blend.png",
    overline: "Featured Project"
  },
  {
    id: 2,
    title: "AI-Power Interview App",
    description: "Interview Guru is a React Native app that uses AI to generate personalized interview questions, provide real-time practice, and deliver performance reports with learning suggestions. It supports progress tracking and secure data storage with Firebase and Redux.",
    tech: ["React-Native", "Firebase","ai-sdk/google", "Redux-Toolkit","zod"],
    github: "https://github.com/adityas-ops/interview-guru",
    external: "https://drive.google.com/file/d/1ETQvMuV_1GSi4bcwlpr1rigzE57RTJL9/view",
    image: "/assets/feature/interview_guru.jpeg",
    overline: "Featured Project"
  },
  {
    id: 3,
    title: "Grihub",
    description: "GriHub is a React Native marketplace app that connects buyers with construction material suppliers and service providers. It features GPS-based vendor discovery, quotations, order tracking, and vendor product management, with secure OTP login and persistent state via Redux.",
    tech: ["React-Native", "TypeScript", "Nativewind", "Google Map"],
    github: "https://github.com/adityas-ops",
    external: "https://play.google.com/store/apps/details?id=com.civilguruji.sbui",
    image: "/assets/feature/grihub.jpeg",
    overline: "Featured Project"
  }
];

const Featured = () => {
  const revealProjects = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Animation 1: Title
    if (titleRef.current) {
      gsap.set(titleRef.current, { y: 30, opacity: 0 });
      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // Animation 2: Projects
    revealProjects.current.forEach((ref, i) => {
      if (ref) {
        gsap.set(ref, { y: 30, opacity: 0 });
        gsap.to(ref, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
          delay: 0.2 + i * 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="projects" className="min-h-screen pt-[100px] sm:pt-[70px] w-full pb-20">
      <div className="w-full">
        {/* <div className="flex justify-center items-center mb-16">
          <h2 ref={titleRef} className="text-[1.5rem] sm:text-[2rem] font-Calibre-Semibold text-[#ccd6f6]">
            Featured Projects
          </h2>
        </div>  */}
        <div ref={titleRef} className="flex justify-start mb-16 items-center gap-[20px]">
        <div className="flex items-end">
          <p
            ref={titleRef}
            className="relative before:content-['03.'] before:font-SFMono-Regular before:text-[1.25rem] sm:before:text-[1.5rem] before:text-active-color before:mr-[10px] leading-none text-[1.5rem] sm:text-[2rem] font-Calibre-Semibold text-[#ccd6f6] a font-[600]"
          >
            Some Things I’ve Built
          </p>
        </div>
        <div className="sm:w-[150px] w-[36%] h-[1.5px] bg-[#233554]"></div>
      </div>      
        <div className="sm:space-y-32 space-y-11">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              ref={(el) => {
                revealProjects.current[index] = el;
              }}
              project={project}
              isEven={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;