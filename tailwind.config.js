/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        // Brand
        primary: "#FE7229",
        secondary: "#4882C2",
        accent: "#4882C2",

        // Backgrounds
        background: "#F8F9FC",
        surface: "#FFFFFF",
        card: "#F1F1F1",

        // Text
        text: "#1F2937",
        "text-secondary": "#6B7280",
        "text-light": "#FFFFFF",

        // Borders
        border: "#E5E7EB",

        // States
        success: "#22C55E",
        error: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
      },

      fontSize: {
        title: "28px",
        subtitle: "20px",
        body: "16px",
        small: "14px",
        badge: "12px",
      },

      borderRadius: {
        input: "4px",
        button: "14px",
        card: "20px",
        fab: "30px",
      },

      spacing: {
        container: "16px",
        card: "16px",

        inputX: "16px",
        inputY: "14px",

        badgeX: "12px",
        badgeY: "6px",

        fab: "60px",

        button: "54px",
      },

      width: {
        fab: "60px",
      },

      height: {
        button: "54px",
        fab: "60px",
      },
    },
  },
  plugins: [],
}