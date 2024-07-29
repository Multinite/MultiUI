import { AsciiTable3 } from "ascii-table3";
import getMultiUIConfig from "../utils/multiUIConfig.js";

async function showConfig({ workspace }: { workspace: string | undefined }) {
  const config = await getMultiUIConfig(workspace);
  var table = new AsciiTable3("MultiUI CLI Config for " + workspace)
    .setAlignCenter(3)
    .addRowMatrix(Object.entries(config));
  table.setStyle("unicode-single");

  console.log(table.toString());
}

export default showConfig;
