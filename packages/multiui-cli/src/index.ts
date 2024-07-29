#!/usr/bin/env node
import { Command } from "commander";
import add from "./commands/add.js";
import showConfig from "./commands/config.js";
import init from "./commands/init.js";

const program = new Command();

export const isDev = true;

isDev && console.log("🚀 MultiUI CLI is running in development mode.\n");

export const MULTIUI_URL = isDev
  ? `http://localhost:3000`
  : `https://multiui.org`;

program
  .name("MultiUI")
  .description("The MultiUI Component Library CLI.")
  .version("v1.0.0");

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
