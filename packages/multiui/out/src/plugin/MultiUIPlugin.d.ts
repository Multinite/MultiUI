import type { MultiUIConfig, ThemeT } from "../types/MultiUIConfig.js";
export declare const MultiUIPlugin: (multiUIConfig: MultiUIConfig, exampleTheme?: ThemeT) => {
    handler: import("tailwindcss/types/config.js").PluginCreator;
    config?: Partial<import("tailwindcss/types/config.js").Config>;
};
