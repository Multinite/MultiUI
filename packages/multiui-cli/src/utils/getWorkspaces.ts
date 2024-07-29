import { exec } from "child_process";

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
