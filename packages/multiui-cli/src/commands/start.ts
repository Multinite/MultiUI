import puppeteer, { Page } from "puppeteer";
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
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
// import { viteServerPort } from "../server/port.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function start(options: { workspace?: string }) {
  const startTime = Date.now();
  let workspace_path = path.resolve(process.cwd());
  let workspace: string = options.workspace ?? getWorkspaceName();
  let page: Page | undefined;

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
  const { server, port } = await startViteServer(log);
  page = await startBrowser(log, server, port);
  readyLog();
  seperate();

  const watcher = fs.watch(workspace_path, {
    recursive: true,
    encoding: "utf8",
  });
  watcher.on("error", (error) => {
    log(`Error watching: ${error.message}`, "error");
    status = "error";
    process.exit(1);
  });

  const valid_extensions = [".js", ".jsx", ".ts", ".tsx"];
  const excluded_extentions = [".d.ts", ".map", ".json"];
  watcher.on("change", (event, path: string) => {
    const startAnalyzingTime = Date.now();
    if (event !== "change") return;
    if (!valid_extensions.some((x) => path.endsWith(x))) return;
    if (excluded_extentions.some((x) => path.endsWith(x))) return;
    if (path.startsWith("dist")) return;
    const filename = path.split("/").pop()!;
    const endAnalyzingTime = Date.now();
    log(
      `File ${chalk.blue(filename)} changed. ${chalk.gray(`${endAnalyzingTime - startAnalyzingTime}ms`)}`
    );
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

    await updateLog();
  }
  function readyLog() {
    status = "waiting";
    const endTime = Date.now();
    log(`Ready in ${endTime - startTime}ms`);
  }

  function seperate() {
    logs.push("", chalk.gray("─────────────────────────"), "");
    updateLog();
  }

  function queueStatus(
    status_: "waiting" | "running" | "error",
    updateLog_: boolean = true
  ) {
    if (status_ === "running") {
      status = "running";
    } else if (status_ === "error") {
      status = "error";
    } else if (status_ === "waiting") {
      status = "waiting";
    }
    if (updateLog_) {
      updateLog();
    }
  }

  async function updateLog() {
    let statusText = chalk.green("🟢 Waiting");
    if (status === "running") {
      statusText = chalk.yellow("🟡 Running");
    } else if (status === "error") {
      statusText = chalk.red("🔴 Error");
    }
    const logsBox = boxen(
      splitBox(
        logs.filter((_, i) => i > logs.length - 17).join("\n"),
        await getImageBox({
          withoutBox: true,
          width: process.stdout.columns / 3 - 2,
        }),
        process.stdout.columns - 3,
        18
      ),
      {
        title: "[ " + `Status: ${statusText}` + " ]",
        titleAlignment: "center",
        padding: 0,
        fullscreen(width, height) {
          return [width, 20];
        },
      }
    );

    logUpdate([getStats(workspace), logsBox].join("\n\n"));
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
  // setInterval(async () => {
  //   counter += direction;
  //   if (counter >= process.stdout.columns + 42) direction = -1;
  //   if (counter === 30) direction = 1;
  //   const box = await getImageBox(counter);
  //   updateLog();
  // }, 10);

  async function getImageBox(
    { width, withoutBox }: { width?: number; withoutBox?: boolean } = {
      width: process.stdout.columns - 2,
      withoutBox: false,
    }
  ) {
    const size = 30;
    queueStatus("running", false);
    if (page) {
      await page.screenshot({
        path: "./server/gen/comp.png",
        optimizeForSpeed: true,
        omitBackground: true,
      });
    }
    // const w =
    //   process.stdout.columns - 2 > size ? size : process.stdout.columns - 2;
    // const h = process.stdout.columns - 2 > size ? size : undefined;
    const h = 30;
    const w = 30;

    if (!fs.existsSync(path.join(__dirname, "../../server/gen/comp.png"))) {
      return boxen("\n" + centerAlign("🚧 Generating preview...", width), {
        title: "[ " + chalk.red(`Live Preview`) + " ]",
        titleAlignment: "center",
        width: process.stdout.columns,
        dimBorder: true,
      });
    }

    const img = await terminalImage.file(
      // path.join(__dirname, "../../server/gen/comp.png"),
      path.join(__dirname, "../../assets/logo_48.png"),
      {
        width: w,
        height: h,
      }
    );
    queueStatus("waiting", false);
    if (withoutBox) return "\n"+img;
    return boxen("\n" + centerAlign(img, width), {
      title: "[ " + chalk.red(`Live Preview`) + " ]",
      titleAlignment: "center",
      width: process.stdout.columns,
      dimBorder: true,
    });
  }
}

function getStats(workspace: string) {
  return boxen(
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
  );
}

function startViteServer(
  log: any
): Promise<{ server: ChildProcessWithoutNullStreams; port: number }> {
  return new Promise((res) => {
    const server = spawn(`npm`, ["run", "dev"], {
      cwd: path.join(__dirname, "../../server"),
    });
    server.on("error", (err) => {
      log(err.toString(), "error");
      logUpdate.done();
      console.error(err);
    });
    let hasResolved = false;
    server.stdout.on("data", (data: string) => {
      data = data.toString().trim();
      if (data.trim().length === 0) return;
      data = data.replaceAll("\x1Bc", "");
      if (data.trim() === "") return;

      if (
        data.startsWith("You can now view server in the browser") &&
        !hasResolved
      ) {
        hasResolved = true;
        let str = data
          .replaceAll(" ", "")
          .split(":")[3]!
          .split("\n")[0]!
          .trim();
        const port = parseInt(str);
        res({ server, port });
      }
    });

    server.stderr.on("data", (data) => {
      if (data.includes("DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE"))
        return;
      if (data.includes("DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE"))
        return;
      log(`Server Error: ${data}`, "error");
    });

    server.on("close", (code) => {
      log(`Vite server process exited with code ${code}`);
    });
    server.on("disconnect", () => {
      log(`Server disconnected`);
    });
  });
}

function startBrowser(
  log: any,
  server: ChildProcessWithoutNullStreams,
  port: number
): Promise<Page> {
  return new Promise(async (res) => {
    try {
      log("Starting browser...", "info");
      try {
        var browser = await puppeteer.launch({ headless: true, pipe: false });
      } catch (error) {
        log(`Error launching browser: ${error}`, "error");
        setTimeout(() => {
          server.kill();
          process.exit(1);
        }, 1000);
        return;
      }
      try {
        var page = await browser.newPage();
      } catch (error) {
        log(`Error launching page: ${error}`, "error");
        setTimeout(() => {
          server.kill();
          process.exit(1);
        }, 1000);
        return;
      }

      try {
        await page.goto(`http://localhost:${port}`);
        log("Success!");
      } catch (error) {
        log(
          `Error locating sever localhost at port ${port}; Err: ${JSON.stringify(error)}`,
          "error"
        );
        setTimeout(() => {
          server.kill();
          process.exit(1);
        }, 1000);
        return;
      }
    } catch (error) {
      log(
        `Something went wrong while starting or running the browser: ${error}`,
        "error"
      );
      setTimeout(() => {
        server.kill();
        process.exit(1);
      }, 1000);
      return;
    }
    try {
      await page.setViewport({ width: 800, height: 100 });
    } catch (error) {
      log(`Error setting viewport: ${error}`, "error");
      setTimeout(() => {
        server.kill();
        process.exit(1);
      }, 1000);
      return;
    }

    // const component = (await page.$("#main"))!;

    try {
      await page.screenshot({
        path: "./server/gen/comp.png",
        optimizeForSpeed: true,
        omitBackground: true,
      });
      res(page);
    } catch (error) {
      log(`Error screenshotting component: ${error}`, "error");
      setTimeout(() => {
        server.kill();
        process.exit(1);
      }, 1000);
      return;
    }
  });
}

function splitBox(
  leftStr: string,
  rightStr: string,
  width: number,
  maxHeight: number
) {
  width = Math.floor(width / 2);
  // const highest = [
  //   Math.max(leftStr.split("\n").length, rightStr.split("\n").length),
  // ].map((x) => (x > maxHeight ? maxHeight : x))[0]! + 3;

  const highest = 20;

  const left = boxen(leftStr, {
    width: width,
    height: highest,
  });

  const right = boxen(centerAlign(rightStr, width), {
    width: width,
    height: highest,
  });

  const result: string[] = [];

  for (let index = 0; index < highest; index++) {
    const l = left.split("\n")[index] ?? " ".repeat(width - 2);
    const r = right.split("\n")[index] ?? " ".repeat(width - 2);

    result.push(l + "" + r);
  }

  // const result: string[][] = left.split("\n").map((x) => [x]);
  // right.split("\n").forEach((line, i) => {
  //   const r =
  //     (result[i] ? result[i][0] : " ".repeat(width - 2)) ??
  //     " ".repeat(width - 2);
  //   result[i] = [r, line];
  // });

  let resultStr = result.join("\n");

  resultStr = resultStr.replaceAll("┌", " ");
  resultStr = resultStr.replaceAll("─", " ");
  resultStr = resultStr.replaceAll("┐", " ");
  resultStr = resultStr.replaceAll("└", " ");
  resultStr = resultStr.replaceAll("┘", " ");
  resultStr = resultStr.replaceAll("│", " ");

  return resultStr;
  // return result.join("\n");
}
