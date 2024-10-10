import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTypeScriptFile(filePath: string): Promise<any> {
  try {
    const absolutePath = path.resolve(filePath);
    const fileContent = await fs.readFile(absolutePath, 'utf-8');
    
    // Use esbuild to transpile TypeScript to JavaScript
    const esbuild = await import('esbuild');
    const result = await esbuild.transform(fileContent, {
      loader: 'ts',
      format: 'esm',
      target: 'esnext',
    });

    // Write the transpiled code to a temporary JS file
    const tempJsPath = `${absolutePath}.temp.mjs`;
    await fs.writeFile(tempJsPath, result.code);

    // Create a temporary loader file
    const loaderContent = `
      import { resolve as resolveTs } from 'ts-node/esm'
      import * as tsConfigPaths from 'tsconfig-paths'
      import { pathToFileURL } from 'url'

      const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
      const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)

      export function resolve(specifier, context, defaultResolve) {
        const matched = matchPath(specifier)
        return matched
          ? resolveTs(pathToFileURL(matched).href, context, defaultResolve)
          : resolveTs(specifier, context, defaultResolve)
      }

      export { load, getFormat, transformSource } from 'ts-node/esm'
    `;
    const loaderPath = path.join(__dirname, 'temp-loader.mjs');
    await fs.writeFile(loaderPath, loaderContent);

    // Execute the temporary JS file
    const command = `node --experimental-loader=${pathToFileURL(loaderPath)} ${pathToFileURL(tempJsPath)}`;
    const { stdout, stderr } = await execAsync(command);

    // Clean up the temporary files
    await fs.unlink(tempJsPath);
    await fs.unlink(loaderPath);

    if (stderr) {
      console.error('Execution error:', stderr);
    }

    // Attempt to parse the output as JSON to get the default export
    try {
      return JSON.parse(stdout);
    } catch {
      // If parsing fails, return the raw output
      return stdout.trim();
    }
  } catch (error) {
    console.error(`Error running TypeScript file ${filePath}:`, error);
    throw error;
  }
}

export default runTypeScriptFile;