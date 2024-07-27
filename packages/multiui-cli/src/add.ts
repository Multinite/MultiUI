import https from "https";
import fs from "fs";
import logUpdate from "log-update";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { MULTIUI_URL } from "./index.js";

export default async function add(name: string | undefined) {
  if (!name) return console.log("❌ Please provide a component name.");

  const componentNames = name.split(",").map((x) => x.trim());

  let componentSearchCount = 0;
  for await (const name of componentNames) {
    componentSearchCount++;
    logUpdate(
      `🔎 Searching for ${chalk.blue(name)} component... ${chalk.gray(`(${componentSearchCount}/${componentNames.length})`)}`
    );

    try {
      const res = await fetch(
        new URL(`/api/v1/components/${name}`, MULTIUI_URL),
        {
          method: "GET",
        }
      );
      const data: {
        success: boolean;
        data: ComponentData;
        error: undefined | any;
      } = await res.json();

      if (data.success === true) {
        try {
          await installComponent(data.data);
          logUpdate.done();
        } catch (err: any) {
          throw new Error(err);
        }
      } else {
        logUpdate.done();
        console.log(
          `❌ An error occurred while searching for ${name} component.`
        );
        throw new Error(data.error);
      }
    } catch (error: any) {
      logUpdate.done();
      console.log(
        `❌ An error occurred while searching for ${name} component.`
      );
      throw new Error(error);
    }
  }
  process.exit(0);

  function installComponent(component: ComponentData) {
    return new Promise((resolve, reject) => {
      logUpdate(
        `🎉 Component found: ${chalk.blue(component.name)} ${chalk.gray(`(v${component.version})`)}`
      );

      //   const get_files_time = Date.now();
      fetchFileNamesInDir(
        component.info.github_repo_owner,
        component.info.github_repo_name,
        "src"
      )
        .then((fileNames) => {
          if (fileNames) {
            logUpdate.done();
            logUpdate(
              `📄 installing ${chalk.yellow(fileNames.length.toString())} files...`
              //${chalk.gray(`(${(Date.now() - get_files_time).toFixed(0)}ms)`)}
            );
            logUpdate.done();
            console.log();
            const install_time = Date.now();
            let installedIndex = 0;

            const multibar = new cliProgress.MultiBar(
              {
                clearOnComplete: false,
                hideCursor: true,
                // format:
                //   "[{bar}] | {percentage}% | {duration_formatted} | {value}/{total} | {filename}",
                format: formatter,
              },
              cliProgress.Presets.rect
            );

            fileNames.forEach(async ({ downloadUrl, name, size }, index) => {
              const bar = multibar.create(size, 0);
              bar.update(0, { filename: name });

              try {
                // var content = await fetchFileContent(downloadUrl);
                await downloadFile(downloadUrl, `./test/${name}`, bar, name);
                installedIndex++;
                finished();
              } catch (err: any) {
                multibar.stop();
                logUpdate.done();
                console.log(
                  `❌ An error occurred while installing ${name} component.`
                );
                reject(err);
              }
            });

            function finished() {
              if (!fileNames || installedIndex !== fileNames.length) return;
              // bar.stop();
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
          logUpdate.done();
          console.log(
            `❌ An error occurred while fetching ${name} component files.\n🔄 It's likely due to Github API rate-limiting. Please try again later.\n`
          );
          reject(err);
        });
    });
  }
}

// async function fetchFileContent(url: string | URL) {
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const content = await response.text();
//     return content;
//   } catch (error) {
//     console.error("Failed to fetch file content:", error);
//   }
// }

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

async function fetchFileNamesInDir(
  owner: string,
  repo: string,
  dirPath: string
) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
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
    throw error;
  }
}

function downloadFile(url: string, outputPath: string, bar: any, name: string) {
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
        // Handle errors
        console.error(`Error: ${err.message}`);
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
