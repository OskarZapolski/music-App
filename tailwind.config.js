/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        blob: "blob 8s ease-in-out infinite",
        blob3: "blob 8s ease-in-out 3s infinite",
        blob6: "blob 8s ease-in-out 6s infinite",
        fadein: "fadein 0.7s ease-out 0.2s forwards",
        fadein4: "fadein 0.7s ease-out 0.4s forwards",
        fadein6: "fadein 0.7s ease-out 0.6s forwards",
        fadein8: "fadein 0.7s ease-out 0.8s forwards",
        fadein10: "fadein 0.7s ease-out 1s forwards",
        fadein12: "fadein 0.7s ease-out 1.2s forwards",
      },
      keyframes: {
        blob: {
          "0% 100%": {
            transform: "translate(0px,0px) scale(1)",
          },
          "33%": {
            transform: "translate(20px,-35px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-10px, 20px) scale(0.9)",
          },
        },
        fadein: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwindcss/plugin")(({ addVariant }) => {
      addVariant("search-cancel", "&::-webkit-search-cancel-button");
    }),
  ],
};
