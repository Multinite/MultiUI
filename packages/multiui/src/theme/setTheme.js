import { getThemeFormatted } from "./Theme";
import { getColorSchemeSync } from "./useColorScheme";
export function setThemeToUI({ theme, themeId, }) {
    theme = Array.isArray(theme)
        ? getColorSchemeSync() === "light"
            ? theme[1]
            : theme[0]
        : theme;
    const oldTheme = globalThis.multiUI.themes[themeId];
    globalThis.multiUI.themes[themeId] = [theme, theme];
    const defineThemeStylesInline = globalThis.multiUI.defineThemeStylesInline[themeId];
    if (defineThemeStylesInline) {
        const wrapperEl = document.querySelector(`[data-theme-id="${themeId}"]`);
        if (!wrapperEl)
            throw new Error(`Failed to setTheme, no <div> element found representing the "${themeId}" themeId.`);
        removeCSSVariables(wrapperEl);
        const styleObj = getThemeFormatted({
            theme,
            outputType: "inline-style-object",
        });
        wrapperEl.style.cssText = Object.entries(styleObj)
            .map(([key, value]) => {
            return `${key}: ${value};`;
        })
            .join("");
    }
    else {
        const styleEl = document.querySelector(`[data-style-theme-id="${themeId}"]`);
        const wrapperEl = document.querySelector(`[data-theme-id="${themeId}"]`);
        if (!styleEl)
            throw new Error(`Failed to setTheme, no <style> element found representing the "${themeId}" themeId.`);
        if (!wrapperEl)
            throw new Error(`Failed to setTheme, no wrapper element found representing the "${themeId}" themeId.`);
        styleEl.innerHTML = getThemeFormatted({
            theme,
            outputType: "style-element",
        });
        wrapperEl.classList.remove(`${oldTheme[0].name}_theme`);
        wrapperEl.classList.remove(`${oldTheme[1].name}_theme`);
        wrapperEl.classList.add(`${theme.name}_theme`);
    }
}
function removeCSSVariables(element) {
    const style = element.style;
    for (let i = style.length - 1; i >= 0; i--) {
        const prop = style[i];
        if (prop.startsWith("--")) {
            style.removeProperty(prop);
        }
    }
}
//# sourceMappingURL=setTheme.js.map