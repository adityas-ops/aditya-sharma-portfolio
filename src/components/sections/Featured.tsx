import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ProjectCard from "../ProjectCard";
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
    tech: ["React-Native", "Firebase", "Redux-Toolkit","zod","ai-sdk/google"],
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


  useGSAP(() => {
    revealProjects.current.forEach((ref, i) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.4 + i * 0.2,
          }
        );
      }
    });
  }, []);

  return (
    <section id="projects" className="min-h-screen w-full pb-20">
      <div className="w-full">       
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
