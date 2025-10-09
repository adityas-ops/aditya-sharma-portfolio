import { useGSAP } from "@gsap/react";
import { useRef, memo } from "react";
import { BiRightArrow } from "react-icons/bi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OptimizedImage from "../OptimizedImage";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const skillPartOne = [
    "JavaScript (ES6+)",
    "React JS",
    "Next JS",
    "React Native",
  ];
  const skillPartTwo = [
    "TypeScript",
    "Tailwind CSS",
    "Redux",
    "GSAP(animation)",
  ];
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
          trigger: aboutSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // Animation 2: Image
    if (imageRef.current) {
      gsap.set(imageRef.current, { y: 30, opacity: 0 });
      gsap.to(imageRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // Animation 3: Content
    if (contentRef.current) {
      gsap.set(contentRef.current, { y: 30, opacity: 0 });
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === aboutSectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, { scope: aboutSectionRef });
  return (
    <div
      ref={aboutSectionRef}
      className="min-h-screen pt-[120px] max-w-full sm:max-w-[95%] mx-auto"
    >
      {/* section headline */}
      <div className="flex justify-start items-center gap-[20px]">
        <div className="flex items-end">
          <p
            ref={titleRef}
            className="relative before:content-['01.'] before:font-SFMono-Regular before:text-[1.25rem] sm:before:text-[1.5rem] before:text-active-color before:mr-[10px] leading-none text-[1.5rem] sm:text-[2rem] font-Calibre-Semibold text-[#ccd6f6] a font-[600]"
          >
            About Me
          </p>
        </div>
        <div className="sm:w-[150px] w-[36%] h-[1.5px] bg-[#233554]"></div>
      </div>

      {/* main content */}
      <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-start gap-[50px] items-center mt-[50px]">
        <div ref={contentRef} className=" w-full sm:w-[65%]">
          <p className=" font-Calibre-Medium font-[500] text-justify sm:text-start text-[20px] text-[#8892b0]">
            Hello! I'm Aditya, a{" "}
            <strong className=" text-active-color">
              frontend and mobile app developer
            </strong>{" "}
            passionate about crafting beautiful, responsive, and user-friendly
            interfaces. My coding journey began with a curiosity for how apps &
            web work, and now I love turning ideas into reality using React,
            React Native, and modern web technologies.
          </p>
          <p className=" font-Calibre-Medium text-[20px] text-justify sm:text-start text-[#8892b0] mt-4">
            I focus on building performant cross-platform apps & websites while
            contributing to Projects. My expertise includes{" "}
            <strong className=" text-active-color">UI/UX optimization</strong>,{" "}
            <strong className=" text-active-color">animations</strong>, and{" "}
            <strong className=" text-active-color">
              frontend architecture
            </strong>
            . When not coding, I explore design systems and document my
            learnings.
          </p>
          <p className="font-Calibre-Medium text-[20px] text-justify sm:text-start text-[#8892b0] mt-2">
            Here are technologies I frequently work with:
          </p>
          <div className=" grid grid-cols-2 mt-2   w-full  ">
            <div className=" grid-cols-1 flex flex-col items-start">
              {/* skill */}
              {skillPartOne.map((item, key) => (
                <div
                  key={key}
                  className="flex mb-2 flex-row items-center gap-[5px]"
                >
                  <BiRightArrow className=" text-[10px] text-active-color" />
                  <p className="text-[#8892b0] text-[14px] font-SFMono-Regular">
                    {" "}
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className=" grid-cols-1 flex flex-col items-start">
              {skillPartTwo.map((item, index) => (
                <div
                  key={index}
                  className="flex mb-2 flex-row items-center gap-[5px]"
                >
                  <BiRightArrow className=" text-[10px] text-active-color" />
                  <p className="text-[#8892b0] text-[14px] font-SFMono-Regular">
                    {" "}
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className=" w-full sm:w-fit flex justify-center sm:max-w-[50%] group">
          <div
            ref={imageRef}
            className="w-[300px] relative h-[300px] border-[2px] duration-300 rounded-md border-active-color"
          >
            <OptimizedImage
              src="/assets/adity.png"
              alt="Aditya Sharma - Software Engineer"
              className="w-[300px] -translate-x-4 z-10 -translate-y-4 group-hover:-translate-y-5 group-hover:-translate-x-5 duration-300 rounded-md h-[295px] object-cover"
              width={300}
              height={295}
              priority={true}
            />
            {/* Overlay with smooth opacity transition */}
            <div className="absolute inset-0 picture-overlay bg-teal-400 bg-opacity-80 contrast-100   mix-blend-multiply -translate-y-4 -translate-x-4 rounded-md transition-opacity duration-300 group-hover:opacity-0 hover:opacity-0 opacity-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(About);
