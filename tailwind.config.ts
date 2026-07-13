import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        slate: {
          50: "#F6F9FC",
          100: "#EEF3F8",
        },
        signal: {
          green: "#12A454",
          greendark: "#0C7A3E",
          blue: "#1D5FD6",
          bluedark: "#123E96",
          red: "#E23E3E",
          reddark: "#B32C2C",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(18, 46, 92, 0.10)",
        glow: "0 0 40px rgba(18, 164, 84, 0.25)",
      },
      keyframes: {
        pulseline: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-2%,2%)" },
          "100%": { transform: "translate(0,0)" },
        },
        fadein: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulseline: "pulseline 2.4s ease-in-out infinite",
        drift: "drift 14s ease-in-out infinite",
        fadein: "fadein 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
