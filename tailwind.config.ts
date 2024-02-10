import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        rainforest: "url('/rainforest_mist_carbonbank_1920x784.jpg')",
        dalle: "url('/dalle.png')",
        forest: "url('/forest_green.jpg')",
        autumnforest: "url('/forest_autumn.jpeg')",
        riverestuary: "url('/River_estuary_drone_view.jpg')",
        jadewetlands: "url('/Jade_Wetlands.jpg')",
        lafayette: "url('/lafayette.jpg')",
      },
      boxShadow: {
        "md-inverted": "-2px 2px 15px -10px rgba(0,0,0,0.75)",
      },
      colors: {
        primary: "#2D3250",
        secondary: "#424769",
        tertiary: "#7077A1",
        accent: "#d8def2",
        // accentSecondary: "#596FB7",
        accentSecondary: "#8b9dd9",
        textColor: "#ffffff",
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
      },
    },
  },
};
export default config;
