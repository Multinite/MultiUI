import { multiUIConfigCreator } from "@multinite_official/multiui";

export const multiUIConfig = multiUIConfigCreator({
  components_output_dir: "/src/components/multiui",
  framework: "react",
  package_manager: "pnpm",
  theme_names: ["multiui_default", "sup", "", ' cool'],
  theme_prefix: "multiui",
});
