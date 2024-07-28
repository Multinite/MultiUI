import fs from "fs";
import path from "path";
import { object, string } from "yup";
import * as yup from "yup";

let configSchema = object({
  components_output_dir: string().required(),
});

type Config = yup.InferType<typeof configSchema>;

export default function getMultiUIConfig(): Config {
  const configPath = path.join(process.cwd() + "multiui.config.json");
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    return config;
  } else {
    return {
      components_output_dir: "src/components/multiui",
    };
  }
}
