import { AsciiTable3 } from "ascii-table3";
import getMultiUIConfig from "../utils/multiUIConfig.js";

function showConfig() {
  const config = getMultiUIConfig();
  var table = new AsciiTable3("MultiUI CLI Config")
    .setAlignCenter(3)
    .addRowMatrix(Object.entries(config));
  table.setStyle("unicode-single");

  console.log(table.toString());
}

export default showConfig;
