#!/usr/bin/env node
import { Command } from "commander";
import add from "./add.js";

const program = new Command();

export const isDev = false;

export const MULTIUI_URL = isDev
  ? `http://localhost:3000`
  : `https://multiui.org`;

program
  .name("MultiUI")
  .description("The MultiUI Component Library CLI.")
  .version("v1.0.0");

program
  .command("add")
  .alias("install")
  .alias("i")
  .description("Install one or more components to your project.")
  .argument("[name]", "name of the component")
  .action((name: string | undefined) => add(name));

program.parse();
