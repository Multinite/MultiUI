import fs from "fs";
import inquirer from "inquirer";
import add from "./add.js";
import logUpdate from "log-update";
import path from "path";
import { defaultConfig } from "../utils/multiUIConfig.js";

function init() {
  const configPath = path.join(process.cwd() + "multiui.config.json");
  if (fs.existsSync(configPath)) {
    console.log(`❌ Config file already exists: ${configPath}`);
    process.exit(1);
  }

  inquirer
    //@ts-ignore
    .prompt([
      {
        type: "list",
        name: "framework",
        message: "What framework do you want to use?",
        choices: ["react", "angular", "svelte"],
        default: "react",
        required: true,
      },
      {
        type: "input",
        name: "components_output_dir",
        message: "What is the output directory for components?",
        default: "src/components/multiui",
        required: true,
      },
      {
        type: "checkbox",
        name: "components",
        message: "Would you like to add some components now?",
        choices: [
          "button",
          "input",
          "checkbox",
          "dropdown",
          "modal",
          "radio",
          "tabs",
          "tooltip",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);

      const default_config = {
        [`$schema`]: "https://multiui.org/multiui.config.schema.json",
        ...defaultConfig,
      };

      fs.writeFileSync(configPath, JSON.stringify(default_config, null, 2));
      console.log(`✅ Config file created: ${configPath}`);

      if (answers.components.length !== 0) {
        console.log(`🛠️ Now installing components...`);
        logUpdate.done();
        add(answers.components, { output: "NULL" });
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log(
          "❌ Prompt couldn't be rendered in the current environment."
        );
        process.exit(1);
      } else {
        // Something else went wrong
        console.log("❌ Something went wrong:");
        console.error(error);
        process.exit(1);
      }
    });
}

export default init;
