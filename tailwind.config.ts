// import plugin from "tailwindcss/plugin";
// import MultiUIPlugin from "./src/providers/MultiUIPlugin";
// import type { RecursiveKeyValuePair } from "tailwindcss/types/config";

import MultiUIPlugin from "./src/providers/MultiUIPlugin";


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [MultiUIPlugin],
};
