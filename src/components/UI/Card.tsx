import React from "react";
import { cn } from "../../utils/cn"; // Adjust the path as needed based on your folder structure

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "w-[375px] md:w-[712px] md:rounded-3xl h-screen md:h-full  p-3 md:p-6 md:gap-6 gap-3 flex flex-col",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
