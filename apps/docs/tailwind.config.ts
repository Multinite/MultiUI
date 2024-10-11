import { MultiUIPlugin } from "@multinite_official/multiui";
import type { Config } from "tailwindcss";
import { test_theme2 } from "./src/app/test/themes";
import multiUIConfig from "./multiui.config";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/multiui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [MultiUIPlugin(multiUIConfig, test_theme2)],
};

export default config;
