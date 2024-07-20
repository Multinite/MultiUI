#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

program
  .name("MultiUI")
  .description("The MultiUI Component Library CLI.")
  .version("v1.0.0");

program
  .command("add")
  .description("Add a new component to your project.")
  .argument("<name>", "name of the component")
  .action((name) => {
    console.log(`Adding ${name} component...`);
  });

program.parse();

