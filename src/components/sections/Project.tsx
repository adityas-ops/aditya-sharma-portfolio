import Featured from "./Featured";
import ProjectList from "./ProjectList";

function Project() {
  return (
    <div
      className="min-h-screen pt-[100px] sm:pt-[70px] max-w-full  mx-auto"
    >
      <Featured />
      <ProjectList />
    </div>
  );
}

export default Project;
