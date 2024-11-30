import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // The following screen sizes are converted into css like so
      // @media (max-width: ...px) { ... }
      "2xl": { max: "1536px" },
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      xs: { max: "480px" },
    },
    extend: {
      spacing: {
        "cardWidth": "calc(33.333% - 1.25rem)",
        "chipWidth": "calc(33.333% - 0.6rem)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-100% 0" },
          "100%": { backgroundPosition: "100% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightGreen: "hsl(86, 46, 72)",
        darkGreen: "hsl(104, 100, 30)",
        textGreen: "hsl(93, 74, 17)",
      },
      fontFamily: {
        spartan: ["var(--font-leagueSpartan)"],
        lalezar: ["var(--font-lalezar)"],
      },
    },
  },
  plugins: [],
};
export default config;
