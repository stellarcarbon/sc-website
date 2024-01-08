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
        rainforest: "url('/rainforest_mist_carbonbank_1920x784.jpg')",
      },
      colors: {
        primary: "#2D3250",
        secondary: "#424769",
        tertiary: "#7077A1",
        accent: "#d8def2",
        // accentSecondary: "#596FB7",
        accentSecondary: "#8b9dd9",
      },
      fontFamily: {
        noto: ["Noto Serif", "sans-serif"],
      },
    },
  },
};
export default config;
