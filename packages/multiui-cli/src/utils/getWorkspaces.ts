import { exec } from "child_process";
import fs from "fs";
import path from "path";

export function getWorkspaces(): Promise<{ name: string; path: string }[]> {
  return new Promise((resolve, reject) => {
    exec("npm query .workspace", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      try {
        let workspaces_res = JSON.parse(stdout);
        const workspaces: { name: string; path: string }[] = workspaces_res.map(
          (x) => ({ name: x.name, path: x.path })
        );
        resolve(workspaces);
      } catch (parseError) {
        reject(`Failed to parse JSON: ${parseError}`);
      }
    });
  });
}

function findPackageJson(startDir) {
  let currentDir = startDir;
  while (currentDir !== path.parse(currentDir).root) {
    const packageJsonPath = path.join(currentDir, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      return packageJsonPath;
    }
    currentDir = path.dirname(currentDir);
  }
  return null;
}

export function getWorkspaceName() {
  const packageJsonPath = findPackageJson(process.cwd());
  if (!packageJsonPath) {
    console.warn(
      "No package.json found in current directory or any parent directories."
    );
    return null;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    return packageJson.name;
  } catch (error) {
    console.error("Error reading package.json:", error);
    return null;
  }
}
