import fs from "fs";
import path from "path";
import { object, string } from "yup";
import * as yup from "yup";
import { getWorkspaces } from "./getWorkspaces.js";
import chalk from "chalk";

let configSchema = object({
  components_output_dir: string().required(),
  framework: string<"react" | "angular" | "svelte">()
    .required()
    .default("react"),
  package_manager: string<"npm" | "yarn" | "pnpm" | "bun">()
    .required()
    .default("npm"),
});

export type Config = yup.InferType<typeof configSchema>;

export const defaultConfig: Config = {
  components_output_dir: "src/components/multiui",
  framework: "react",
  package_manager: "npm",
};

export default async function getMultiUIConfig(
  workspace?: string | undefined
): Promise<Config> {
  return new Promise(async (resolve, reject) => {
    let root_path = process.cwd();
    if (workspace) {
      const workspaces = await getWorkspaces();
      const find = workspaces.find((x) => x.name === workspace);
      if (find) {
        root_path = find.path;
      } else {
        console.log(
          `❌ No config file found for the ${chalk.blue(workspace)} workspace, please run ${chalk.yellow(`multiui init '--workspace=${workspace}'`)} to create one.`
        );
        process.exit(1);
      }
    }

    const configPath = path.join(root_path, "multiui.config.json");
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
      delete config["$schema"];

      const result = configSchema.validateSync(config);
      resolve(result);
    } else {
      console.log(
        "❌ No config file found, please run `multiui init` to create one."
      );
      process.exit(1);
    }
  });
}
