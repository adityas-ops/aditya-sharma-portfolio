import React, { useEffect, useState } from "react";
import { SlSocialLinkedin } from "react-icons/sl";
import { LuInstagram } from "react-icons/lu";
import { FiGithub } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";

function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isShowShadow, setIsshowShadow] = useState<boolean>(false);
  const [showSidebar,setShowsidebar] = useState<boolean>(false)

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
      setActiveSection("about"); // or your default section
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
          //   setActiveSection(hash);
        }, 100);
      }
    }
  }, []);

  // Helper function to determine active link style
  const getLinkClass = (sectionId: string) => {
    return `hover:text-[#64ffda] text-[13px] font-SFMono-Regular transition-colors ${
      activeSection === sectionId ? "text-[#64ffda] " : "text-white"
    }`;
  };

  return (
    <div className="w-screen h-screen">
      {/* Header with hide/show on scroll */}
      <header
        className={`h-[70px] px-[20px] z-50 backdrop-blur-[5px] backdrop-brightness-100 transition-all duration-250 ease-[cubic-bezier(0.645,0.045,0.355,1)]  w-full flex   flex-row  items-center  justify-between  fixed top-0  ${
          isShowShadow ? " shadow-md shadow-[#080d14]" : " shadow-none"
        }   z-50 transition-transform duration-300 ${
          visible ? "translate-y-0 " : "-translate-y-full"
        }`}
      >
        <button
          onClick={(e) => handleScroll(e, "#")}
          className="cursor-pointer text-active-color duration-300 font-SFMono-Semibold text-3xl hover:text-shadow-active-color text-shadow-sm"
        >
          ADITYA
        </button>
        <div className=" hidden sm:flex flex-row items-center gap-[25px]">
          <nav className="">
            <ul className="flex space-x-8">
              <li>
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
              <li>
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
              <li>
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
              <li>
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
          <div className="relative">
            {/* Background div - lower z-index */}
            <div className="py-[6px] z-10 px-[14px] rounded-[4px] border-[1px] border-active-color bg-active-color absolute top-0 left-0 right-0 bottom-0"></div>

            {/* Button - higher z-index */}
            <button className="py-[6px] rounded-[4px] duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] z-20 relative px-[14px] border-[1px] border-active-color bg-[#091930]">
              <p className="text-[13px] font-SFMono-Regular text-active-color">
                Resume
              </p>
            </button>
          </div>
        </div>
        <div className="w-[60px]  h-[54px] sm:hidden flex justify-center items-center">
          <button onClick={()=>setShowsidebar(!showSidebar)} className="relative cursor-pointer w-[30px] h-[2px] bg-active-color before:content-[''] before:absolute before:w-[36px] before:h-[2px] before:bg-active-color before:-top-2 before:right-0 after:content-[''] after:absolute after:w-[24px] after:h-[2px] after:bg-active-color after:top-2 after:right-0"></button>
        </div>
      </header>
      <div className=" max-w-[95%] sm:max-w-[70%] mx-auto  ">
        {/* Page Sections */}
        <section id="about" className="min-h-screen pt-[70px] p-8">
          <h2 className="text-3xl font-bold mb-4">About</h2>
          {/* About content */}
        </section>

        <section
          id="experience"
          className="min-h-screen pt-[70px] p-8 bg-gray-50"
        >
          <h2 className="text-3xl font-bold mb-4">Experience</h2>
          {/* Experience content */}
        </section>

        <section id="work" className="min-h-screen pt-[70px] p-8">
          <h2 className="text-3xl font-bold mb-4">Work</h2>
          {/* Work content */}
        </section>

        <section id="contact" className="min-h-screen pt-[70px] p-8 bg-gray-50">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          {/* Contact content */}
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
{
  showSidebar && (
    <div className="fixed inset-0 z-50 backdrop-blur-[5px] backdrop-brightness-75 transition-all duration-250 ease-[cubic-bezier(0.645,0.045,0.355,1)]">
      {/* Your sidebar content would go here */}
    </div>
  )
}
      </div>
    </div>
  );
}

export default Home;
