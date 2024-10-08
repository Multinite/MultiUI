import { MultiUIPlugin } from "@multinite_official/multiui";
import type { Config } from "tailwindcss";
import { multiUIConfig } from "./multiui.config";
import { default_theme, test_theme, test_theme2 } from "./src/app/test/themes";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/multiui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [MultiUIPlugin(multiUIConfig, test_theme2)],
};

export default config;
