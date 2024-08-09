import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Logo = ({ dark, className }: { dark?: boolean; className?: string }) => {
  return (
    <Link href={"/"}>
      <span
        className={`flex text-transparent font-[Chillax-SemiBold] text-3xl text-stroke ${dark ? "text-stroke-b-black" : "text-stroke-b-white"} ${className}`}
      >
        BALLAMAS
      </span>
    </Link>
  );
};

export default Logo;
