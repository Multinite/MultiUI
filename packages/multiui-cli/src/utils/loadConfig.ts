import { pathToFileURL } from "url";
import * as path from "path";
import * as fs from "fs";
import { createRequire } from "module";
import chalk from "chalk";

const require = createRequire(import.meta.url);

async function loadConfig(
  configPath: string,
  verboseLogs: boolean
): Promise<any> {
  try {
    const absolutePath = path.resolve(configPath);
    const fileExtension = path.extname(absolutePath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Config file not found: ${absolutePath}`);
    }

    if (fileExtension === ".ts") {
      if (verboseLogs) console.log(`✅ found ts config file, transpiling...`);
      const startTime = Date.now();
      // Use esbuild to transpile TypeScript
      const esbuild = require("esbuild");
      try {
        var tsContent = await fs.promises.readFile(absolutePath, "utf8");
      } catch (error) {
        console.error(
          `❌ Error reading config file: ${absolutePath}. Error: `,
          error
        );
        throw error;
      }
      try {
        var result = await esbuild.build({
          stdin: {
            contents: tsContent,
            loader: "ts",
            resolveDir: path.dirname(absolutePath),
          },
          write: false,
          format: "esm",
          target: "esnext",
          bundle: true,
          external: ["@multinite_official/*"],
          platform: "node",
        });
      } catch (error) {
        console.error(
          `❌ Error building config file: ${absolutePath}. Error: `,
          error
        );
        throw error;
      }

      // Write the bundled content to a temporary .mjs file
      const tempJsPath = `${absolutePath}.temp.mjs`;
      try {
        await fs.promises.writeFile(tempJsPath, result.outputFiles[0].text);
      } catch (error) {
        console.error(
          `❌ Error writing temp file: ${tempJsPath}. Error: `,
          error
        );
        throw error;
      }

      // Import the temporary file
      try {
        var configModule = await import(pathToFileURL(tempJsPath).href);

        const endTime = Date.now();
        if (verboseLogs)
          console.log(`✅ Ran config file, took ${endTime - startTime}ms.`);
      } catch (error) {
        console.error(
          `❌ Error importing file: ${tempJsPath}.\nError: `,
          error
        );
        await cleanupOnError(tempJsPath);
        throw error;
      }

      // Clean up the temporary file
      try {
        await fs.promises.unlink(tempJsPath);
      } catch (error) {
        console.error(`❌ Error cleaning up temp file: ${tempJsPath}`);
        throw error;
      }

      return configModule.default || configModule;
    } else {
      const startTime = Date.now();
      if (verboseLogs) console.log(`✅ found js config file, running...`);
      // For .js files, import directly
      const configModule = await import(pathToFileURL(absolutePath).href);
      const endTime = Date.now();
      console.log(`✅ Ran js config file, took ${endTime - startTime}ms.`);
      return configModule.default || configModule;
    }
  } catch (error) {
    console.error(`❌ Error loading config file ${configPath}:`, error);
    throw error;
  }
}

export default loadConfig;

async function cleanupOnError(tempJsPath: string) {
  console.log();
  console.log(chalk.gray(`𝐢 Cleaning up temp file: ${tempJsPath}`));
  try {
    await fs.promises.unlink(tempJsPath);
    console.log(chalk.gray(`✓ Cleaned up temp file.`));
    console.log();
  } catch (error) {
    console.error(`❌ Error cleaning up temp file: ${tempJsPath}`);
    console.log();
    throw error;
  }
}
