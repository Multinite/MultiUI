import { MultiUIPlugin } from "@multinite_official/multiui";
import type { Config } from "tailwindcss";
import { multiUIConfig } from "./multiui.config";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/multiui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [MultiUIPlugin(multiUIConfig)],
};

export default config;
