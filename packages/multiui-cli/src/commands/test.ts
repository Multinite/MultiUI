import chalk from "chalk";
import difflib from "difflib";
import inquirer from "inquirer";

export default function test() {
  const current = ["const a = 1;", "const b = 2;", "const c = 3; const d = 4;"];
  // console.log(current.join("\n"));
  // console.log(`\n-----\n`);

  const New = [
    "const a = 2;",
    "const b = 2;",
    "const c = 3; const d = 4;",
    "sup",
    "bro",
  ];

  let originalDiff = difflib.ndiff(
    current, // old
    New // new
  );
  const diff = [...originalDiff];
  diff.forEach((line, index) => {
    if (line.startsWith("+")) {
      diff[index] = chalk.green(line);
    } else if (line.startsWith("-")) {
      diff[index] = chalk.red(line);
    } else if (line.startsWith("?")) {
      diff[index] = "";
    } else {
      diff[index] = chalk.white(line);
    }
  });

  const title_unformatted = `${`test.ts`} ${`v0.2.3`} → ${`v0.3.0`}`;
  const title = `${chalk.white(`test.ts`)} ${chalk.blue(`v0.2.3`)} ${chalk.magenta(`→`)} ${chalk.green(`v0.3.0`)}`;
  console.log(`\n————————————————— ${title} —————————————————\n`);
  console.log(diff.filter((x) => x.trim() !== "").join("\n"));
  console.log(
    `\n—————————————————${new Array(title_unformatted.length - 2).fill(`—`).join("")}—————————————————————\n`
  );

  // console.log(`\n-----\n`);
  // originalDiff.forEach((line, index) => {
  //   if (line.startsWith("-")) return;
  //   else if (line.startsWith("?")) return;«
  //   else if (line.startsWith("+")) console.log(line.replace("+ ", ""));
  //   else console.log(line.replace("  ", ""));
  // });

  inquirer
    //@ts-ignore
    .prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Do you want to continue?",
      },
    ])
    .then((answers) => {
      if (answers.confirm) {
        console.log("Continuing...");
        process.exit(0);
      } else {
        console.log("Exiting...");
        process.exit(1);
      }
    });
}
