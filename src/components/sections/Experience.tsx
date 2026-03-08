import { useEffect, useState, useRef, memo } from "react";
import { BiRightArrow } from "react-icons/bi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const jobDescription = [
    {
      id: 1,
      designation: "Frontend Engineer & App Developer",
      company: "Civil Guruji.",
      from: "08 Sep, 2023",
      to: "Present",
      points: [
        "Created 3+ Websites with responsive and User friendly UI and mobile Application for students suitable.",
        "Collaborate with designers, project manager, and other engineers to transform creative concepts into production realities for Customers",
        "Provide leadership within engineering department through close collaboration, knowledge shares, and mentorship",
        "Tech Used: React Js, Next Js, React-Native, Tailwind CSS, Nativewind",
      ],
    },
    {
      id: 2,
      designation: "App Developer",
      company: "GriHub",
      from: "01 Aug, 2024",
      to: "Present",
      points: [
        "Developed Grihub's mobile application from scratch using React Native with NativeWind for styling, creating a seamless cross-platform experience for both buyers and suppliers.",
        "Built the company's Customer Relationship Management (CRM) system using Next.js with Tailwind CSS, enabling efficient management of buyer-supplier interactions and transactions.",
        "Designed and implemented core marketplace functionality where buyers can purchase construction materials (cement, paints, etc.) and suppliers can list their shops/products with dynamic pricing.",
        "Took the application from initial concept to production deployment, handling all aspects including UI/UX, state management, API integrations, and performance optimization.",
      ],
    },
  ];

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      if (headlineRef.current) {
        gsap.set(headlineRef.current, { y: 30, opacity: 0 });
        gsap.to(headlineRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.set(card, { y: 50, opacity: 0 });
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (
            trigger.trigger === containerRef.current ||
            cardsRef.current.includes(trigger.trigger as HTMLDivElement)
          ) {
            trigger.kill();
          }
        });
      };
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-[150px] sm:pt-[100px] max-w-full sm:max-w-[80%] mx-auto pb-20"
    >
      {/* section headline */}
      <div
        ref={headlineRef}
        className="flex justify-start items-center gap-[20px] mb-[60px]"
      >
        <div className="flex items-end">
          <p className="relative before:content-['02.'] before:font-SFMono-Regular before:text-[1.25rem] sm:before:text-[1.5rem] before:text-active-color before:mr-[10px] leading-none text-[1.5rem] sm:text-[2.2rem] font-Calibre-Semibold text-[#ccd6f6] font-[600]">
            Where I've Worked
          </p>
        </div>
        <div className="sm:w-[300px] w-[20%] h-[1px] bg-[#233554]/60 ml-4"></div>
      </div>

      {/* cards container */}
      <div className="w-full flex flex-col gap-[40px]">
        {jobDescription.map((job, index) => (
          <div
            key={job.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="group relative w-full rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-transparent overflow-hidden"
          >
            {/* Hover subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-active-color/0 via-active-color/5 to-active-color/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative h-full w-full bg-[#112240]/40 backdrop-blur-md rounded-2xl p-8 sm:p-10 z-10 transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#020c1b]/50 border border-white/5 overflow-hidden">
              {/* Moving Background Gradient */}
              <div className="absolute inset-0 moving-card-bg pointer-events-none z-0 mix-blend-screen" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-6 border-b border-[#233554]/50">
                <div>
                  <h3 className="text-[1.5rem] sm:text-[1.75rem] font-Calibre-Semibold text-[#ccd6f6] flex flex-wrap items-center gap-2 transition-colors duration-300">
                    {job.designation}
                    <span className="text-active-color neon-text whitespace-nowrap">
                      @ {job.company}
                    </span>
                  </h3>
                </div>
                <div className="mt-2 sm:mt-0 px-4 py-2 rounded-full bg-active-color/10 border border-active-color/20 self-start sm:self-auto backdrop-blur-sm">
                  <p className="text-active-color text-[0.875rem] font-SFMono-Medium tracking-wide">
                    {job.from} - {job.to}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-[16px]">
                {job.points.map((point, pIndex) => (
                  <div
                    key={pIndex}
                    className="flex flex-row items-start gap-[16px] group/point"
                  >
                    <div className="mt-[6px]">
                      <BiRightArrow className="text-[14px] text-active-color opacity-70 group-hover/point:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-[#8892b0] text-[1.05rem] sm:text-[1.1rem] leading-relaxed font-Calibre-Regular transition-colors duration-300 group-hover/point:text-[#ccd6f6]">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Experience);
