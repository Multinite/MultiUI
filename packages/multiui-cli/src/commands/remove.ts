import chalk from "chalk";
import path from "path";
import fs from "fs";
import { getWorkspaces } from "../utils/getWorkspaces.js";
import logUpdate from "log-update";

export default async function remove(
  componentNames: string[],
  options: { workspace: string | undefined }
) {
  let workspace_path = path.resolve(process.cwd());

  if (options.workspace) {
    const workspaces = await getWorkspaces();

    if (workspaces.find((x) => x.name === options.workspace)) {
      const workspacePath = workspaces.find(
        (x) => x.name === options.workspace
      )!.path;
      workspace_path = path.resolve(workspacePath);
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
  console.log(`🔎 Processing ${chalk.blue(componentNames.join(", "))}...\n`);
  logUpdate.done();

  componentNames.forEach((name) => {
    logUpdate(`- Removing ${chalk.blue(name)}...`);
    try {
      if (fs.lstatSync(path.join(workspace_path, name)).isDirectory()) {
        console.log(
          chalk.red(`❌ Component ${chalk.blue(name)} is not installed.`)
        );
        return process.exit(1);
      }
      try {
        fs.rmSync(path.join(workspace_path, name), {
          recursive: true,
        });
        logUpdate(`✅ ${chalk.blue(name)} removed successfully.`);
        logUpdate.done();
      } catch (error) {
        logUpdate(`❌ ${chalk.blue(name)} could not be removed.`);
        logUpdate.done();
        console.log(chalk.gray(`path: ${path.join(workspace_path, name)}`));
        throw error;
        process.exit(1);
      }
    } catch (error: any) {
      logUpdate(`❌ ${chalk.blue(name)} could not be removed.`);
      logUpdate.done();
      console.log(chalk.gray(`path: ${path.join(workspace_path, name)}`));
      process.exit(1);
    }
  });
}
