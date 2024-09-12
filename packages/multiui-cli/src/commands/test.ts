import boxen from "boxen";
import { centerAlign } from "ansi-center-align";
import chalk from "chalk";
import difflib from "difflib";
import inquirer from "inquirer";
import path, { dirname } from "path";
import terminalImage from "terminal-image";
import { fileURLToPath } from "url";
import stripAnsi from "strip-ansi";
import logUpdate from "log-update";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// export default function test() {
//   const current = ["const a = 1;", "const b = 2;", "const c = 3; const d = 4;"];
//   // console.log(current.join("\n"));
//   // console.log(`\n-----\n`);

//   const New = [
//     "const a = 2;",
//     "const b = 2;",
//     "const c = 3; const d = 4;",
//     "sup",
//     "bro",
//   ];

//   let originalDiff = difflib.ndiff(
//     current, // old
//     New // new
//   );
//   const diff = [...originalDiff];
//   diff.forEach((line, index) => {
//     if (line.startsWith("+")) {
//       diff[index] = chalk.green(line);
//     } else if (line.startsWith("-")) {
//       diff[index] = chalk.red(line);
//     } else if (line.startsWith("?")) {
//       diff[index] = "";
//     } else {
//       diff[index] = chalk.white(line);
//     }
//   });

//   const title_unformatted = `${`test.ts`} ${`v0.2.3`} → ${`v0.3.0`}`;
//   const title = `${chalk.white(`test.ts`)} ${chalk.blue(`v0.2.3`)} ${chalk.magenta(`→`)} ${chalk.green(`v0.3.0`)}`;
//   console.log(`\n————————————————— ${title} —————————————————\n`);
//   console.log(diff.filter((x) => x.trim() !== "").join("\n"));
//   console.log(
//     `\n—————————————————${new Array(title_unformatted.length - 2).fill(`—`).join("")}—————————————————————\n`
//   );

//   //@ts-ignore
//   originalDiff = originalDiff.map((line, index) => {
//     if (line.startsWith("-")) return null;
//     else if (line.startsWith("?")) return null;
//     else if (line.startsWith("+")) return line.replace("+ ", "")
//     else return line.replace("  ", "")
//   });
//   originalDiff = originalDiff.filter((x) => x !== null);
//   console.log(originalDiff.join("\n"));

//   inquirer
//     //@ts-ignore
//     .prompt([
//       {
//         type: "confirm",
//         name: "confirm",
//         message: "Do you want to continue?",
//       },
//     ])
//     .then((answers) => {
//       if (answers.confirm) {
//         console.log("Continuing...");
//         process.exit(0);
//       } else {
//         console.log("Exiting...");
//         process.exit(1);
//       }
//     });
// }

export default async function test() {
  async function getImageBox(width: number=process.stdout.columns - 2) {
    const size = 30;
    const img = await terminalImage.file(
      path.join(__dirname, "../../assets/logo_500.png"),
      {
        width:
          process.stdout.columns - 2 > size ? size : process.stdout.columns - 2,
        height: process.stdout.columns - 2 > size ? size : undefined,
      }
    );
    return boxen("\n" + centerAlign(img, width), {
      title: "[ " + chalk.red(`Live Preview`) + " ]",
      titleAlignment: "center",
      width: process.stdout.columns,
    });
  }
  // console.log(process.stdout.columns);
  let counter = 30;
  let direction = 1;
  setInterval(async () => {
    counter += direction;
    if (counter === process.stdout.columns + 42) direction = -1;
    if (counter === 30) direction = 1;
    const box = await getImageBox(counter);
    logUpdate(box);
  }, 10);
}
