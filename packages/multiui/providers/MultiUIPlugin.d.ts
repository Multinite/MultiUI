import type { MultiUIConfig } from "./../types/MultiUIConfig";
export declare const MultiUIPlugin: (multiUIConfig: MultiUIConfig & {
    $schema?: string;
}) => {
    handler: import("tailwindcss/types/config").PluginCreator;
    config?: Partial<import("tailwindcss/types/config").Config>;
};
//# sourceMappingURL=MultiUIPlugin.d.ts.map