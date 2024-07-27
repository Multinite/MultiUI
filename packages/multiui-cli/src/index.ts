#!/usr/bin/env node
import { Command } from "commander";
import logUpdate from "log-update";
import chalk from "chalk";

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
    logUpdate(`🔎 Searching for ${name} component...`);

    fetch(new URL(`/api/v1/components/${name}`, MULTIUI_URL), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data_: { success: boolean; data: ComponentData }) => {
        if (data_.success === true) {
          const data = data_.data as ComponentData;
          logUpdate(
            `🎉 Component found, ${chalk.blue(data.name)}. ${chalk.gray(`(v${data.version})`)}`
          );

          const get_files_time = Date.now();
          fetchFileNamesInDir(
            data.info.github_repo_owner,
            data.info.github_repo_name,
            "src"
          )
            .then((fileNames) => {
              if (fileNames) {
                logUpdate.done();
                logUpdate(
                  `📄 Found ${chalk.yellow(fileNames.length.toString())} files. ${chalk.gray(`(${(Date.now() - get_files_time).toFixed(0)}ms)`)}`
                );
                logUpdate.done();
                console.log("");
                const install_time = Date.now();
                let installedIndex = 0;
                fileNames.forEach(async (fileName, index) => {
                  try {
                    var content = await fetchFileContent(fileName.downloadUrl);
                    setTimeout(() => {
                    installedIndex++;
                    logUpdate(
                      `👍 Installed ${chalk.green(fileName.name)}. ${chalk.gray(`(${installedIndex}/${fileNames.length})`)}`
                    );
                    finished();
                    }, 500 * index);
                  } catch (err) {
                    console.error(err);
                  }
                });

                function finished() {
                  if (!fileNames || installedIndex !== fileNames.length) return;
                  logUpdate(
                    `✅ ${chalk.blue(data.name)} installed ${chalk.green(`successfully`)}! ${chalk.gray(`(${(Date.now() - install_time).toFixed(0)}ms)`)}`
                  );
                }
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

program.parse();

//https://raw.githubusercontent.com/Multinite/multiui-button/main/src/component.json

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
    const fileNames: { downloadUrl: string; name: string }[] = data
      .filter((item) => item.type === "file") // Filter out directories
      .map((file) => ({ name: file.name, downloadUrl: file.download_url })); // Extract file names and download URLs

    return fileNames;
  } catch (error) {
    console.error("Failed to fetch directory contents:", error);
  }
}

async function fetchFileContent(url: string | URL) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const content = await response.text();
    return content;
  } catch (error) {
    console.error("Failed to fetch file content:", error);
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
