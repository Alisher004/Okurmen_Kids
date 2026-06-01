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
          navy: {
            50: "#F0F4F8",
            100: "#D9E2EC",
            200: "#BCCCDC",
            300: "#829AB1",
            400: "#486581",
            500: "#334E68",
            600: "#243B53",
            700: "#102A43",
            800: "#002847",
            900: "#001A3D",
            950: "#001229",
          },
          gold: {
            50: "#FFF4ED",
            100: "#FFE4D4",
            200: "#FFC9A8",
            300: "#FFA372",
            400: "#FF7840",
            500: "#F15A24",
            600: "#D94A18",
            700: "#B33A12",
            800: "#8C2E0E",
            900: "#66220A",
          },
          orange: {
            50: "#FFF4ED",
            100: "#FFE4D4",
            200: "#FFC9A8",
            300: "#FFA372",
            400: "#FF7840",
            500: "#F15A24",
            600: "#D94A18",
            700: "#B33A12",
            800: "#8C2E0E",
            900: "#66220A",
          },
          surface: "#001A3D",
          "surface-muted": "#002847",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brand: "0 20px 50px -12px rgba(0, 26, 61, 0.15)",
        "brand-gold": "0 16px 40px -10px rgba(241, 90, 36, 0.35)",
        "gold-glow": "0 4px 20px rgba(241, 90, 36, 0.35), 0 0 40px rgba(241, 90, 36, 0.12)",
        luxury: "0 25px 60px -12px rgba(0, 26, 61, 0.12), 0 8px 24px rgba(241, 90, 36, 0.08)",
        card: "0 4px 24px rgba(0, 26, 61, 0.08), 0 1px 0 rgba(255,255,255,0.9) inset",
        "card-hover": "0 28px 56px rgba(0, 26, 61, 0.14), 0 12px 32px rgba(241, 90, 36, 0.1)",
      },
      backgroundImage: {
        "mesh-luxury":
          "radial-gradient(at 20% 20%, rgba(0,26,61,0.06) 0%, transparent 50%), radial-gradient(at 80% 10%, rgba(241,90,36,0.08) 0%, transparent 45%), radial-gradient(at 60% 80%, rgba(0,26,61,0.04) 0%, transparent 50%)",
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
            backgroundColor: "rgba(241, 90, 36, 0.25)",
            boxShadow: "0 0 8px rgba(241, 90, 36, 0.4)",
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
