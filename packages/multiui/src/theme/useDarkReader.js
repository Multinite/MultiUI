"use client";
import { useEffect } from "react";
/**
 * Allows you to enable or disable the `dark-reader` extension.
 *
 *
 * @see Dark-reader {@link https://darkreader.org/}
 * @see MultiUI disable dark reader documentation {@link https://multiui.org/docs/dark-reader}
 */
export function useDarkReader(enableDarkReader) {
    useEffect(() => {
        if (typeof document != "undefined") {
            // client only.
            if (enableDarkReader) {
                const findDarkReaderDisableMeta = document.querySelector(`metap[name="darkreader-lock"]`);
                if (findDarkReaderDisableMeta) {
                    findDarkReaderDisableMeta.remove();
                }
            }
            else {
                const findDarkReaderDisableMeta = document.querySelector(`metap[name="darkreader-lock"]`);
                if (!findDarkReaderDisableMeta) {
                    const meta = document.createElement("meta");
                    meta.name = "darkreader-lock";
                    document.head.appendChild(meta);
                }
            }
        }
    }, [enableDarkReader]);
    return null;
}
//# sourceMappingURL=useDarkReader.js.map