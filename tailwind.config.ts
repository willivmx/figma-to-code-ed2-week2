import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "b-light-gray": "#E5E5E5",
        "b-gray": "#C3C3C3",
        "b-dark-gray": "#7E7E7E",
        "b-black": "#1D1D1D",
        "b-white": "#FFFFFF",
        "b-purple": "#393158",
        "b-green": "#2D5C43",
        "b-olive": "#706947",
        "b-ocean": "#2A5259",
      },
    },
  },
  plugins: [require("@designbycode/tailwindcss-text-stroke")],
};
export default config;
