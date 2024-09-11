import path, { dirname } from "path";
import { getWorkspaceName, getWorkspaces } from "../utils/getWorkspaces.js";
import chalk from "chalk";
import boxen from "boxen";
import { version } from "../index.js";
import fs from "fs";
import { fileURLToPath } from "url";
import logUpdate from "log-update";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function start(options: { workspace?: string }) {
  const startTime = Date.now();
  let workspace_path = path.resolve(process.cwd());
  let workspace: string = options.workspace ?? getWorkspaceName();

  if (options.workspace) {
    const workspaces = await getWorkspaces();
    if (workspaces.find((x) => x.name === options.workspace)) {
      const { path: path_, name } = workspaces.find(
        (x) => x.name === options.workspace
      )!;
      workspace = name;
      workspace_path = path.resolve(path_);
      console.log(`📁 Workspace path: ${chalk.blue(workspace_path)}`);
    } else {
      console.log(`❌ Workspace ${chalk.blue(options.workspace)} not found.`);
      if (workspaces.length === 0)
        console.log(`There are no valid workspaces found.`);
      else
        console.log(
          `Valid workspaces are: ${workspaces.map((x) => chalk.yellow(x.name)).join(", ")}`
        );
      process.exit(1);
    }
  }
  displayStats(workspace);

  const logs: string[] = [];
  let status: "waiting" | "running" | "error" = "waiting";

  logUpdate.done();
  log("Starting...", "info");
  readyLog();
  seperate();

  const watcher = fs.watch(workspace_path, {
    recursive: true,
    encoding: "utf8",
  });
  watcher.on("error", (error) => {
    log(`Error: ${error.message}`, "error");
    status = "error";
    process.exit(1);
  });

  const valid_extensions = [".js", ".jsx", ".ts", ".tsx"];
  const excluded_extentions = [".d.ts", ".map", ".json"];
  watcher.on("change", (event, path: string) => {
    const startAnalyzingTime = Date.now();
    queueStatus("running");
    if (event !== "change") return;
    if (!valid_extensions.some((x) => path.endsWith(x))) return;
    if (excluded_extentions.some((x) => path.endsWith(x))) return;
    const filename = path.split("/").pop()!;
    const endAnalyzingTime = Date.now();
    log(
      `File ${chalk.blue(filename)} changed. ${chalk.gray(`${endAnalyzingTime - startAnalyzingTime}ms`)}`
    );
    queueStatus("waiting");
  });

  function log(
    content: string,
    type: "success" | "error" | "info" = "success"
  ) {
    let prefix = "";
    switch (type) {
      case "success":
        prefix = chalk.green("✓ ");
        break;
      case "error":
        prefix = chalk.red("✗ ");
        break;
      case "info":
        prefix = chalk.blue("𝒾 ");
        break;
    }
    logs.push(prefix + content);
    updateLog();
    if (status === "error") {
      queueStatus("error");
    } else {
      queueStatus("waiting");
    }
  }
  function readyLog() {
    const endTime = Date.now();
    log(`Ready in ${endTime - startTime}ms`);
  }

  function seperate() {
    logs.push("", chalk.gray("─────────────────────────"), "");
    updateLog();
  }

  function queueStatus(status_: "waiting" | "running" | "error") {
    if (status_ === "running") {
      status = "running";
    } else if (status_ === "error") {
      status = "error";
    } else if (status_ === "waiting") {
      status = "waiting";
    }
    updateLog();
  }

  function updateLog() {
    let statusText = chalk.green("🟢 Waiting");
    if (status === "running") {
      statusText = chalk.yellow("🟡 Running");
    } else if (status === "error") {
      statusText = chalk.red("🔴 Error");
    }
    logUpdate(
      boxen(logs.filter((_, i) => i > logs.length - 17).join("\n"), {
        title: "[ " + `Status: ${statusText}` + " ]",
        titleAlignment: "center",
        padding: 1.5,
        fullscreen(width, height) {
          return [width, 20];
        },
      })
      //   logs.join("\n")
    );
  }
  let timeout: NodeJS.Timeout | undefined;
  process.stdout.on("resize", () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      log("Console resized, updating...", "info");
    }, 150);
    logUpdate.done();
    console.log(new Array(100).fill("\n").join(""));
    displayStats(workspace);
    logUpdate.done();
    updateLog();
  });
  setInterval(() => {}, 1000);
}

function displayStats(workspace: string) {
  console.log(
    boxen(
      [
        chalk.yellow(`💼  Workspace:    `) + chalk.blue(workspace),
        chalk.yellow(`💻  MultiUI-cli:  `) + chalk.green(`v${version}`),
        chalk.yellow(`🎉  MultiUI:      `) + chalk.green(`v${version}`),
      ].join("\n\n"),
      {
        padding: 1,
        title: "[ " + chalk.magenta(`😎 MultiUI-CLI 👋`) + " ]",
        titleAlignment: "center",
        fullscreen(width, height) {
          return [width, 9];
        },
        dimBorder: true,
      }
    ) + "\n"
  );
}
