"use client";
import { type HTMLAttributes, type ReactNode, useRef } from "react";
import { isMobile } from "react-device-detect";
import useSelectify from "use-selectify";
import { cn } from "../utils";

export function BoxSelection({
  $boxSelectionId,
  $boxSelectionOptions = {
    lazyLoad: true,
    activateOnMetaKey: true,
    activateOnKey: undefined,
    autoScroll: true,
    autoScrollEdgeDistance: 100,
    autoScrollStep: 30,
    disableUnselection: false,
    className: undefined,
  },
  children,
  className,
  ...attr
}: {
  $boxSelectionId: string;
  $boxSelectionOptions?: {
    lazyLoad?: boolean;
    disableOnMobile?: boolean;
    activateOnMetaKey?: boolean;
    activateOnKey?: string[];
    autoScroll?: boolean;
    autoScrollEdgeDistance?: number;
    autoScrollStep?: number;
    disableUnselection?: boolean;
    maxSelections?: number | false;
    className?: string;
  };
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">) {
  const boxSelectWrapperEl = useRef(null);
  $boxSelectionOptions = {
    lazyLoad: $boxSelectionOptions.lazyLoad ?? true,
    activateOnMetaKey: $boxSelectionOptions.activateOnMetaKey ?? true,
    activateOnKey: $boxSelectionOptions.activateOnKey ?? undefined,
    autoScroll: $boxSelectionOptions.autoScroll ?? true,
    autoScrollEdgeDistance: $boxSelectionOptions.autoScrollEdgeDistance ?? 100,
    autoScrollStep: $boxSelectionOptions.autoScrollStep ?? 30,
    disableUnselection: $boxSelectionOptions.disableUnselection ?? false,
    className: $boxSelectionOptions.className ?? undefined,
  };

  // console.log(
  //   "If I am: ",
  //   themeId,
  //   ` than, these are excluded: `,
  //   typeof document === "undefined"
  //     ? []
  //     : [
  //         ...Array.from(document.querySelectorAll(`[data-theme]`))
  //           .filter((x) => x.getAttribute("data-theme-id") !== themeId)
  //           .filter((x) => !element.current!.closest(`#${x.id}`)),
  //       ]
  // );

  // const [isDragging, setIsDragging] = useState(false);
  // useEffect(() => {
  //   if (element.current!.id.includes("sup1")) {
  //     setIsDragging(true);
  //   }
  // }, []);
  // console.log(
  //   "If I am: ",
  //   themeId,
  //   ` than, these are excluded: `,
  //   typeof document === "undefined"
  //     ? []
  //     : Array.from(document.querySelectorAll(`[data-theme]`))
  //         .filter((x) => x.getAttribute("data-theme-id") !== themeId)
  //         .filter((x) => !x.querySelector(`[data-theme-id="${themeId}"]`))
  //         .map((x) => x.parentElement)
  // );

  const { SelectBoxOutlet } = useSelectify(boxSelectWrapperEl, {
    selectCriteria: `[data-box-select-id="${$boxSelectionId}"][data-selectable=true], [data-box-select-id="${$boxSelectionId}"][data-selectable="${$boxSelectionId}"]`,
    onSelect: (element) => {
      element.setAttribute("aria-selected", "true");
      element.setAttribute("data-selected-by-id", $boxSelectionId ?? "none");
      console.log(`selected el:`, element);
    },
    onUnselect: (element) => {
      element.removeAttribute("aria-selected");
      element.removeAttribute("data-selected-theme");
      element.removeAttribute("data-selected-theme-id");
    },

    // exclusionZone:
    //   typeof document === "undefined"
    //     ? []
    //     : [
    //         ...Array.from(document.querySelectorAll(`[data-theme]`))
    //           .filter((x) => x.getAttribute("data-theme-id") !== themeId)
    //           .filter((x) => !element.current!.closest(`#${x.id}`)),
    //       ],
    // .filter((x) => !x.querySelector(`[data-theme-id="${themeId}"]`))
    // .map((x) => x.parentElement!), ...Array.from(document.querySelectorAll(`[data-exclsion-zone]`))],
    lazyLoad: $boxSelectionOptions.lazyLoad,
    activateOnMetaKey: $boxSelectionOptions.activateOnMetaKey,
    disabled: $boxSelectionOptions.disableOnMobile && isMobile,
    activateOnKey: $boxSelectionOptions.activateOnKey,
    autoScroll: $boxSelectionOptions.autoScroll,
    autoScrollEdgeDistance: $boxSelectionOptions.autoScrollEdgeDistance,
    autoScrollStep: $boxSelectionOptions.autoScrollStep,
    disableUnselection: $boxSelectionOptions.disableUnselection,
    maxSelections: $boxSelectionOptions.maxSelections,
  });

  return (
    <div
      data-box-selection
      data-box-selection-id={$boxSelectionId}
      ref={boxSelectWrapperEl}
      {...attr}
      className={cn(`relative`, className)}
    >
      <SelectBoxOutlet
        className={cn(
          "bg-primary/20 border border-primary",
          $boxSelectionOptions.className
        )}
      />
      {children}
    </div>
  );
}