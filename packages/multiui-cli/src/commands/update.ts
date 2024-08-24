import cliProgress from "cli-progress";
import https from "https";
import path from "path";
import { getWorkspaces } from "../utils/getWorkspaces.js";
import chalk from "chalk";
import fs from "fs";
import getMultiUIConfig from "../utils/multiUIConfig.js";
import { isDev } from "../index.js";
import logUpdate from "log-update";
import semver from "semver";
import inquirer from "inquirer";
import { clearDirectory, ComponentData, formatter } from "./add.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

      let component_version = componnet_json.version;
      if (!component_version) {
        logUpdate(
          chalk.red(
            `❌ Component ${chalk.blue(name)} is missing "version" field in component.json file.`
          )
        );
        return process.exit(1);
      } else if (!semver.valid(component_version)) {
        logUpdate(
          chalk.red(
            `❌ Component ${chalk.blue(name)} version in component.json file is not valid.`
          )
        );
        return process.exit(1);
      }

      component_version = semver.coerce(component_version)?.version;

      logUpdate(
        `🔎 Processing ${chalk.blue(name)} ${chalk.green(`v${component_version}`)}... ${chalk.gray(`(${i + 1}/${componentNames.length})`)}\n`
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
          const {
            component_data: db_component_data,
            component_json: remote_component_json,
          } = data;
          data = remote_component_json;
          if (semver.satisfies(component_version, `>=${data.version}`)) {
            logUpdate(
              chalk.green(
                `✅ Component ${chalk.blue(name)} is already up to date. ${chalk.magenta(`(v${data.version})`)}\n`
              )
            );
            logUpdate.done();
            return resolve(1);
          }
          logUpdate(
            `🔄 Component ${chalk.blue(name)} is outdated. (${chalk.red(`v${component_version}`)} → ${chalk.green(`v${data.version}`)}). \n`
          );
          inquirer
            //@ts-ignore
            .prompt([
              {
                type: "list",
                message: `How would you like to update ${chalk.blue(name)}?`,
                choices: [
                  {
                    name: `Update all files automatically. (Recommended)`,
                    value: "update",
                  },
                  {
                    name: "Enable diffing and let me confirm each file change.",
                    value: "diff",
                  },
                  {
                    name: "Overwrite all files with the new version.",
                    value: "overwrite",
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
                console.log(`🔄 Updating component ${chalk.blue(name)}...\n`);
                updateAll({
                  component: db_component_data,
                  framework: workspace_config.framework,
                  version: component_version,
                  output_dir: componentPath,
                });
              } else if (update === "overwrite") {
                console.log(
                  `🔄 Overwriting component ${chalk.blue(name)}...\n`
                );
                overwriteAll({
                  component: db_component_data,
                  framework: workspace_config.framework,
                  version: component_version,
                  output_dir: componentPath,
                });
              } else if (update === "diff") {
                console.log(`🔄 Updating component ${chalk.blue(name)}...\n`);
                // updateAll();
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

function overwriteAll({
  version,
  output_dir,
  component,
  framework,
}: {
  version: string;
  output_dir: string;
  component: ComponentData["info"];
  framework: string;
}) {
  return new Promise(async (resolve, reject) => {
    fetchFileNamesInDir({
      owner: component.github_repo_owner,
      repo: component.github_repo_name,
      framework: framework,
    }).then((fileNames) => {
      if (fileNames) {
        logUpdate.done();
        logUpdate(
          `📄 installing ${chalk.yellow(fileNames.length.toString())} files...`
        );
        logUpdate.done();
        console.log();
        const install_time = Date.now();
        let installedIndex = 0;

        const multibar = new cliProgress.MultiBar(
          {
            clearOnComplete: false,
            hideCursor: true,
            format: formatter,
          },
          cliProgress.Presets.rect
        );

        fs.mkdirSync(path.join(output_dir), {
          recursive: true,
        });
        clearDirectory(path.join(output_dir));
        fileNames.forEach(async ({ downloadUrl, name, size }, index) => {
          const bar = multibar.create(size, 0);
          bar.update(0, { filename: name });

          try {
            const outputPath = path.join(output_dir, name);
            await downloadFile({
              url:
                downloadUrl +
                (version.toLowerCase() === "latest" ? "" : `?ref=${version}`),
              outputPath: outputPath,
              bar,
              name,
            });
            installedIndex++;
            finished();
          } catch (err: any) {
            multibar.stop();
            logUpdate.done();
            console.log(
              `❌ An error occurred while installing ${name} component.`,
              err
            );
            process.exit(1);
          }
        });

        function finished() {
          if (!fileNames || installedIndex !== fileNames.length) return;
          multibar.stop();
          console.log();
          logUpdate(
            `✅ ${chalk.blue(component.name)} installed ${chalk.green(`successfully`)}! ${chalk.gray(`(${(Date.now() - install_time).toFixed(0)}ms)`)}`
          );
          resolve(1);
        }
      }
    });
  });
}
function updateAll({
  version,
  output_dir,
  component,
  framework,
}: {
  version: string;
  output_dir: string;
  component: ComponentData["info"];
  framework: string;
}) {
  return new Promise(async (resolve, reject) => {
    fetchFileNamesInDir({
      owner: component.github_repo_owner,
      repo: component.github_repo_name,
      framework: framework,
    }).then((fileNames) => {
      if (fileNames) {
        logUpdate.done();
        logUpdate(
          `📄 installing ${chalk.yellow(fileNames.length.toString())} files...`
        );
        logUpdate.done();
        console.log();
        const install_time = Date.now();
        let installedIndex = 0;

        const multibar = new cliProgress.MultiBar(
          {
            clearOnComplete: false,
            hideCursor: true,
            format: formatter,
          },
          cliProgress.Presets.rect
        );

        const tmpDir = path.join(__dirname, "../../tmp");

        fs.mkdirSync(path.join(tmpDir, component.name), {
          recursive: true,
        });
        clearDirectory(path.join(tmpDir, component.name));
        fileNames.forEach(async ({ downloadUrl, name, size }, index) => {
          const bar = multibar.create(size, 0);
          bar.update(0, { filename: name });

          try {
            const outputPath = path.join(tmpDir, component.name, name);
            await downloadFile({
              url:
                downloadUrl +
                (version.toLowerCase() === "latest" ? "" : `?ref=${version}`),
              outputPath: outputPath,
              bar,
              name,
            });
            installedIndex++;
            finished();
          } catch (err: any) {
            multibar.stop();
            logUpdate.done();
            console.log(
              `❌ An error occurred while installing ${name} component.`,
              err
            );
            process.exit(1);
          }
        });

        function finished() {
          if (!fileNames || installedIndex !== fileNames.length) return;
          multibar.stop();
          console.log();
          logUpdate(
            `✅ ${chalk.blue(component.name)} installed ${chalk.green(`successfully`)}! ${chalk.gray(`(${(Date.now() - install_time).toFixed(0)}ms)`)}`
          );
          resolve(1);
        }
      }
    });
  });
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

async function fetchFileNamesInDir({
  owner,
  repo,
  framework,
}: {
  repo: string;
  owner: string;
  framework: string;
}) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/packages/${framework}/src`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    var fileNames: { downloadUrl: string; name: string; size: number }[] = data
      .filter((item) => item.type === "file")
      .map((file) => ({
        name: file.name,
        downloadUrl: file.download_url,
        size: file.size,
      }));
  } catch (error) {
    console.log(`Error fetching file names in remote dir, url: ${url}`);
    throw error;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/packages/${framework}`
    );

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    var component_json: { downloadUrl: string; name: string; size: number } =
      data
        .filter(
          (item) => item.type === "file" && item.name === "component.json"
        )
        .map((file) => ({
          name: file.name,
          downloadUrl: file.download_url,
          size: file.size,
        }))[0];

    fileNames.push(component_json);
  } catch (error) {
    console.log(`Error fetching file names in remote dir, url: ${url}`);
    throw error;
  }

  return fileNames;
}

function downloadFile({
  bar,
  name,
  outputPath,
  url,
}: {
  url: string;
  outputPath: string;
  bar: any;
  name: string;
}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        // Check if response status is OK
        if (response.statusCode !== 200) {
          console.error(`Failed to get '${url}' (${response.statusCode})`);
          return;
        }

        // Create a writable stream to save the downloaded file
        const fileStream = fs.createWriteStream(outputPath);

        // Pipe the response data to the file stream
        response.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          resolve(1);
        });

        let downloadedSize = 0;
        response.on("data", (chunk) => {
          downloadedSize += chunk.length;
          bar.update(downloadedSize, { filename: name });
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
