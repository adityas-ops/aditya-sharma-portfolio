import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

function Hero() {
  const heroElementsRef = useRef<(HTMLParagraphElement | HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.set(heroElementsRef.current, { y: 30, opacity: 0 });

    gsap.to(heroElementsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      delay: 1,
    });
  }, { scope: heroElementsRef });

  return (
    <div className="min-h-screen w-full flex flex-col justify-center">
      <div>
        <p 
          ref={el => { heroElementsRef.current[0] = el; }} 
          className="text-[16px] text-active-color font-SFMono-Regular"
        >
          Hi, my name is
        </p>
        <p 
          ref={el => { heroElementsRef.current[1] = el; }}
          className="text-[3rem] mt-3 sm:text-[5rem] font-Calibre-Semibold text-[#ccd6f6]"
        >
          Aditya Sharma.
        </p>
        <p 
          ref={el => { heroElementsRef.current[2] = el; }}
          className="text-[3rem] leading-[3rem] sm:text-[4.5rem] font-Calibre-Semibold text-[#8892b0]"
        >
          I Build for Web & Apps.
        </p>
      </div>
      <div className="sm:w-[60%] w-full mt-[20px]">
        <p 
          ref={el => { heroElementsRef.current[3] = el; }}
          className="text-[20px] font-Calibre-Regular leading-[25px] text-[#8892b0]"
        >
          I'm a software engineer specializing in building (and occasionally
          designing) exceptional digital experiences. Currently, I'm focused on
          building accessible, human-centered products at
          <span className="text-active-color"> Civil Guruji</span>.
        </p>
      </div>
      <div className="pt-[50px]">
        <div 
          ref={el => { heroElementsRef.current[4] = el; }}
          className="relative"
        >
          {/* Background div - lower z-index */}
          <div className="z-10 h-[50px] w-[150px] rounded-[4px] border-[1px] border-active-color bg-active-color absolute top-0 left-0 right-0 bottom-0"></div>
          {/* Button - higher z-index */}
          <button className="h-[50px] cursor-pointer w-[150px] rounded-[4px] duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] z-20 relative border-[1px] border-active-color bg-[#091930]">
            <p className="text-[16px] font-SFMono-Medium text-active-color">
              Hire Me!
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;