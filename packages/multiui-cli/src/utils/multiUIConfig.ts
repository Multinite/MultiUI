import fs from "fs";
import path from "path";
import { object, string } from "yup";
import * as yup from "yup";

let configSchema = object({
  components_output_dir: string().required(),
  framework: string<"react" | "angular" | "svelte">()
    .required()
    .default("react"),
});

export type Config = yup.InferType<typeof configSchema>;

export const defaultConfig: Config = {
  components_output_dir: "src/components/multiui",
  framework: "react",
};

export default function getMultiUIConfig(): Config {
  const configPath = path.join(process.cwd() + "multiui.config.json");
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    delete config["$schema"];

    const result = configSchema.validateSync(config);
    return result;
  } else {
    console.log(
      "❌ No config file found, please run `multiui init` to create one."
    );
    process.exit(1);
  }
}
