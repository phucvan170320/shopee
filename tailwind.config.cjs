// const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // corePlugins: {
  //   container: false,
  //   // xóa đi container
  // },
  theme: {
    extend: {
      colors: {
        orange: "#ee4d2d",
      },
    },
  },
  // thêm vào một cái container do mình tự đặt ra
  plugins: [
    // plugin(function ({ addComponents }) {
    //   addComponents({
    //     ".container": {
    //       maxWidth: theme("columns.7xl"),
    //       marginLeft: "auto",
    //       marginRight: "auto",
    //       paddingLeft: theme("spacing.4"),
    //       paddingRight: theme("spacing.4"),
    //     },
    //   });
    // }),
  ],
};
