import { useRef } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Dummy data for featured projects
const featuredProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment processing, inventory management, and admin dashboard. The platform supports multiple payment gateways and includes real-time order tracking.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT"],
    github: "https://github.com/adityas-ops",
    external: "https://example-ecommerce.com",
    cta: "https://example-course.com",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=400&fit=crop&crop=center",
    overline: "Featured Project"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with modern web technologies and includes advanced features like time tracking, file attachments, and project analytics.",
    tech: ["Vue.js", "Socket.io", "PostgreSQL", "Redis", "Docker", "AWS"],
    github: "https://github.com/adityas-ops",
    external: "https://example-taskapp.com",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=700&h=400&fit=crop&crop=center",
    overline: "Featured Project"
  },
  {
    id: 3,
    title: "AI-Powered Analytics Dashboard",
    description: "An intelligent analytics dashboard that provides real-time insights and predictive analytics for business intelligence. Features machine learning models for data analysis, interactive visualizations, and automated reporting capabilities.",
    tech: ["Python", "TensorFlow", "D3.js", "FastAPI", "PostgreSQL", "Docker"],
    github: "https://github.com/adityas-ops",
    external: "https://example-analytics.com",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=400&fit=crop&crop=center",
    overline: "Featured Project"
  }
];

const Featured = () => {
  const revealTitle = useRef<HTMLHeadingElement>(null);
  const revealProjects = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (revealTitle.current) {
      gsap.fromTo(revealTitle.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  useGSAP(() => {
    revealProjects.current.forEach((ref, i) => {
      if (ref) {
        gsap.fromTo(ref,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 + (i * 0.2) }
        );
      }
    });
  }, []);

  return (
    <section id="projects" className="min-h-screen w-full  pb-20">
      <div className="w-full">

        <div className=" w-full">
          {featuredProjects.map((project, i) => (
            <div
              key={project.id}
              ref={el => { revealProjects.current[i] = el; }}
              className={`relative grid grid-cols-12 gap-4 items-center ${
                i % 2 === 0 ? '' : 'sm:grid-flow-col-dense'
              }`}
            >
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;