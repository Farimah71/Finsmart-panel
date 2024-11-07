/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/**/**/**/**/**.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark_custom-header-table-black": "#343a40",
        "dark_custom-average-black": "#343a40",
        "dark_custom-full-black": "#050609",
        "dark_custom-light-white": "#e9ecef",
        "dark_custom-full-white": "#ffffff",
        "dark_custom-light-black": "#212529",
        "custom-dark": "#262323",
        "custom-gray": "#E1E3EA",
        "custom-gray-muted": "#99a1b7",
        "custom-gray-light": "#F2F2F2",
        "custom-gray-medium": "#F1F1F2",
        "custom-gray-dark": "#22223b",
        "custom-gray-text": "-gray-500",
        // "custom-blue": "#02dcde",
        "custom-blue-light": "#aadef2",
        "custom-blue-dark": "#3b88d1",
        "custom-blue": "#049CDB",
        "custom-yellow-light": "#FFF8DD",
        "custom-yellow-dark": "#F6C000",
        "custom-purple-light": "#F8F5FF",
        "custom-purple-dark": "#7239EA",
        "custom-red-light": "#FFF5F8",
        "custom-red-dark": "#F1416C",
        "custom-green-light": "#E8FFF3",
        "custom-green-dark": "#70e000",
        "custom-orange": "#fb8500",
      },
      backgroundColor: {
        "custom-white-0.5": "rgba(255, 255, 255, 0.55)",
      },
      backgroundImage: {
        "gradient-blue": "linear-gradient(90deg, #22b9f5 0%, #7dd3f5 100%)",
      },
      boxShadow: {
        "custom-orange-light": "-1px 0px 3px 0px rgba(254, 102, 1, 0.06)",
        "custom-gray": "0 0 3px 1px rgba(0, 0, 0, 0.2)",
        "custom-box": "0px 0px 50px 0px rgba(82, 63, 105, 0.15)",
      },
      borderRadius: {
        10: "10px",
        11: "11px",
        30: "30px",
        48: "48px",
        200: "500px",
        134: "134px",
        50: "50%",
      },
      fontSize: {
        14: "14px",
        16: "16px",
        18: "18px",
        19: "19px",
        21: "21px",
        49: "49px",
      },
      width: {
        450: "450px",
        84: "84%",
        265: "265px",
        285: "285px",
        1400: "1400px",
      },
      height: {
        74: "74px",
        285: "285px",
      },
      maxWidth: {
        98: "98%",
      },
      minHeight: {
        320: "320px",
      },
      spacing: {
        74: "74px",
        265: "265px",
      },
      inset: {
        box: "110px auto auto 10px",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "scale(1.2)",
          },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        appear: "fadeIn 1s linear",
      },
    },
  },
  plugins: [],
};
