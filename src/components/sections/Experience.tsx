import { useEffect, useState, useRef } from "react";
import { BiRightArrow } from "react-icons/bi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom hook for reduced motion preference
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

type descriptionType = {
  id: number;
  designation: string;
  company: string;
  from: string;
  to: string;
  points: string[];
};

function Experience() {
  const revealContainer = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const tabs = [
    {
      id: 1,
      tabName: "Civil Guruji.",
    },
    {
      id: 2,
      tabName: "Grihub.",
    },
  ];
  const jobDescription = [
    {
      id: 1,
      designation: "Frontend Engineer & App Developer",
      company: "Civil Guruji.",
      from: "08 Sep,2023",
      to: "Present",
      points: [
        "Created 3+ Websites with responsive and User friendly UI and mobile Application for students suitable.",
        "Collaborate with designers, project manager, and other engineers to transform creative concepts into production realities for Customers",
        "Provide leadership within engineering department through close collaboration, knowledge shares, and mentorship",
        "Tech Used: React Js, Next Js, React-Native, Tailwind CSS, Nativewind"
      ],
    },
    {
      id: 2,
      designation: "App Developer",
      company: "GriHub",
      from: "01 Aug,2024",
      to: "Present",
      points: [
        "Developed Grihub's mobile application from scratch using React Native with NativeWind for styling, creating a seamless cross-platform experience for both buyers and suppliers.",
        "Built the company's Customer Relationship Management (CRM) system using Next.js with Tailwind CSS, enabling efficient management of buyer-supplier interactions and transactions.",
        "Designed and implemented core marketplace functionality where buyers can purchase construction materials (cement, paints, etc.) and suppliers can list their shops/products with dynamic pricing.",
        "Took the application from initial concept to production deployment, handling all aspects including UI/UX, state management, API integrations, and performance optimization."
      ],
    },
  ];
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [selectedDescription, setDescription] =
    useState<descriptionType | null>(null);
  useEffect(() => {
    const data = jobDescription.find((item) => item.id === selectedTab);
    setDescription(data ?? null);
  }, [selectedTab]);

  // GSAP Animation - Only 3 specific sections
  useGSAP(() => {
    if (prefersReducedMotion || !revealContainer.current) {
      return;
    }

    // Animation 1: About me section (headline)
    if (headlineRef.current) {
      gsap.set(headlineRef.current, { y: 30, opacity: 0 });
      gsap.to(headlineRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: revealContainer.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // Animation 2: Text section (tabs and content)
    if (contentRef.current) {
      gsap.set(contentRef.current, { y: 30, opacity: 0 });
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        delay: 0.3, // Slight delay after headline
        scrollTrigger: {
          trigger: revealContainer.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === revealContainer.current) {
          trigger.kill();
        }
      });
    };
  }, { scope: revealContainer, dependencies: [prefersReducedMotion] });

  return (
    <div ref={revealContainer} className="min-h-screen pt-[100px] sm:pt-[70px] max-w-full sm:max-w-[75%] mx-auto">
      {/* section headline */}
      <div ref={headlineRef} className="flex justify-start items-center gap-[20px]">
        <div className="flex items-end">
          <p className="relative before:content-['02.'] before:font-SFMono-Regular before:text-[1.25rem] sm:before:text-[1.5rem] before:text-active-color before:mr-[10px] leading-none text-[1.75rem] sm:text-[2rem] font-Calibre-Semibold text-[#ccd6f6] a font-[600]">
            Where I've Worked
          </p>
        </div>
        <div className="sm:w-[150px] w-[16%] h-[1.5px] bg-[#233554]"></div>
      </div>
      {/* main content */}
      <div ref={contentRef} className="w-full flex flex-col gap-[30px] sm:flex-row mt-[50px]">
        <div className="sm:w-[20%] w-full flex flex-row sm:flex-col border-b-[3px] sm:border-b-0  border-[#233654] relative">
          {/* Desktop active indicator (vertical) */}
          <div
            className="absolute sm:block hidden left-[-0.5px] z-30 w-[3px] bg-active-color transition-all duration-500 ease-in-out"
            style={{
              height: "40px",
              top: `${(selectedTab - 1) * 40}px`,
            }}
          />

          {/* Mobile active indicator (horizontal) */}
          <div
            className="absolute block sm:hidden bottom-[-3px] h-[3px] bg-active-color transition-all duration-500 ease-in-out"
            style={{
              width: `${100 / tabs.length}%`,
              left: `${(selectedTab - 1) * (100 / tabs.length)}%`,
            }}
          />

          {tabs.map((item, index) => {
            return (
              <button
                onClick={() => setSelectedTab(item.id)}
                className={`relative sm:border-l-[3px] border-[#233654] h-[40px] hover:text-active-color hover:bg-[#112240] w-full sm:w-full flex justify-center sm:justify-start items-center cursor-pointer ${
                  selectedTab === item.id
                    ? "text-active-color bg-[#112240] rounded-r-sm"
                    : "text-[#8892b0]"
                }`}
                key={index}
              >
                <p className="sm:pl-[15px] font-SFMono-Medium text-[14px]">
                  {item.tabName.slice(0, 15)}
                </p>
              </button>
            );
          })}
        </div>
        {/* bullets */}
        <div className="sm:w-[80%] w-full ">
          <p className=" text-[1.375rem] font-Calibre-Medium text-[#ccd6f6]">
            {selectedDescription?.designation}
            <span className=" text-active-color">
              {" "}
              @ {selectedDescription?.company}
            </span>
          </p>
          <p className="mb-[25px] text-[#a8b2d1] text-[0.8125rem] font-SFMono-Medium">
            {selectedDescription?.from} - {selectedDescription?.to}
          </p>
          <div className=" flex flex-col justify-start gap-[20px]">
            {selectedDescription?.points.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" flex flex-row items-start gap-[15px]"
                >
                 <div>
                   <BiRightArrow className=" text-[14px] mt-1 text-active-color" />
                 </div>
                  <p className="text-[#8892b0] text-[18px] font-Calibre-Regular">
                    {" "}
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
