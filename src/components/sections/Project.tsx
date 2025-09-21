import { memo, lazy, Suspense } from "react";

// Lazy load project components
const Featured = lazy(() => import("./Featured"));
const ProjectList = lazy(() => import("./ProjectList"));

function Project() {
  return (
    <div
      className="min-h-screen pt-[100px] sm:pt-[70px] max-w-full  mx-auto"
    >
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="animate-pulse bg-gray-700 h-4 w-48 rounded"></div></div>}>
        <Featured />
      </Suspense>
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="animate-pulse bg-gray-700 h-4 w-48 rounded"></div></div>}>
        <ProjectList />
      </Suspense>
    </div>
  );
}

export default memo(Project);
