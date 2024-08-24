import path from "path";
import { getWorkspaces } from "../utils/getWorkspaces.js";
import chalk from "chalk";
import fs from "fs";
import getMultiUIConfig from "../utils/multiUIConfig.js";
import { isDev } from "../index.js";
import logUpdate from "log-update";
import semver from "semver";
import inquirer from "inquirer";

export default async function update(
  componentNames: string[],
  options: { workspace: string | undefined }
) {
  const workspace_path = await getWorkspace(options.workspace);
  const workspace_config = await getMultiUIConfig(options.workspace);
  logUpdate.done();
  let i = -1;
  for await (const name of componentNames) {
    await new Promise(async (resolve, reject) => {
      i++;
      logUpdate(
        `🔎 Processing ${chalk.blue(name)}... ${chalk.gray(`(${i + 1}/${componentNames.length})`)}\n`
      );

      const componentPath = path.join(
        path.join(workspace_path, workspace_config.components_output_dir),
        name
      );
      if (!fs.existsSync(componentPath)) {
        logUpdate.done();
        logUpdate(chalk.red(`❌ Component ${chalk.blue(name)} not found.`));
        return process.exit(1);
      }

      if (!fs.existsSync(path.join(componentPath, "component.json"))) {
        logUpdate(
          chalk.red(
            `❌ Component ${chalk.blue(name)} is missing component.json file.`
          )
        );
        return process.exit(1);
      }

      const componnet_json = JSON.parse(
        fs.readFileSync(path.join(componentPath, "component.json"), "utf-8")
      );

      let componnet_version = componnet_json.version;
      if (!componnet_version) {
        logUpdate(
          chalk.red(
            `❌ Component ${chalk.blue(name)} is missing "version" field in component.json file.`
          )
        );
        return process.exit(1);
      } else if (!semver.valid(componnet_version)) {
        logUpdate(
          chalk.red(
            `❌ Component ${chalk.blue(name)} version in component.json file is not valid.`
          )
        );
        return process.exit(1);
      }

      componnet_version = semver.coerce(componnet_version);

      logUpdate(
        `🔎 Processing ${chalk.blue(name)} ${chalk.green(`v${componnet_version}`)}... ${chalk.gray(`(${i + 1}/${componentNames.length})`)}\n`
      );

      fetch(
        isDev
          ? `http://localhost:3000/api/v1/update/${name}`
          : `/api/components/${name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(({ success, data }) => {
          if (!success) {
            logUpdate(
              chalk.red(
                `❌ An error occurred fetching component ${chalk.blue(name)}`
              )
            );
            console.error(data);
            return process.exit(1);
          }
          if (semver.satisfies(componnet_version, `>=${data.version}`)) {
            logUpdate(
              chalk.green(
                `✅ Component ${chalk.blue(name)} is already up to date. ${chalk.magenta(`(v${data.version})`)}\n`
              )
            );
            logUpdate.done();
            return resolve(1);
          }
          logUpdate(
            `🔄 Component ${chalk.blue(name)} is outdated. (${chalk.red(`v${componnet_version}`)} → ${chalk.green(`v${data.version}`)}). \n`
          );
          inquirer
            //@ts-ignore
            .prompt([
              {
                type: "list",
                message: `How would you like to update ${chalk.blue(name)}?`,
                choices: [
                  {
                    name: "Update all files automatically.",
                    value: "update",
                  },
                  {
                    name: "Enable diffing and let me confirm each file change.",
                    value: "diff",
                  },
                  {
                    name: "Cancel",
                    value: "cancel",
                  },
                ],
                name: "update",
                default: true,
              },
            ])
            .then(({ update }) => {
              console.log(`\n👍 Sure thing!`);
              if (update === "update") {
                console.log(
                  `🔄 Updating component ${chalk.blue(name)}...`
                );
              }
            })
            .catch((error) => {
              logUpdate.done();
              console.log(
                chalk.red(
                  `❌ An error occurred while updating component ${chalk.blue(name)}`
                )
              );
              console.error(error);
              process.exit(1);
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  return void null;
}

async function getWorkspace(optionWorkspace: string | undefined) {
  let workspace_path = path.resolve(process.cwd());

  if (optionWorkspace) {
    const workspaces = await getWorkspaces();

    if (workspaces.find((x) => x.name === optionWorkspace)) {
      const workspacePath = workspaces.find(
        (x) => x.name === optionWorkspace
      )!.path;
      workspace_path = path.resolve(workspacePath);
      console.log(`📁 Workspace path: ${chalk.blue(workspace_path)}`);
    } else {
      console.log(`❌ Workspace ${chalk.blue(optionWorkspace)} not found.`);
      if (workspaces.length === 0)
        console.log(`There are no valid workspaces found.`);
      else
        console.log(
          `Valid workspaces are: ${workspaces.map((x) => chalk.yellow(x.name)).join(", ")}`
        );
      process.exit(1);
    }
  }

  return workspace_path;
}
