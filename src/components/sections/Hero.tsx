import { useGSAP } from "@gsap/react";
import { useRef, memo, useCallback, lazy, Suspense } from "react";
import gsap from "gsap";

const CatHero = lazy(() => import("../three/CatHero"));

function Hero() {
  const heroElementsRef = useRef<
    (HTMLParagraphElement | HTMLDivElement | HTMLButtonElement | null)[]
  >([]);

  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, sectionId: string): void => {
      e.preventDefault();

      const element: HTMLElement | null = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        window.history.pushState(null, "", `#${sectionId}`);
      }
    },
    [],
  );

  useGSAP(
    () => {
      gsap.set(heroElementsRef.current, { y: 30, opacity: 0 });

      gsap.to(heroElementsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        delay: 1,
      });
    },
    { scope: heroElementsRef },
  );

  return (
    <div className="min-h-screen w-full flex flex-col sm:flex-row items-center justify-center gap-8 relative">
      {/* Text content */}
      <div className="flex-1 flex  flex-col justify-center relative z-10">
        <div>
          <p
            ref={(el) => {
              heroElementsRef.current[0] = el;
            }}
            className="text-[16px] text-active-color font-SFMono-Regular"
          >
            Hi, my name is
          </p>
          <p
            ref={(el) => {
              heroElementsRef.current[1] = el;
            }}
            className="text-[3rem] mt-8 mb-2 sm:text-[5rem] leading-none font-Calibre-Semibold hero-gradient-text"
          >
            Aditya Sharma.
          </p>
          <p
            ref={(el) => {
              heroElementsRef.current[2] = el;
            }}
            className="text-[3rem] leading-[3rem] sm:text-[3.5rem] font-Calibre-Semibold text-[#8892b0]"
          >
            I Build Web & Apps.
          </p>
        </div>
        <div className="sm:w-[90%] w-full mt-[20px]">
          <p
            ref={(el) => {
              heroElementsRef.current[3] = el;
            }}
            className="text-[20px] font-Calibre-Regular leading-[25px] text-[#8892b0]"
          >
            I'm a software engineer specializing in building exceptional digital
            experiences. Currently, I'm focused on building accessible,
            human-centered products at
            <span className="text-active-color"> Civil Guruji</span>.
          </p>
        </div>
        <div className="pt-[50px]">
          <div
            onClick={(e) => handleScroll(e, "contact")}
            className="relative email-link neon-border-btn"
          >
            <p className="text-[16px] font-SFMono-Medium text-active-color">
              Hire Me!
            </p>
          </div>
        </div>
      </div>

      {/* 3D Geometric Model */}
      <div
        ref={(el) => {
          heroElementsRef.current[4] = el;
        }}
        className="flex-1  hidden h-[400px] sm:h-[400px] relative z-10 xl:flex items-center justify-center"
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-active-color border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <CatHero />
        </Suspense>
      </div>
    </div>
  );
}

export default memo(Hero);
