import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FeaturedProject } from '../components/FeaturedProject';
import type { FeaturedProjectData } from '../components/FeaturedProject';
import { ProjectCard } from '../components/ProjectCard';
import type { ProjectCardData } from '../components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const FEATURED_PROJECTS: FeaturedProjectData[] = [
  {
    label: 'Featured Project',
    title: 'Leafy Blend',
    description:
      'A modern e-commerce platform for premium tea and accessories. Features advanced product filtering, mobile-first UI, and a cart/checkout system powered by Zustand and Razorpay integration.',
    tech: ['Next.js', 'Tailwind CSS', 'Zustand', 'Razorpay', 'Nodemailer'],
    github: 'https://github.com/adityas-ops',
    live: 'https://leafyblend.vercel.app',
    color: '#1D9E75',
    image: '/assets/feature/leafy_blend.jpeg',
  },
  {
    label: 'Featured Project',
    title: 'GriHub',
    description:
      'Cross-platform mobile marketplace app connecting buyers and suppliers. Built from scratch with React Native and NativeWind, featuring real-time messaging, product listings, and an internal CRM dashboard.',
    tech: ['React Native', 'NativeWind', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/adityas-ops',
    live: '#',
    color: '#2A7AE4',
    image: '/assets/feature/grihub.jpeg',
  },
  {
    label: 'Featured Project',
    title: 'AI Interview Coach',
    description:
      'React Native mobile app utilizing AI models to generate personalized interview questions, provide real-time audio/text response analysis, and deliver action-oriented performance reports.',
    tech: ['React Native', 'NativeWind', 'AI API', 'Expo'],
    github: 'https://github.com/adityas-ops',
    live: '#',
    color: '#534AB7',
    image: '/assets/feature/interview_guru.jpeg',
  },
];

const OTHER_PROJECTS: ProjectCardData[] = [
  {
    title: 'Civil Guruji App',
    desc: "India's leading civil engineering training platform — online and offline courses for top company placements.",
    tech: ['React Native', 'NativeWind'],
    github: 'https://github.com/adityas-ops',
  },
  {
    title: 'Civil Guruji Web',
    desc: 'Web counterpart of the Civil Guruji platform with full course management, payment portal, and student analytics.',
    tech: ['Next.js', 'Tailwind CSS'],
    github: 'https://github.com/adityas-ops',
    live: 'https://civilguruji.com',
  },
  {
    title: 'TeenHive',
    desc: 'Cutting-edge networking platform designed for high school students — connect, collaborate, and build projects.',
    tech: ['Next.js', 'Tailwind CSS'],
    github: 'https://github.com/adityas-ops',
  },
  {
    title: 'The Headliner',
    desc: 'News platform featuring real-time search, category filtering, and server-side rendered news feed.',
    tech: ['Next.js', 'Chakra UI', 'SSR'],
    github: 'https://github.com/adityas-ops',
  },
  {
    title: 'PosMart',
    desc: 'Point-of-sale interface with intuitive product catalog navigation, cart calculation, and receipt generation.',
    tech: ['React.js', 'react-router'],
    github: 'https://github.com/adityas-ops',
  },
  {
    title: 'Portfolio V3',
    desc: 'Previous iteration of portfolio — high performance, GSAP animated, Vite powered single page layout.',
    tech: ['React', 'Tailwind', 'GSAP'],
    github: 'https://github.com/adityas-ops',
    live: 'https://adityaops.vercel.app',
  },
  {
    title: 'E-Commerce Dashboard',
    desc: 'Admin panel with real-time sales analytics, product inventory management, and order tracking.',
    tech: ['React', 'Chart.js', 'Tailwind'],
    github: 'https://github.com/adityas-ops',
  },
  {
    title: 'Fitness Tracker',
    desc: 'Mobile-first fitness app for workout logging, progress tracking, and daily calorie management.',
    tech: ['React Native', 'Expo', 'AsyncStorage'],
    github: 'https://github.com/adityas-ops',
  },
  {
    title: 'Blog CMS',
    desc: 'Full-featured content management system with rich text editing, SEO tools, and image optimization.',
    tech: ['Next.js', 'MDX', 'Tailwind'],
    github: 'https://github.com/adityas-ops',
  },
  {
    title: 'Weather Now',
    desc: 'Minimalist weather app with geolocation, 5-day forecast, and dynamic background theming.',
    tech: ['React', 'OpenWeather API', 'CSS'],
    github: 'https://github.com/adityas-ops',
  },
  {
    title: 'Task Flow',
    desc: 'Kanban-style project management tool with drag-and-drop boards, labels, and team collaboration.',
    tech: ['React', 'DnD Kit', 'Zustand'],
    github: 'https://github.com/adityas-ops',
  },
  {
    title: 'DevLinks',
    desc: 'Link-in-bio tool for developers with custom themes, analytics dashboard, and social integrations.',
    tech: ['Next.js', 'Prisma', 'Tailwind'],
    github: 'https://github.com/adityas-ops',
  },
];

const INITIAL_SHOW_COUNT = 6;

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? OTHER_PROJECTS : OTHER_PROJECTS.slice(0, INITIAL_SHOW_COUNT);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: '.projects-header', start: 'top 80%' },
      });

      const featuredItems = gsap.utils.toArray<HTMLElement>('.featured-project-item');
      featuredItems.forEach((item) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 75%' },
        });
      });

      gsap.from('.project-grid-card', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.other-projects-grid', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleShowMore = () => {
    setShowAll(true);
    // Animate the newly revealed cards
    requestAnimationFrame(() => {
      const newCards = document.querySelectorAll('.project-grid-card');
      newCards.forEach((card, i) => {
        if (i >= INITIAL_SHOW_COUNT) {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, delay: (i - INITIAL_SHOW_COUNT) * 0.06, ease: 'power2.out' }
          );
        }
      });
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      data-bg="#F0EDE8"
      className="relative w-full bg-[#F0EDE8] py-28 md:py-36 text-[#1A1A1A] overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="projects-header mb-16">
          <span className="font-mono-accent text-xs md:text-sm font-bold text-[var(--accent)] tracking-wider uppercase mb-2 block">
            03. Some Things I've Built
          </span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-[#1A1A1A]">
            Featured Work & Projects.
          </h2>
        </div>

        {/* Featured Projects List */}
        <div className="mb-24">
          {FEATURED_PROJECTS.map((project, idx) => (
            <FeaturedProject key={idx} project={project} index={idx} />
          ))}
        </div>

        {/* Other Projects Section */}
        <div className="text-center mb-12">
          <h3 className="font-syne text-3xl font-bold text-[#1A1A1A] mb-2">Other Noteworthy Projects</h3>
          <p className="font-mono-accent text-xs md:text-sm text-[var(--accent)]">
            view the archive on github
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="other-projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && OTHER_PROJECTS.length > INITIAL_SHOW_COUNT && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleShowMore}
              className="group font-mono-accent text-sm px-8 py-3 border border-[var(--accent)] text-[var(--accent)] rounded hover:bg-[var(--accent)] hover:text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,77,0,0.2)]"
            >
              Show More Projects
              <span className="inline-block ml-2 transition-transform group-hover:translate-y-0.5">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
