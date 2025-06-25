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
        forestgpt: "url('/rainforest_gpt.png')",
        forestmizu: "url('/rainforest_mizushima.jpg')",
        forestling: "url('/rainforest_lingchor.jpg')",
        forestwaren: "url('/rainforest_waren.jpg')",
        forestparrot: "url('/rainforest_parrot.jpg')",
        forestair: "url('/rainforest_air.jpg')",
        forestbush: "url('/rainforest_bush.jpg')",
        forestkrystal: "url('/rainforest_krystal.jpg')",
        foresttrees: "url('/rainforest_trees.jpg')",
        forestho: "url('/rainforest_hideout.jpg')",
        forestcreek: "url('/rainforest_creek.jpg')",
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
        darker: "#22263d",
        darkest: "#1b1f33",
        accent: "#d8def2",
        // accentSecondary: "#596FB7",
        accentSecondary: "#8b9dd9",
        textColor: "#ffffff",
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
      },

      animation: {
        fade: "fadeOut 1s ease-in forwards",
        dashboardnavbarstart: "dashboardNavbarIn .2s ease-in forwards",
        dashboardnavbarend: "dashboardNavbarOut .2s ease-in forwards",
        showtopbar: "topbarIn .3s ease-in forwards",
        hidetopbar: "topbarOut .3s ease-in forwards",
        showrequestcertificate: "retirementsOut .2s ease-out forwards",
        hiderequestcertificate: "retirementsIn .5s ease-in forwards",
      },

      keyframes: () => ({
        fadeOut: {
          "0%": { opacity: "100" },
          "100%": { opacity: "0" },
        },
        dashboardNavbarIn: {
          "0%": { width: "0%", opacity: "0" },
          "100%": { width: "100%", opacity: "100" },
        },
        dashboardNavbarOut: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
        topbarIn: {
          "0%": { top: "-80px" },
          "100%": { top: "0px" },
        },
        topbarOut: {
          "0%": { top: "0px" },
          "100%": { top: "-80px" },
        },
        retirementsOut: {
          "0%": { transform: "translateX(-50%)", left: "50%", height: "40px" },
          "100%": {
            transform: "translateX(0)",
            left: "calc(100% - 24px)",
            height: "24px",
          },
        },
        retirementsIn: {
          "0%": {
            transform: "translateX(0)",
            left: "calc(100% - 24px)",
            height: "36px",
          },
          "100%": {
            transform: "translateX(-50%)",
            left: "50%",
            height: "40px",
          },
        },
      }),
    },
  },
};
export default config;
