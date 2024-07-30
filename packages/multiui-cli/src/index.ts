#!/usr/bin/env node
import { Command } from "commander";
import add from "./commands/add.js";
import showConfig from "./commands/config.js";
import init from "./commands/init.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkgJsonPath = path.join(__dirname, "..", "package.json");
const { version } = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
const program = new Command();

export const isDev = false;

isDev &&
  console.log(
    "🚀 MultiUI CLI is running in development mode.v" + version + "\n"
  );

export const MULTIUI_URL = isDev
  ? `http://localhost:3000`
  : `https://multiui.org`;

program
  .name("MultiUI")
  .description("The MultiUI Component Library CLI.")
  .version(version);

program
  .command("add")
  .description("Install one or more components to your project.")
  .argument("<name...>", "name of the component")
  .option("-o --output <dir>", "output directory")
  .option("--workspace <workspace>", "nodejs workspace directory")
  .action(add);

program
  .command("config")
  .description("Show MultiUI CLI config.")
  .option("--workspace <workspace>", "nodejs workspace directory")
  .action(showConfig);

program
  .command("init")
  .option("-f --framework <framework>", "framework")
  .option("-p --package_manager <package_manager>", "package manager")
  .option(
    "-c --components_output_dir <components_output_dir>",
    "components output directory"
  )
  .option("--workspace <workspace>", "nodejs workspace directory")
  .option("--skip-install-multiui", "skip installing multiui")
  .option("--skip-install-components", "skip installing components")
  .description("Initialize MultiUI CLI config.")
  .action(init);

program.parse();
