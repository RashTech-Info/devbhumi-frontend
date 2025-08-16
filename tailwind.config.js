// tailwind.config.js
import { defineConfig } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

export default defineConfig({
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"], // ✅ Montserrat added
      },
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
      },
      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" },
        },
      },
      animation: {
        "scroll-left": "scrollLeft 40s linear infinite",
        "scroll-right": "scrollRight 40s linear infinite",
      },
    },
  },
  plugins: [animatePlugin],
});
