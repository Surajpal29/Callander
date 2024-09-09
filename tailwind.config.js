/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        topBgColor: "rgba(255, 244, 234, 1)",
        bgblack: "#1E1E1E",
        grayTextColor: "#6B6B6B",
        inputbg: "#EFEFEF",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Adding Inter as a custom font
      },
      fontWeight: {
        fontweight700: "700",
        fontweight500: "500",
      },
      lineHeight: {
        lineheight: "47px",
      },
      fontSize: {
        "custom-40": "40px", // Adding a custom font size of 40px
      },
    },
  },
  plugins: [],
};
