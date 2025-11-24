import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./client/src/**/*.{js,ts,jsx,tsx,mdx}", // Keep during migration
  ],
  // Tailwind v4 uses CSS-based configuration, but we keep this for compatibility
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

