import React from "react";
import { cn } from "@/lib/utils";

const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
  }
> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "px-3.5 py-2.5 bg-transparent rounded-full border border-b-black w-full text-xs",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
