/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandColor: "#475467",
        primarryBtnColor: "#26B7CD",
        secondaryBtnColor: "#F4656E",
        inputPlceholderColor: "#98A2B3",
        signInBg: "#F9FAFB",
        signInTitleColor: "#344054",
        signInSubTitleColor: "#197A89",
        brandBorderColor: "#E4E7EC",
        errorColor: "#EA1515",
        errorBg: "#F6838326",
        errorColor2: "#F35050",
      },
      boxShadow: {
        custom: "0px 0px 12px 0px rgba(0, 0, 0, 0.15)", // Add your custom shadow here
      },
    },
  },
  plugins: [],
};
