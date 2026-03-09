module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        bg: "#0d0d0d",
        surface: "#141414",
        border: "#222222",
        accent: "#7c6af7",      // ← change this hex to whatever you want
        "accent-2": "#4ade80",  // ← or this one
        "accent-3": "#f97316",  // ← add new ones like this, use as text-accent-3
        muted: "#555555",
        light: "#e0e0e0",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        "slide-up": "slideUp 0.7s ease forwards",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};