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
        brand: {
          // Логотиптеги көк текст (#3B71B9)
          navy: {
            50: "#EEF4FC",
            100: "#D6E6F8",
            200: "#AECFEF",
            300: "#85B5E5",
            400: "#5E9BD9",
            500: "#3B71B9",
            600: "#325FA0",
            700: "#2A5088",
            800: "#234270",
            900: "#1D3760",
            950: "#152D4F",
          },
          // Логотиптеги сары иконка (#FFB800)
          gold: {
            50: "#FFFBF0",
            100: "#FFF4D6",
            200: "#FFE8AD",
            300: "#FFDB85",
            400: "#FFCE52",
            500: "#FFB800",
            600: "#E6A600",
            700: "#CC9400",
            800: "#B38200",
            900: "#997000",
          },
          surface: "#F7F9FC",
          "surface-muted": "#EEF4FC",
          orange: {
            50: "#FFFBF0",
            100: "#FFF4D6",
            200: "#FFE8AD",
            300: "#FFDB85",
            400: "#FFCE52",
            500: "#FFB800",
            600: "#E6A600",
            700: "#CC9400",
            800: "#B38200",
            900: "#997000",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brand: "0 20px 50px -12px rgba(59, 113, 185, 0.28)",
        "brand-gold": "0 16px 40px -10px rgba(255, 184, 0, 0.45)",
        "gold-glow": "0 4px 20px rgba(255, 184, 0, 0.45), 0 0 40px rgba(255, 184, 0, 0.15)",
        luxury: "0 25px 60px -12px rgba(59, 113, 185, 0.2), 0 8px 24px rgba(255, 184, 0, 0.08)",
        card: "0 4px 24px rgba(59, 113, 185, 0.12), 0 1px 0 rgba(255,255,255,0.8) inset",
        "card-hover": "0 28px 56px rgba(59, 113, 185, 0.18), 0 12px 32px rgba(255, 184, 0, 0.1)",
      },
      backgroundImage: {
        "mesh-luxury":
          "radial-gradient(at 20% 20%, rgba(59,113,185,0.12) 0%, transparent 50%), radial-gradient(at 80% 10%, rgba(255,184,0,0.1) 0%, transparent 45%), radial-gradient(at 60% 80%, rgba(59,113,185,0.08) 0%, transparent 50%)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "key-glow": "keyGlow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.3s ease-in",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-14px) rotate(1deg)" },
        },
        keyGlow: {
          "0%, 100%": { backgroundColor: "rgba(255, 255, 255, 0.9)", boxShadow: "none" },
          "50%": {
            backgroundColor: "rgba(255, 184, 0, 0.55)",
            boxShadow: "0 0 8px rgba(255, 184, 0, 0.5)",
          },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
