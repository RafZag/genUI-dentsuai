import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        almostBlack: "#101010",
        darkGray: "#191919",
        midGray: "#1f1f1f",
        lightGray: "#adadad",
        ctMainColor: "#00ff84",
        BAmainColor: "#ffaa00",
        CCmainColor: "#ff6136",
        THmainColor: "#0098ff",
        ECmainColor: "#00baa8",
        AUmainColor: "#9666ff",
        CAmainColor: "#05b200",
        HPmainColor: "#d152d8",
        CHmainColor: "#5acbff",
        SNmainColor: "#217fff",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "Sora", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "monospace"],
        heading: ["var(--font-sora)", "Sora", "sans-serif"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
