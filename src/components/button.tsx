import React from "react";
import { cn } from "@/lib/utils";

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    className?: string;
  }
> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "px-5 py-3 gap-1.5 bg-b-white inline-flex justify-center items-center rounded-full hover:brightness-150 transition-all",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
