export function multiUIConfigCreator({ components_output_dir = "/src/components/multiui", framework = "react", package_manager = "npm", theme_names = ["default"], theme_prefix = "multiui", ...rest }) {
    return {
        components_output_dir,
        framework,
        package_manager,
        theme_names: theme_names
            ? theme_names
                .filter((x) => x.trim().length !== 0)
                .map((x) => x?.replaceAll(" ", "-"))
            : [],
        theme_prefix,
        ...rest,
    };
}
//# sourceMappingURL=MultiUIConfig.js.map