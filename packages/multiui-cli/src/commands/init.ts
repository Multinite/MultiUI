import fs from "fs";
import inquirer from "inquirer";
import add from "./add.js";
import logUpdate from "log-update";
import path from "path";
import getMultiUIConfig, { defaultConfig } from "../utils/multiUIConfig.js";
import chalk from "chalk";
import { spawn } from "child_process";
import { getWorkspaces } from "../utils/getWorkspaces.js";

const valid_frameworks = ["react", "angular", "svelte"];
const valid_package_managers = ["npm", "yarn", "pnpm", "bun"];

async function init(args: {
  framework: string | undefined;
  package_manager: string | undefined;
  components_output_dir: string | undefined;
  workspace: string | undefined;
  skipInstallMultiui: boolean | undefined;
  skipInstallComponents: boolean | undefined;
}) {
  if (args.framework && valid_frameworks.indexOf(args.framework) === -1) {
    console.log(`❌ Invalid framework ${chalk.blue(args.framework)}`);
    console.log(
      `Valid frameworks: ${valid_frameworks.map((x) => chalk.yellow(x)).join(", ")}`
    );
    process.exit(1);
  }

  if (
    args.package_manager &&
    valid_package_managers.indexOf(args.package_manager) === -1
  ) {
    console.log(
      `❌ Invalid package manager ${chalk.blue(args.package_manager)}`
    );
    console.log(
      `Valid package managers: ${valid_package_managers.map((x) => chalk.yellow(x)).join(", ")}`
    );
    process.exit(1);
  }

  let root_path = process.cwd();
  if (args.workspace) {
    const workspaces = await getWorkspaces();
    const find = workspaces.find((x) => x.name === args.workspace);
    if (!find) {
      console.log(`❌ Workspace ${chalk.blue(args.workspace)} not found.`);
      console.log(`Available workspaces:`);
      workspaces.forEach((workspace) => {
        console.log(`- ${chalk.yellow(workspace.name)}`);
      });
      process.exit(1);
    }
    root_path = find.path;
  }

  const configPath = path.join(root_path, "multiui.config.json");
  console.log(`Root path: ${root_path}`);
  if (fs.existsSync(configPath)) {
    console.log(`❌ Config file already exists:`);
    console.log(chalk.gray(`${configPath}`));
    process.exit(1);
  }
  if (
    args.package_manager &&
    args.framework &&
    args.components_output_dir &&
    args.skipInstallComponents
  )
    run({
      components: [],
      components_output_dir:
        args.components_output_dir || defaultConfig.components_output_dir,
      framework: args.framework || defaultConfig.framework,
      package_manager: args.package_manager || defaultConfig.package_manager,
    });
  else
    inquirer
      .prompt(
        //@ts-ignore
        [
          ...(args.framework
            ? []
            : [
                {
                  type: "list",
                  name: "framework",
                  message: "What framework do you want to use?",
                  choices: ["react", "angular", "svelte"],
                  default: defaultConfig.framework,
                  required: true,
                },
              ]),
          ,
          ...(args.package_manager
            ? []
            : [
                {
                  type: "list",
                  name: "package_manager",
                  message: "What package manager do you want to use?",
                  choices: ["npm", "yarn", "pnpm", "bun"],
                  default: defaultConfig.package_manager,
                  required: true,
                },
              ]),
          ,
          ...(args.components_output_dir
            ? []
            : [
                {
                  type: "input",
                  name: "components_output_dir",
                  message: "What is the output directory for components?",
                  default: defaultConfig.components_output_dir,
                  required: true,
                },
              ]),
          ...(args.skipInstallComponents
            ? []
            : [
                {
                  type: "checkbox",
                  name: "components",
                  message: "Would you like to add some components now?",
                  choices: [
                    "button",
                    "input",
                    "checkbox",
                    "dropdown",
                    "modal",
                    "radio",
                    "tabs",
                    "tooltip",
                  ],
                },
              ]),
        ].filter((x) => typeof x !== "undefined")
      )
      .then(async (answers: any) => {
        run(answers);
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.log(
            "❌ Prompt couldn't be rendered in the current environment."
          );
          process.exit(1);
        } else {
          // Something else went wrong
          console.log("❌ Something went wrong while prompting:");
          console.error(error);
          process.exit(1);
        }
      });

  async function run(answers: {
    framework: string | undefined;
    package_manager: string | undefined;
    components_output_dir: string | undefined;
    components: string[] | undefined;
  }) {
    const default_config = {
      [`$schema`]: "https://multiui.org/multiui.config.schema.json",
      ...defaultConfig,
    };

    fs.writeFileSync(configPath, JSON.stringify(default_config, null, 2));
    console.log();
    console.log(`✅ Config file created!`);

    if (args.skipInstallMultiui === true) {
      console.log(
        chalk.grey(
          `\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`
        )
      );
      console.log("✅ Skipping MultiUI installation.");
    } else {
      await startInstallingMultiUi(args);
    }

    startInstallingComponents(answers.components ?? [], args.workspace);
  }
}

export default init;

function startInstallingMultiUi(args: any) {
  return new Promise(async (resolve, reject) => {
    console.log(
      chalk.grey(
        `\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`
      )
    );
    //@ts-ignore
    const answers = await inquirer.prompt([
      {
        type: "confirm",
        name: "install_multiui",
        message: args.workspace
          ? `Do you want to install MultiUI as a dependency in the ${chalk.blue(
              args.workspace
            )} workspace?`
          : "Do you want to install MultiUI as a dependency?",
        default: true,
      },
    ]);
    if (!answers.install_multiui) {
      console.log("✅ Canceling MultiUI installation.");
      resolve(1);
      return;
    }
    args.workspace
      ? console.log(
          `🍭 Installing MultiUI in the ${chalk.blue(args.workspace)} workspace using ${chalk.green(args.package_manager || defaultConfig.package_manager)}...`
        )
      : console.log(`🍭 Installing MultiUI...`);
    const pkgManager = (await getMultiUIConfig(args.workspace)).package_manager;
    const install = spawn(
      pkgManager,
      [
        "install",
        "@multinite_official/multiui",
        ...(args.workspace ? ["--workspace", args.workspace] : []),
      ],
      {
        stdio: "inherit",
      }
    );
    install.on("error", (err) => {
      console.error(
        `❌ ${pkgManager} install process exited with error ${err}`
      );
      process.exit(1);
    });

    install.on("close", (code) => {
      if (code !== 0) {
        console.error(`${pkgManager} install process exited with code ${code}`);
        return;
      }
      console.log();
      console.log("✅ MultiUI installed successfully.");
      resolve(1);
    });
  });
}

function startInstallingComponents(
  components: string[],
  workspace: string | undefined
) {
  if (components.length !== 0) {
    console.log(
      chalk.grey(
        `\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`
      )
    );
    console.log(
      `🛠️  Now installing components: ${components.map((x) => chalk.magenta(x)).join(", ")}...`
    );
    logUpdate.done();
    add(components, { output: "", workspace: workspace });
  } else {
    console.log(
      chalk.grey(
        `\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`
      )
    );
    console.log("✅ No components to install, all finished!");
  }
}