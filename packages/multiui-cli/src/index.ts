#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();

const isDev = true;

const MULTIUI_URL = isDev ? `http://localhost:3000` : `https://multiui.org`;

program
  .name("MultiUI")
  .description("The MultiUI Component Library CLI.")
  .version("v1.0.0");

program
  .command("add")
  .alias("install")
  .alias("i")
  .description("Add a new component to your project.")
  .argument("[name]", "name of the component")
  .action((name: string | undefined) => {
    console.log(`Adding ${name} component...`);

    fetch(new URL(`/api/v1/components/${name}`, MULTIUI_URL), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  });

program.parse();
