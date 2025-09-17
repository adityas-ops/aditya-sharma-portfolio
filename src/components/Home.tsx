import React, { useEffect, useRef, useState } from "react";
import { SlSocialLinkedin } from "react-icons/sl";
import { LuInstagram } from "react-icons/lu";
import { FiGithub } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Project from "./sections/Project";

function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isShowShadow, setIsshowShadow] = useState<boolean>(false);
  const [showSidebar, setShowsidebar] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLLIElement| HTMLAnchorElement | HTMLDivElement |HTMLButtonElement | null)[]>([]);

  useGSAP(
    () => {
      // Initial state - hidden above the viewport
      gsap.set(navItemsRef.current, { y: -30, opacity: 0 });

      // Animate in one by one with a stagger
      gsap.to(navItemsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.15, // delay between each animation
        delay: 0.5,
      });
    },
    { scope: navItemsRef }
  );

  useGSAP(
    () => {
      if (showSidebar) {
        // Enter animation sequence
        gsap
          .timeline()
          .to(backdropRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          })
          .to(
            sidebarRef.current,
            {
              x: 0,
              duration: 0.4,
              ease: "power3.out",
            },
            "<0.1"
          );
      } else {
        gsap
          .timeline()
          .to(sidebarRef.current, {
            x: "100%",
            duration: 0.3,
            ease: "power2.in",
          })
          .to(
            backdropRef.current,
            {
              opacity: 0,
              duration: 0.2,
              ease: "linear",
            },
            "<0.1"
          );
      }
    },
    { dependencies: [showSidebar], scope: sidebarRef }
  );

  const handleScroll = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    sectionId: string
  ): void => {
    e.preventDefault();

    if (sectionId === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      window.history.pushState(null, "", "/");
      // setActiveSection("about"); // or your default section
      return;
    }

    const element: HTMLElement | null = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.pushState(null, "", `#${sectionId}`);
      setActiveSection(sectionId);
    }
  };

  // Handle scroll events for header visibility and active section
  useEffect(() => {
    const handleScrollEvent = () => {
      // Get current scroll position
      const currentScrollPos = window.pageYOffset;

      // Show/hide header logic
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);

      // Active section detection
      const sections = ["about", "experience", "work", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            // setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [prevScrollPos]);

  useEffect(() => {
    const currentScrollPos = window.pageYOffset;
    console.log("currentSCrooo", currentScrollPos);
    if (currentScrollPos > 20) {
      setIsshowShadow(true);
    } else {
      setIsshowShadow(false);
    }
  }, [prevScrollPos]);

  // Check URL hash on initial render
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && ["about", "experience", "work", "contact"].includes(hash)) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          setActiveSection(hash);
        }, 100);
      }
    }
  }, []);

  console.log("active sction", activeSection);

  // Helper function to determine active link style
  const getLinkClass = (sectionId: string) => {
    return `hover:text-[#64ffda]  text-[13px] font-SFMono-Regular transition-colors ${
      activeSection === sectionId ? "text-[#64ffda] " : "text-white"
    }`;
  };

  const getLinkClassMobile = (sectionId: string) => {
    return `hover:text-[#64ffda] text-center text-[18px] font-SFMono-Regular transition-colors ${
      activeSection === sectionId ? "text-[#64ffda] " : "text-white"
    }`;
  };

  return (
    <div className={`w-screen h-screen`}>
      {/* Header with hide/show on scroll */}
      <header
        className={`sm:h-[70px] h-[60px] sm:pt-[20px] px-[15px] sm:px-[40px] z-50 backdrop-blur-[5px] backdrop-brightness-100 transition-all duration-250 ease-[cubic-bezier(0.645,0.045,0.355,1)]  w-full flex   flex-row  items-center  justify-between  fixed top-0  ${
          isShowShadow ? " shadow-md shadow-[#080d14]" : " shadow-none"
        }   z-50 transition-transform duration-500 ${
          visible ? "translate-y-0 " : "-translate-y-full"
        }`}
      >
        <button
        ref={(el) => {
                  navItemsRef.current[0] = el;
                }}
          onClick={(e) => handleScroll(e, "#")}
          className="cursor-pointer text-active-color hover:text-shadow-xs font-SFMono-Semibold text-3xl hover:text-shadow-active-color hover:scale-[1.03] duration-300"
        >
          {showSidebar ? "A." : "ADITYA"}
        </button>
        <div className=" hidden sm:flex flex-row items-center gap-[25px]">
          <nav className="">
            <ul className="flex space-x-8">
              <li
                ref={(el) => {
                  navItemsRef.current[1] = el;
                }}
              >
                <a
                  href="#about"
                  onClick={(e) => handleScroll(e, "about")}
                  className={getLinkClass("about")}
                >
                  <span className=" text-active-color font-SFMono-Regular mr-[2px]">
                    01.
                  </span>
                  About
                </a>
              </li>
              <li
                ref={(el) => {
                  navItemsRef.current[2] = el;
                }}
              >
                <a
                  href="#experience"
                  onClick={(e) => handleScroll(e, "experience")}
                  className={`${getLinkClass("experience")}`}
                >
                  <span className=" text-active-color font-SFMono-Regular mr-[2px]">
                    02.
                  </span>
                  Experience
                </a>
              </li>
              <li
                ref={(el) => {
                  navItemsRef.current[3] = el;
                }}
              >
                <a
                  href="#work"
                  onClick={(e) => handleScroll(e, "work")}
                  className={getLinkClass("work")}
                >
                  <span className=" text-active-color font-SFMono-Regular mr-[2px]">
                    03.
                  </span>
                  Work
                </a>
              </li>
              <li
                ref={(el) => {
                  navItemsRef.current[4] = el;
                }}
              >
                <a
                  href="#contact"
                  onClick={(e) => handleScroll(e, "contact")}
                  className={getLinkClass("contact")}
                >
                  <span className=" text-active-color font-SFMono-Regular mr-[2px]">
                    04.
                  </span>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <a
            ref={(el) => {
              navItemsRef.current[5] = el;
            }}
            target="_blank" href="https://drive.google.com/file/d/1GU_FTT1r-zsK6f7ConxVfUV-SXHEr1gS/view"
            className="relative"
          >
            {/* Background div - lower z-index */}
             <div className="py-[6px] z-10 px-[14px] rounded-[4px] border-[1px] border-active-color bg-active-color absolute top-0 left-0 right-0 bottom-0"></div>

            {/* Button - higher z-index */}
            <div className="py-[6px] rounded-[4px] duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] z-20 relative px-[14px] border-[1px] border-active-color bg-[#091930]">
              <p className="text-[13px] font-SFMono-Regular text-active-color">
                Resume
              </p>
            </div>
       </a>
        </div>
        <div className="w-[40px]   h-[54px] sm:hidden flex justify-center items-center">
          <button
            onClick={() => setShowsidebar(!showSidebar)}
            className="relative cursor-pointer w-[30px] h-[2px] bg-active-color before:content-[''] before:absolute before:w-[36px] before:h-[2px] before:bg-active-color before:-top-2 before:right-0 after:content-[''] after:absolute after:w-[24px] after:h-[2px] after:bg-active-color after:top-2 after:right-0"
          ></button>
        </div>
      </header>
      <div className=" max-w-[90%] sm:max-w-[70%] mx-auto  ">
        {/* Page Sections */}
        <section className="">
          <Hero />
        </section>
        <section id="about" className="">
          <About />
        </section>

        <section
          id="experience"
          className=""
        >
        <Experience/>
        </section>

        <section id="work" className="">
          <Project/>
          {/* Work content */}
        </section>

        <section id="contact" className="min-h-screen pt-[70px] p-8">
          {/* Contact content */}
          <Contact/>
        </section>
        {/* bottom sidebar */}
        <div className=" h-[350px] hidden   sm:flex flex-row justify-between  w-full fixed bottom-0 left-0 right-0 px-[25px]">
          <div className="  h-full w-[70px]  flex flex-col items-center gap-[25px] justify-end">
            <a href="https://github.com/adityas-ops" target="_blank">
              <FiGithub className=" text-[20px] text-white hover:translate-y-[-2px] duration-300 hover:text-active-color" />
            </a>
            <a href="https://www.linkedin.com/in/aditya-ops/" target="_blank">
              <SlSocialLinkedin className=" text-[20px] text-white hover:translate-y-[-2px] duration-300 hover:text-active-color" />
            </a>
            <a
              href="https://www.instagram.com/adityaops.codes/"
              target="_blank"
            >
              <LuInstagram className=" text-[20px] text-white hover:translate-y-[-2px] duration-300 hover:text-active-color" />
            </a>

            <a href="https://www.facebook.com/adityaops.codes" target="_blank">
              <FiFacebook className=" text-[22px] text-white hover:translate-y-[-2px] duration-300 hover:text-active-color" />
            </a>

            <div className="w-[1px] h-[90px] bg-white"></div>
          </div>
          <div className="  h-full w-[70px] relative  flex flex-col items-center gap-[25px] justify-end">
            <div className=" rotate-90 hover:text-active-color hover:translate-y-[-4px] duration-300 absolute top-[100px]">
              <a
                className="text-[13px] hover:text-active-color   text-white font-SFMono-Regular"
                href="mailto: adityakushinagar123@gmail.com"
                target="_blank"
              >
                adityakushinagar123@gmail.com
              </a>
            </div>
            <div className="w-[1px] h-[90px] bg-white"></div>
          </div>
        </div>
        {/* sidebar in mobile view */}
        {showSidebar && (
          <>
            <div
              ref={backdropRef}
              className="fixed inset-0 sm:hidden block z-40 bg-black/20 brightness-75 backdrop-blur-[3.5px] opacity-0"
              onClick={() => setShowsidebar(false)}
              aria-hidden={!showSidebar}
            />

            <div
              ref={sidebarRef}
              className="fixed right-0 sm:hidden block top-0 z-50 h-full w-[70%] max-w-md bg-[#112240] transform translate-x-full shadow-xl"
              aria-modal="true"
              aria-hidden={!showSidebar}
            >
              <div className="pt-4 px-4 flex justify-end">
                <button
                  onClick={() => setShowsidebar(!showSidebar)}
                  className="text-[#64ffda]  transition-colors"
                  aria-label="Close sidebar"
                >
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    fill="#64ffda"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </button>
              </div>

              {/* Your sidebar content goes here */}
              <div className=" w-full h-full  flex justify-center  pt-[30%]">
                <nav className="">
                  <ul className="flex flex-col space-y-[35px]">
                    <li>
                      <a
                        href="#about"
                        onClick={(e) => {
                          handleScroll(e, "about");
                          setShowsidebar(false);
                        }}
                        className={getLinkClassMobile("about")}
                      >
                        <p className=" mb-1 text-[14px] text-active-color  font-SFMono-Regular ">
                          01.
                        </p>
                        <p>About</p>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#experience"
                        onClick={(e) => {
                          handleScroll(e, "experience");
                          setShowsidebar(false);
                        }}
                        className={`${getLinkClassMobile("experience")}`}
                      >
                        <p className=" text-active-color text-[14px] font-SFMono-Regular">
                          02.
                        </p>
                        <p>Experience</p>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#work"
                        onClick={(e) => {
                          handleScroll(e, "work");
                          setShowsidebar(false);
                        }}
                        className={getLinkClassMobile("work")}
                      >
                        <p className=" mb-1 text-[14px] text-active-color font-SFMono-Regular ">
                          03.
                        </p>
                        <p>Work</p>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        onClick={(e) => {
                          handleScroll(e, "contact");
                          setShowsidebar(false);
                        }}
                        className={getLinkClassMobile("contact")}
                      >
                        <p className=" text-[14px] text-active-color font-SFMono-Regular ">
                          04.
                        </p>
                        <p>Contact</p>
                      </a>
                    </li>
                    <li className="pt-[50px]">
                      <a target="_blank" href="https://drive.google.com/file/d/1GU_FTT1r-zsK6f7ConxVfUV-SXHEr1gS/view" className=" z-50 py-[12px] rounded-[4px] duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px]  relative px-[45px] border-[1px] border-active-color bg-[#112240]">
                        <p className="text-[16px] font-SFMono-Regular text-active-color">
                          Resume
                        </p>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
