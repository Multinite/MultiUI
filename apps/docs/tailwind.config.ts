import { MultiUIPlugin } from "@multinite_official/multiui";
import type { Config } from "tailwindcss";
import multiUIConfig from "./multiui.config.json";
import { MultiUIConfig } from "@multinite_official/multiui/types/MultiUIConfig";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/multiui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [MultiUIPlugin(multiUIConfig as unknown as MultiUIConfig)],
};

export default config;
