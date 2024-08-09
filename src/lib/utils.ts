import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const app_url =
  process.env.NODE_ENV === "production"
    ? "https://ballamas.vercel.app"
    : "http://localhost:3000";
