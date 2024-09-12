import puppeteer from "puppeteer";
import terminalImage from "terminal-image";
import path, { dirname } from "path";
import { getWorkspaceName, getWorkspaces } from "../utils/getWorkspaces.js";
import chalk from "chalk";
import boxen from "boxen";
import { version } from "../index.js";
import fs from "fs";
import { fileURLToPath } from "url";
import logUpdate from "log-update";
import { centerAlign } from "ansi-center-align";
import { exec, spawn } from "child_process";
import { viteServerPort } from "../servers/vite.js";

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
  const logs: string[] = [];
  let status: "waiting" | "running" | "error" = "waiting";

  let counter = 30;
  let direction = 1;

  logUpdate.done();
  log("Starting...", "info");
  await startViteServer(log);
  await startBrowser(log);
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
    if (path.startsWith("dist")) return;
    const filename = path.split("/").pop()!;
    const endAnalyzingTime = Date.now();
    log(
      `File ${chalk.blue(filename)} changed. ${chalk.gray(`${endAnalyzingTime - startAnalyzingTime}ms`)}`
    );
    queueStatus("waiting");
  });

  async function log(
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
    if (status === "error") {
      queueStatus("error");
    } else {
      queueStatus("waiting");
    }
    await updateLog();
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

  async function updateLog() {
    let statusText = chalk.green("🟢 Waiting");
    if (status === "running") {
      statusText = chalk.yellow("🟡 Running");
    } else if (status === "error") {
      statusText = chalk.red("🔴 Error");
    }

    logUpdate(
      [
        getStats(workspace),
        await getImageBox(counter),
        boxen(logs.filter((_, i) => i > logs.length - 17).join("\n"), {
          title: "[ " + `Status: ${statusText}` + " ]",
          titleAlignment: "center",
          padding: 1.5,
          fullscreen(width, height) {
            return [width, 20];
          },
        }),
      ].join("\n")
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
    updateLog();
  });
  //   setInterval(async () => {
  //     counter += direction;
  //     if (counter >= process.stdout.columns + 42) direction = -1;
  //     if (counter === 30) direction = 1;
  //     const box = await getImageBox(counter);
  //     updateLog();
  //   }, 10);
}

function getStats(workspace: string) {
  return (
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

async function getImageBox(width: number = process.stdout.columns - 2) {
  const size = 30;
  const img = await terminalImage.file(
    path.join(__dirname, "../../assets/logo_500.png"),
    {
      width:
        process.stdout.columns - 2 > size ? size : process.stdout.columns - 2,
      height: process.stdout.columns - 2 > size ? size : undefined,
    }
  );
  return boxen("\n" + centerAlign(img, width), {
    title: "[ " + chalk.red(`Live Preview`) + " ]",
    titleAlignment: "center",
    width: process.stdout.columns,
    dimBorder: true,
  });
}

function startViteServer(log: any) {
  return new Promise((res) => {
    log("Starting Vite server...", "info");

    const server = spawn(`npm`, ["run", "dev"], {
      cwd: path.join(__dirname, "../start/server"),
      stdio: "pipe",
      shell: true,
    });
    server.on("error", (err) => {
      log(err.toString(), "error");
      logUpdate.done();
      console.error(err);
    });
    let hasResolved = false;
    server.stdout.on("data", (data) => {
      data = data.toString().trim();
      if (data.trim().length === 0) return;
      data = data.replaceAll("\x1Bc", "");
      if (data.trim() === "") return;

      if (data.includes("Watching for file changes") && !hasResolved) {
        hasResolved = true;
        res(1);
      }
      log(`DEBUG: ${[data]}`, "info");
      //   logUpdate.done();
      //   console.log([data]);
    });

    server.stderr.on("data", (data) => {
      log(`Server Error: ${data}`, "error");
    });

    server.on("close", (code) => {
      log(`Vite server process exited with code ${code}`);
    });
    server.on("disconnect", () => {
      log(`Vite server disconnected`);
    });
    // const server = exec(

    //   "npm run dev",
    //   { cwd: path.join(__dirname, "../start/server") },
    //   (err, stdout, stderr) => {
    //     if (err) {
    //       log(`Vite Error: ${JSON.stringify(err, null, 2)}`, "error");
    //     } else {
    //       log(`DEBUG: ${stdout.trim()}`);
    //     }
    //     res(1);
    //   }
    // );

    // server.on("message", (message, sendHandle) => {
    //   message = message.toString();
    //   log(message);
    // });
    // server.on("error", (err) => {
    //   log(`Vite Error: ${JSON.stringify(err, null, 2)}`, "error");
    //   res(1);
    // });
  });
}

function startBrowser(log: any) {
  return new Promise(async (res) => {
    log("Starting browser...", "info");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
      await page.goto(`http://localhost:${viteServerPort}`);
    } catch (error) {
      log(
        `Error locating sever localhost at port ${viteServerPort}; Err: ${JSON.stringify(error)}`,
        "error"
      );
      process.exit(1);
    }

    // await page.setViewport({ width: 1080, height: 1024 });

    // await page.screenshot({
    //   path: "test.png",
    // });
    res(1);
  });
}
