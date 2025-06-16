function About() {
  return (
    <div className=" min-h-screen pt-[120px]">
      {/* section headline */}
      <div className="flex justify-start items-center gap-[20px]">
        <div className="flex items-end">
          <p className=" relative before:content-['01.'] before:font-SFMono-Regular before:text-[1.25rem]  sm:before:text-[1.5rem] before:text-active-color before:mr-[10px] leading-none text-[1.75rem] sm:text-[2rem] font-Calibre-Semibold text-[#ccd6f6] a font-[600] ">
            About Me
          </p>
        </div>
        <div className="sm:w-[150px] w-[36%] h-[1px] bg-[#233554]"></div>
      </div>
    </div>
  );
}

export default About;
