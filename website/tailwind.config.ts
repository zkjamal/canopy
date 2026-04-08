import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: "#8B0000",
          red: "#C41E3A",
          amber: "#D4A017",
          cream: "#FFF8F0",
          brown: "#3E2723",
        },
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(139, 0, 0, 0.28)",
      },
      backgroundImage: {
        hero:
          "radial-gradient(circle at top left, rgba(212, 160, 23, 0.24), transparent 34%), radial-gradient(circle at bottom right, rgba(196, 30, 58, 0.22), transparent 28%), linear-gradient(135deg, rgba(139, 0, 0, 0.96), rgba(196, 30, 58, 0.88))",
      },
    },
  },
  plugins: [],
};

export default config;
