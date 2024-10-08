import plugin from "tailwindcss/plugin";
import type { MultiUIConfig } from "../types/MultiUIConfig.js";
import { formatTheme } from "./utils/formatTheme.js";
import type { KeyValuePair } from "tailwindcss/types/config.js";

type MatchVariant = <T = string>(
  name: string,
  cb: (
    value: T | string,
    extra: {
      modifier: string | null;
    }
  ) => string | string[],
  options?: {
    values?: KeyValuePair<string, T>;
    sort?(
      a: {
        value: T | string;
        modifier: string | null;
      },
      b: {
        value: T | string;
        modifier: string | null;
      }
    ): number;
  }
) => void;

type AddVariant = (
  name: string,
  definition: string | string[] | (() => string) | (() => string)[]
) => void;

export const MultiUIPlugin = function (
  multiUIConfig: MultiUIConfig & { $schema?: string }
) {
  const prefix = (multiUIConfig.theme_prefix || "multiui") as "multiui";

  return plugin(function ({
    addUtilities,
    addComponents,
    addBase,
    e,
    config,
    addVariant,
    matchVariant,
  }) {
    const { utils } = formatTheme(prefix, e);

    addUtilities(utils);
    addThemeClasses({ addVariant, matchVariant, multiUIConfig });
    addBoxSelectClasses({ addVariant, matchVariant });
  });
};

function addThemeClasses({
  addVariant,
  matchVariant,
  multiUIConfig,
}: {
  multiUIConfig: MultiUIConfig;
  addVariant: AddVariant;
  matchVariant: MatchVariant;
}) {
  multiUIConfig.theme_names.forEach((themeName) => {
    themeName = themeName
      .replaceAll(" ", "-")
      .replaceAll('"', "")
      .replaceAll("'", "");
    addVariant(`theme-${themeName}`, `[data-theme="${themeName}"] &`);
    addVariant(
      `box-select-via-${themeName}`,
      `&[data-selected-theme="${themeName}"]`
    );
  });
  matchVariant("theme", (themeName) => {
    themeName = themeName
      .replaceAll(" ", "-")
      .replaceAll('"', "")
      .replaceAll("'", "");
    return `[data-theme="${themeName}"] &`;
  });
  addVariant("themed", "[data-theme] &");
}

function addBoxSelectClasses({
  addVariant,
  matchVariant,
}: {
  addVariant: AddVariant;
  matchVariant: MatchVariant;
}) {
  addVariant("box-select", "&[aria-selected]");
  matchVariant("box-select-by-name", (themeName) => {
    themeName = themeName.replaceAll('"', "").replaceAll("'", "");
    return `&[data-selected-theme="${themeName}"]`;
  });
  matchVariant("box-select-by-id", (themeName) => {
    themeName = themeName.replaceAll('"', "").replaceAll("'", "");
    return `&[data-selected-theme-id="${themeName}"]`;
  });
}
