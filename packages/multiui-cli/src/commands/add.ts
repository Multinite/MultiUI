import https from "https";
import fs from "fs";
import logUpdate from "log-update";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { MULTIUI_URL } from "../index.js";
import path from "path";
import getMultiUIConfig from "../utils/multiUIConfig.js";

export default async function add(
  componentNames: string[],
  options: { output: string }
) {
  if (!componentNames || componentNames.length === 0)
    return console.log("❌ Please provide a component name.");
  logUpdate.done();
  componentNames = uniqueStringsArray(
    componentNames.map((name) => name.trim().toLowerCase())
  );
  logUpdate(`🔎 Checking if component versions are valid...`);
  const findInvalidComponentVersions = componentNames.find(
    (x) =>
      x.split("@").length > 2 ||
      x.split("@").length === 0 ||
      x.split("@")[1] === ""
  );
  if (findInvalidComponentVersions) {
    console.log(
      chalk.red(`❌ Invalid component version: ${findInvalidComponentVersions}`)
    );
    return process.exit(1);
  }
  const desired_component_versions = componentNames.map((name) => {
    if (name.includes("@")) {
      const [name_, version] = name.split("@");
      return {
        name: name_,
        version,
      };
    }
    return {
      name,
      version: "latest",
    };
  });
  componentNames = componentNames.map((name) => name.split("@")[0]!);

  const output_dir = path.resolve(
    process.cwd(),
    options.output.length == 0
      ? getMultiUIConfig().components_output_dir
      : options.output
  );
  // logUpdate(`📁 Checking if ${chalk.blue(options.output)} directory exists...`);

  try {
    if (!fs.lstatSync(output_dir).isDirectory()) {
      logUpdate(`❌ Output path is a file, not a directory.`);
      logUpdate.done();
      console.log(chalk.gray(`path: ${output_dir}`));
      process.exit(1);
    } else {
      logUpdate(`✅ ${chalk.blue(options.output)} directory exists. `);
    }
  } catch (error: any) {
    if (error.code === "ENOENT") {
      //? We do not care if it doesn't exist, we just want to create it
      // logUpdate(`❌ Output directory does not exist.`);
      // logUpdate.done();
      // console.log(chalk.gray(`path: ${output_dir}`));
      // process.exit(1);
    } else {
      logUpdate(
        "❌ An error occurred while checking if output directory exists."
      );
      logUpdate.done();
      console.log(chalk.gray(`path: ${output_dir}`));
      throw error;
    }
  }

  let componentSearchCount = 0;
  const successfullyInstalledComponents: string[] = [];
  const total_install_time = Date.now();
  for await (const name of componentNames) {
    componentSearchCount++;
    logUpdate(
      `🔎 Now searching for ${chalk.blue(name)} component... ${chalk.gray(`(${componentSearchCount}/${componentNames.length})`)}`
    );
    logUpdate.done();
    const fetchUrl = new URL(
      `/api/v1/components/${[desired_component_versions.find((x) => x.name === name)!].map((x) => `${x.name}@${x.version}`).join(",")}`,
      MULTIUI_URL
    );
    try {
      const startTime = Date.now();
      const res = await fetch(fetchUrl, {
        method: "GET",
      });
      const data: {
        success: boolean;
        data: ComponentData;
        error: undefined | any;
      } = await res.json();

      if (data.success === true) {
        try {
          await installComponent(
            data.data,
            desired_component_versions.find((x) => x.name === name)!.version!,
            startTime
          );
          logUpdate.done();
        } catch (err: any) {
          logUpdate.done();
          console.log(
            `❌ An error occurred while installing the ${chalk.blue(name)} component.`
          );
          console.log(
            `🔄 It's likely due to Github API rate-limiting. Please try again later.\n`
          );
          console.log(chalk.grey());
          console.error(err);
          console.log();
          finishedLog(
            componentNames,
            total_install_time,
            successfullyInstalledComponents,
            componentSearchCount
          );
          process.exit(1);
        }
      } else {
        console.log(
          `❌ An error occurred while searching for ${chalk.blue(name)} component:`
        );
        if (data.error.startsWith(`No commit found for the ref`)) {
          console.error(
            `❌ Invalid version ${chalk.red(desired_component_versions.find((x) => x.name === name)!.version)} for ${chalk.blue(name)}`
          );
        } else console.error(data.error);
        console.log();
        finishedLog(
          componentNames,
          total_install_time,
          successfullyInstalledComponents,
          componentSearchCount
        );
        process.exit(1);
      }
    } catch (error: any) {
      logUpdate.done();
      console.log(
        `❌ An error occurred while fetching for the ${chalk.blue(name)} component.\nFetch URL: ${fetchUrl}`
      );
      console.error(error);
      console.log();
      finishedLog(
        componentNames,
        total_install_time,
        successfullyInstalledComponents,
        componentSearchCount
      );
      process.exit(1);
    }
    successfullyInstalledComponents.push(name);
    console.log(
      chalk.grey(
        `\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`
      )
    );
  }
  finishedLog(
    componentNames,
    total_install_time,
    successfullyInstalledComponents,
    componentSearchCount
  );
  process.exit(0);

  function installComponent(
    component: ComponentData,
    version: string,
    startTime: number
  ) {
    return new Promise((resolve, reject) => {
      logUpdate(
        `🎉 Component found: ${chalk.blue(component.name)} ${chalk.gray(`v${component.version} (${Date.now() - startTime}ms)`)}`
      );

      fetchFileNamesInDir({
        owner: component.info.github_repo_owner,
        repo: component.info.github_repo_name,
      })
        .then((fileNames) => {
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
            fs.mkdirSync(path.join(output_dir, component.name), {
              recursive: true,
            });
            clearDirectory(path.join(output_dir, component.name));
            fileNames.forEach(async ({ downloadUrl, name, size }, index) => {
              const bar = multibar.create(size, 0);
              bar.update(0, { filename: name });

              try {
                await downloadFile({
                  url:
                    downloadUrl +
                    (version.toLowerCase() === "latest"
                      ? ""
                      : `?ref=${version}`),
                  outputPath: path.join(
                    output_dir,
                    path.join(component.name, name)
                  ),
                  bar,
                  name,
                });
                installedIndex++;
                finished();
              } catch (err: any) {
                multibar.stop();
                logUpdate.done();
                console.log(
                  `❌ An error occurred while installing ${name} component.`
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
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const exampleComponentData = {
  name: "Button",
  description: "MultiUI Button component.",
  version: "0.0.1",
  author: "Multinite",
  website: "https://multiui.org",
  dependencies: [],
  info: {
    id: 1,
    name: "Button",
    version: "1.0.0",
    createdAt: "2024-07-27T12:14:53.000Z",
    updatedAt: "2024-07-27T12:14:53.000Z",
    userId: 0,
    description: "Basic Button component.",
    thumbnail_url:
      "https://media.discordapp.net/attachments/1151497521563172957/1266313604865593395/image.png?ex=66a4b1f2&is=66a36072&hm=b74e6f91e9b458176693c09b481e43d37c0fe40341ade5cc98b9de38094aef62&=&format=webp&quality=lossless&width=2264&height=1388",
    likes: 0,
    dislikes: 0,
    downloads: 0,
    github_url: "https://github.com/Multinite/multiui-button",
    github_repo_name: "multiui-button",
    github_repo_owner: "Multinite",
  },
};

type ComponentData = typeof exampleComponentData;

async function fetchFileNamesInDir({
  owner,
  repo,
}: {
  repo: string;
  owner: string;
}) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/src`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    const fileNames: { downloadUrl: string; name: string; size: number }[] =
      data
        .filter((item) => item.type === "file")
        .map((file) => ({
          name: file.name,
          downloadUrl: file.download_url,
          size: file.size,
        }));

    return fileNames;
  } catch (error) {
    console.log(`Error fetching file names in remote dir, url: ${url}`);
    throw error;
  }
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

        let downloadedSize = 0;
        response.on("data", (chunk) => {
          downloadedSize += chunk.length;
          bar.update(downloadedSize, { filename: name });
        });

        fileStream.on("finish", () => {
          fileStream.close();
          resolve(1);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

function formatter(options, params, payload) {
  // bar grows dynamically by current progress - no whitespaces are added
  const bar = options.barCompleteString.substr(
    0,
    Math.round(params.progress * options.barsize)
  );

  if (params.value >= params.total) {
    // finished
    return (
      chalk.green(params.value + "/" + params.total) +
      " [" +
      bar +
      "] " +
      chalk.cyan(payload.filename) +
      ` ${chalk.grey(`(${(Date.now() - params.startTime).toFixed(0)}ms)`)}`
    );
  } else {
    return (
      chalk.yellow(params.value + "/" + params.total) +
      " [" +
      bar +
      "] " +
      chalk.grey(payload.filename) +
      ` ${params.eta != "NULL" ? chalk.cyan(`(${params.eta}s)`) : ""}`
    );
  }
}

function finishedLog(
  componentNames: string[],
  total_install_time: number,
  successfullyInstalledComponents: string[],
  componentSearchCount: number
) {
  logUpdate.done();
  console.log(
    `👍 Successfully installed ${chalk.green(successfullyInstalledComponents.length.toString())}${chalk.gray(`/`)}${componentNames.length} components: ${chalk.gray(`(${(Date.now() - total_install_time).toFixed(0)}ms)`)}`
  );
  let index = 0;
  for (const name of componentNames) {
    index++;
    const isSkipped = componentSearchCount < index;
    const isInstalled = successfullyInstalledComponents.find(
      (x) => x.toLowerCase() === name
    );
    console.log(
      `  - ${isSkipped ? `⏩️` : isInstalled ? "✅" : "❌"} ${isSkipped ? chalk.gray(name + " (skipped)") : isInstalled ? chalk.green(name) : chalk.red(name)}`
    );
  }
}

function uniqueStringsArray(arr: string[]): string[] {
  return Array.from(new Set(arr));
}

function clearDirectory(directory) {
  try {
    // Read the contents of the directory
    const files = fs.readdirSync(directory);

    // Loop through each file in the directory
    for (const file of files) {
      const filePath = path.join(directory, file);

      // Check if the path is a file and not a directory
      if (fs.lstatSync(filePath).isFile()) {
        // Remove the file
        fs.unlinkSync(filePath);
      }
    }
  } catch (error) {
    return error;
  }
}
