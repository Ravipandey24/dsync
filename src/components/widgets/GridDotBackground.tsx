import { FC } from "react";

interface BackgroundProps {
  children: React.ReactNode;
}

const GridBackground: FC<BackgroundProps> = ({ children }) => {
  return (
    <div
      className={`h-screen absolute top-0 w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]`}
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
};

const DotBackground: FC<BackgroundProps> = ({ children }) => {
  return (
    <div
      className={`h-screen absolute top-0 w-full dark:bg-black bg-white dark:bg-dots-white/[0.2] bg-dots-black/[0.2]`}
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
};

export { GridBackground, DotBackground };
