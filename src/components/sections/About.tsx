import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { BiRightArrow } from "react-icons/bi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const aboutElementsRef = useRef<
    (HTMLParagraphElement | HTMLDivElement | null)[]
  >([]);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Only run this if we have elements to animate
      if (aboutElementsRef.current.length > 0) {
        aboutElementsRef.current.forEach((el, index) => {
          if (el) {
            gsap.from(el, {
              y: 30,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              delay: index * 0.4,
              scrollTrigger: {
                trigger: aboutSectionRef.current,
                start: "top 30%", 
                toggleActions: "play none none none",
                // markers: true // Uncomment for debugging scroll positions
              },
            });
          }
        });
      }
    },
    { scope: aboutSectionRef }
  );
  return (
    <div
      ref={aboutSectionRef}
      className="min-h-screen pt-[120px] max-w-full sm:max-w-[95%] mx-auto"
    >
      {/* section headline */}
      <div className="flex justify-start items-center gap-[20px]">
        <div className="flex items-end">
          <p
            ref={(el) => {
              aboutElementsRef.current[0] = el;
            }}
            className="relative before:content-['01.'] before:font-SFMono-Regular before:text-[1.25rem] sm:before:text-[1.5rem] before:text-active-color before:mr-[10px] leading-none text-[1.5rem] sm:text-[2rem] font-Calibre-Semibold text-[#ccd6f6] a font-[600]"
          >
            About Me
          </p>
        </div>
        <div className="sm:w-[150px] w-[36%] h-[1.5px] bg-[#233554]"></div>
      </div>

      {/* main content */}
      <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-start gap-[50px] items-center mt-[50px]">
        <div className=" w-full sm:w-[65%]">
          <p
            ref={(el) => {
              aboutElementsRef.current[2] = el;
            }}
            className=" font-Calibre-Medium font-[500] text-justify sm:text-start text-[20px] text-[#8892b0]"
          >
            Hello! I'm Aditya, a{" "}
            <strong className=" text-active-color">
              frontend and mobile app developer
            </strong>{" "}
            passionate about crafting beautiful, responsive, and user-friendly
            interfaces. My coding journey began with a curiosity for how apps &
            web work, and now I love turning ideas into reality using React,
            React Native, and modern web technologies.
          </p>
          <p
            ref={(el) => {
              aboutElementsRef.current[2] = el;
            }}
            className=" font-Calibre-Medium text-[20px] text-justify sm:text-start text-[#8892b0] mt-4"
          >
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
          <p
            ref={(el) => {
              aboutElementsRef.current[3] = el;
            }}
            className="font-Calibre-Medium text-[20px] text-justify sm:text-start text-[#8892b0] mt-2"
          >
            Here are technologies I frequently work with:
          </p>
          <div
            ref={(el) => {
              aboutElementsRef.current[4] = el;
            }}
            className=" grid grid-cols-2 mt-2   w-full  "
          >
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
            ref={(el) => {
              aboutElementsRef.current[1] = el;
            }}
            className="w-[300px] relative h-[300px] border-[2px] duration-300 rounded-md border-active-color"
          >
            <img
              src="/assets/adity.png"
              className="w-[300px] -translate-x-4 z-10 -translate-y-4 group-hover:-translate-y-5 group-hover:-translate-x-5 duration-300 rounded-md h-[295px] object-cover"
            />
            {/* Overlay with smooth opacity transition */}
            <div className="absolute inset-0 picture-overlay bg-[#64ffda]/80 contrast-100   mix-blend-multiply -translate-y-4 -translate-x-4 rounded-md transition-opacity duration-300 group-hover:opacity-0 hover:opacity-0 opacity-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
