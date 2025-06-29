import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#1987DD",
        "primary-black": "#12100D",
        "primary-white": "#ffffff",
      },
      fontFamily: {
        "work-sans": ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
};

export default config;
