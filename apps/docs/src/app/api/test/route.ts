import { NextResponse } from "next/server";
import { default_theme } from "../../test/themes";

export async function GET() {
  console.log("hit");
  return NextResponse.json({...default_theme, primary: {...default_theme.primary, DEFAULT: "346, 87.6%, 52.5%"}});
}
