"use client";
import {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { MultiUIConfig, ThemeType } from "../types/MultiUIConfig.js";
import { useSelectify } from "use-selectify";
import { isMobile } from "react-device-detect";



const default_ThemeType: ThemeType = {
  name: "multiui_default",
  primary: {
    50: "272, 93%, 95%",
    100: "268, 91%, 91%",
    200: "266, 94%, 82%",
    300: "264, 89%, 72%",
    400: "262, 84%, 64%",
    500: "260, 80%, 52%",
    600: "258, 78%, 43%",
    700: "256, 82%, 35%",
    800: "254, 86%, 28%",
    900: "252, 90%, 23%",
    DEFAULT: "266, 100%, 59%",
  },
  secondary: {
    DEFAULT: "212.01999999999998 100% 46.67%",
    50: "212.01999999999998 100% 46.67%",
    100: "211.84000000000003 100% 19.22%",
    200: "212.24 100% 28.82%",
    300: "212.14 100% 38.43%",
    400: "212.01999999999998 100% 46.67%",
    500: "212.14 92.45% 58.43%",
    600: "212.24 92.45% 68.82%",
    700: "211.84000000000003 92.45% 79.22%",
    800: "211.84000000000003 92.45% 89.61%",
    900: "212.5 92.31% 94.9%",
  },
  background: {
    50: "0, 0%, 37%",
    100: "0, 0%, 45%",
    200: "0, 0%, 37%",
    300: "0, 0%, 29%",
    400: "0, 0%, 21%",
    500: "0, 0%, 14%",
    600: "0, 0%, 12%",
    700: "0, 0%, 9%",
    800: "0, 0%, 7%",
    900: "0, 0%, 5%",
    DEFAULT: "0, 0%, 14%",
  },
  foreground: {
    DEFAULT: "210 5.56% 92.94%",
    50: "240 5.88% 10%",
    100: "240 3.7% 15.88%",
    200: "240 5.26% 26.08%",
    300: "240 5.2% 33.92%",
    400: "240 3.83% 46.08%",
    500: "240 5.03% 64.9%",
    600: "240 4.88% 83.92%",
    700: "240 5.88% 90%",
    800: "240 4.76% 95.88%",
    900: "0 0% 98.04%",
  },

  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
  danger: {
    DEFAULT: "339.20000000000005 90.36% 51.18%",
    50: "340 84.91% 10.39%",
    100: "339.3299999999999 86.54% 20.39%",
    200: "339.11 85.99% 30.78%",
    300: "339 86.54% 40.78%",
    400: "339.20000000000005 90.36% 51.18%",
    500: "339 90% 60.78%",
    600: "339.11 90.6% 70.78%",
    700: "339.3299999999999 90% 80.39%",
    800: "340 91.84% 90.39%",
    900: "339.13 92% 95.1%",
    foreground: "0 0% 100%",
  },
  default: {
    DEFAULT: "240 5.26% 26.08%",
    50: "240 5.88% 10%",
    100: "240 3.7% 15.88%",
    200: "240 5.26% 26.08%",
    300: "240 5.2% 33.92%",
    400: "240 3.83% 46.08%",
    500: "240 5.03% 64.9%",
    600: "240 4.88% 83.92%",
    700: "240 5.88% 90%",
    800: "240 4.76% 95.88%",
    900: "0 0% 98.04%",
  },
  info: {
    DEFAULT: "145 71.96% 92.94%",
    50: "145 71.96% 92.94%",
    100: "145 71.96% 92.94%",
    200: "145 71.96% 92.94%",
    300: "145 71.96% 92.94%",
    400: "145 71.96% 92.94%",
    500: "145 71.96% 92.94%",
    600: "145 71.96% 92.94%",
    700: "145 71.96% 92.94%",
    800: "145 71.96% 92.94%",
    900: "145 71.96% 92.94%",
    foreground: "0 0% 100%",
  },
  warning: {
    DEFAULT: "37.02999999999997 91.27% 55.1%",
    50: "37.139999999999986 75% 10.98%",
    100: "37.139999999999986 75% 21.96%",
    200: "36.95999999999998 73.96% 33.14%",
    300: "37.00999999999999 74.22% 44.12%",
    400: "37.02999999999997 91.27% 55.1%",
    500: "37.00999999999999 91.26% 64.12%",
    600: "36.95999999999998 91.24% 73.14%",
    700: "37.139999999999986 91.3% 81.96%",
    800: "37.139999999999986 91.3% 90.98%",
    900: "54.55000000000001 91.67% 95.29%",
    foreground: "0 0% 100%",
  },
  scheme: "dark",
  success: {
    DEFAULT: "145.96000000000004 79.46% 43.92%",
    50: "145.71000000000004 77.78% 8.82%",
    100: "146.2 79.78% 17.45%",
    200: "145.78999999999996 79.26% 26.47%",
    300: "146.01 79.89% 35.1%",
    400: "145.96000000000004 79.46% 43.92%",
    500: "146.01 62.45% 55.1%",
    600: "145.78999999999996 62.57% 66.47%",
    700: "146.2 61.74% 77.45%",
    800: "145.96000000000004 61.4% 88.82%",
    900: "146.66999999999996 64.29% 94.51%",
    foreground: "0 0% 100%",
  },
  content1: {
    DEFAULT: "240 5.88% 10%",
    foreground: "0 0% 98.04%",
  },
  content2: {
    DEFAULT: "240 3.7% 15.88%",
    foreground: "240 4.76% 95.88%",
  },
  content3: {
    DEFAULT: "240 5.26% 26.08%",
    foreground: "240 5.88% 90%",
  },
  content4: {
    DEFAULT: "240 5.2% 33.92%",
    foreground: "240 4.88% 83.92%",
  },
  [`text-size`]: {
    [`extra-small`]: "0.75rem",
    [`small`]: "0.875rem",
    [`medium`]: "1rem",
    [`large`]: "1.125rem",
    [`extra-large`]: "1.25rem",
    [`extra-extra-large`]: "1.5rem",
  },
  focus: `212.01999999999998 100% 46.67%`,
};

/**
 *
 * @example
 *
 * ```tsx
 * <MultiUIProvider config={MultiUIProviderProps(multiui_config)}>
 *   <App />
 * </MultiUIProvider>
 * ```
 *
 * @param props Use the `MultiUIProviderProps` function to pass props to this component.
 * @returns
 */
export const MultiUIProvider = memo(function ({
  config = {},
  children,
  blurOnThemeTypeChange = false,
  enableBoxSelection = false,
  ThemeTypes = [],
  boxSelectionOptions = {
    activateOnKey: undefined,
    activateOnMetaKey: true,
    disableOnMobile: true,
    lazyLoad: true,
    autoScroll: true,
    autoScrollEdgeDistance: 100,
    autoScrollStep: 30,
    disableUnselection: false,
    maxSelections: false,
  },
}: {
  /*
   * The default ThemeTypes to use.
   */
  ThemeTypes?: ThemeType[];
  config?: {
    ThemeType_prefix?: MultiUIConfig["theme_prefix"];
  };
  /**
   * Apply a blur effect to the page when the ThemeType changes.
   * @default false
   */
  blurOnThemeTypeChange?: boolean;
  /**
   * Enable box selection support.
   * We recommend supporting this feature, as it allows users to have another layer of control over interactions on components.
   *
   * @default false
   * @see {@link https://multiui.org/docs/box-selection}
   */
  enableBoxSelection?: boolean;
  /**
   * Options for box selection.
   * @see {@link https://multiui.org/docs/box-selection}
   */
  boxSelectionOptions?: {
    /**
     * Enable lazy loading of the box selection feature.
     *
     * @default true
     */
    lazyLoad?: boolean;
    /**
     * Disable box selection on mobile devices.
     *
     * @deafult true
     */
    disableOnMobile?: boolean;
    /**
     * Only enables the selection box if the user was pressing a meta key while initiating the drag. Included meta keys are: Shift, Ctrl, Cmd and Alt.
     * @default true
     */
    activateOnMetaKey?: boolean;
    /**
     * Only enables the selection box if the user was pressing a specified key while initiating the drag.
     *
     * @default undefined
     */
    activateOnKey?: string[];
    /**
     * Automatically try to scroll the window when the pointer approaches the viewport edge while dragging.
     *
     * @default true
     */
    autoScroll?: boolean;
    /**
     * Distance in px from the viewport's edges from which the box will try scrolling the window when the pointer approaches the viewport edge while dragging.
     * @default 100
     */
    autoScrollEdgeDistance?: number;
    /**
     * Auto scroll speed.
     * @default 30
     */
    autoScrollStep?: number;
    /**
     * Will keep every item selected after selection. Can be cleared with clearSelection()
     * @default false
     */
    disableUnselection?: boolean;
    /**
     * Maximum number of elements that can be selected. Will stop selecting after reaching that number and keep already selected elements. false = Infinite
     * @default Infinity
     */
    maxSelections?: number | false;
  };
  children: React.ReactNode;
}) {
  const ThemeTypes_ = useRef<ThemeType[]>(ThemeTypes);
  const currentThemeType = useRef<string | undefined>(
    ThemeTypes.length > 0 ? ThemeTypes[0].name : undefined
  );
  const ThemeType_prefix = (config.ThemeType_prefix || "multiui") as "multiui";
  const subscribers = useRef<Parameters<MultiUIProvider["onThemeTypeChange"]>[0][]>(
    []
  );

  // const [isDuringThemeTypeChange, $isDuringThemeTypeChange] = useState(false);
  const isDuringThemeTypeChangeTimeout = useRef<ReturnType<typeof setTimeout>>();
  // const [blurOnThemeTypeChange_, setBlurOnThemeTypeChange] = useState<boolean>(
  //   blurOnThemeTypeChange ?? false
  // );
  const selectionContainerRef = useRef<HTMLDivElement>(null);
  const { SelectBoxOutlet } = useSelectify(selectionContainerRef, {
    selectCriteria: ".selectable",
    onSelect: (element) => {
      element.setAttribute("aria-selected", "true");
    },
    onUnselect: (element) => {
      element.removeAttribute("aria-selected");
    },
    lazyLoad: boxSelectionOptions.lazyLoad,
    activateOnMetaKey: boxSelectionOptions.activateOnMetaKey,
    disabled: boxSelectionOptions.disableOnMobile && isMobile,
    activateOnKey: boxSelectionOptions.activateOnKey,
    autoScroll: boxSelectionOptions.autoScroll,
    autoScrollEdgeDistance: boxSelectionOptions.autoScrollEdgeDistance,
    autoScrollStep: boxSelectionOptions.autoScrollStep,
    disableUnselection: boxSelectionOptions.disableUnselection,
    maxSelections: boxSelectionOptions.maxSelections,
  });

  const ThemeTypeStyles = useMemo(() => {
    return ThemeTypes_.current.find((x) => x.name === currentThemeType.current);
  }, [currentThemeType.current, ThemeTypes_.current]);

  const ThemeTypeInCSS = useMemo(() => {
    const ThemeType = ThemeTypeStyles;
    if (ThemeType === undefined) return {};
    function colorValues(color: string) {
      if (ThemeType === undefined) return {};
      return {
        //@ts-ignore
        [`--${ThemeType_prefix}-${color}`]: ThemeType[color].DEFAULT,
        //@ts-ignore
        [`--${ThemeType_prefix}-${color}-100`]: ThemeType[color][100],
        //@ts-ignore
        [`--${ThemeType_prefix}-${color}-200`]: ThemeType[color][200],
        //@ts-ignore
        [`--${ThemeType_prefix}-${color}-300`]: ThemeType[color][300],
        //@ts-ignore
        [`--${ThemeType_prefix}-${color}-400`]: ThemeType[color][400],
        //@ts-ignore
        [`--${ThemeType_prefix}-${color}-500`]: ThemeType[color][500],
        //@ts-ignore
        [`--${ThemeType_prefix}-${color}-600`]: ThemeType[color][600],
        //@ts-ignore
        [`--${ThemeType_prefix}-${color}-700`]: ThemeType[color][700],
        //@ts-ignore
        [`--${ThemeType_prefix}-${color}-800`]: ThemeType[color][800],
        //@ts-ignore
        [`--${ThemeType_prefix}-${color}-900`]: ThemeType[color][900],
      };
    }

    function getThemeTypeValue(keys: string[]) {
      if (ThemeType === undefined) return {};
      let val = ThemeType;
      for (let i = 0; i < keys.length; i++) {
        //@ts-ignore
        val = val[keys[i]!];
      }
      return val;
    }

    const bg = colorValues("background");
    const fg = colorValues("foreground");
    const primary = colorValues("primary");
    const secondary = colorValues("secondary");
    const default_ = colorValues("default");
    const content = {
      [`--${ThemeType_prefix}-content1`]: ThemeType.content1.DEFAULT,
      [`--${ThemeType_prefix}-content2-foreground`]: ThemeType.content2.foreground,
      [`--${ThemeType_prefix}-content2`]: ThemeType.content1.DEFAULT,
      [`--${ThemeType_prefix}-content3-foreground`]: ThemeType.content3.foreground,
      [`--${ThemeType_prefix}-content3`]: ThemeType.content3.DEFAULT,
      [`--${ThemeType_prefix}-content4-foreground`]: ThemeType.content4.foreground,
      [`--${ThemeType_prefix}-content4`]: ThemeType.content4.DEFAULT,
    };

    const other = {
      [`--${ThemeType_prefix}-text-size-extra-small`]: getThemeTypeValue([
        "text-size",
        "extra-small",
      ]),
      [`--${ThemeType_prefix}-text-size-small`]: getThemeTypeValue([
        "text-size",
        "small",
      ]),
      [`--${ThemeType_prefix}-text-size-medium`]: getThemeTypeValue([
        "text-size",
        "medium",
      ]),
      [`--${ThemeType_prefix}-text-size-large`]: getThemeTypeValue([
        "text-size",
        "large",
      ]),
      [`--${ThemeType_prefix}-text-size-extra-large`]: getThemeTypeValue([
        "text-size",
        "extra-large",
      ]),
      [`--${ThemeType_prefix}-text-size-extra-extra-large`]: getThemeTypeValue([
        "text-size",
        "extra-extra-large",
      ]),
      [`--${ThemeType_prefix}-focus`]: getThemeTypeValue(["focus"]),
    };

    const style = {
      [`/* MultiUI ThemeType`]: "*/",
      [`--${ThemeType_prefix}-ThemeType`]: `"${currentThemeType.current}"`,
      [`--${ThemeType_prefix}-scheme`]: `${ThemeType.scheme}`,
      [`/* Background Values`]: "*/",
      ...bg,
      [`/* Foreground Values`]: "*/",
      ...fg,
      [`/* Primary Values`]: "*/",
      ...primary,
      [`/* Secondary Values`]: "*/",
      ...secondary,
      [`/* Default Values`]: "*/",
      ...default_,
      [`/* Content Values`]: "*/",
      ...content,
      [`/* Other Values`]: "*/",
      ...other,
    };
    return style;
  }, [ThemeType_prefix, ThemeTypeStyles]);

  const isRan = useRef(false);
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isRan.current) {
      isRan.current = true;
      document.documentElement.classList.add("ThemeType");
      document.documentElement.style.colorScheme = `var(--${ThemeType_prefix}-scheme)`;
      return;
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-ThemeType", currentThemeType.current!);
    subscribers.current.forEach((x) => x(currentThemeType.current, ThemeTypeStyles));
    // $isDuringThemeTypeChange(true);
    // clearTimeout(isDuringThemeTypeChangeTimeout.current);
    // isDuringThemeTypeChangeTimeout.current = setTimeout(() => {
    // $isDuringThemeTypeChange(false);
    // }, 300);
  }, [currentThemeType.current]);

  useEffect(() => {
    if (typeof window === "object" && Object.keys(ThemeTypeInCSS).length > 0) {
      const existing_style_el = document.getElementById("multiui-ThemeType");
      if (!existing_style_el) {
        const style = document.createElement("style");
        style.id = "multiui-ThemeType";
        style.innerHTML =
          `.ThemeType {\n` +
          Object.entries(ThemeTypeInCSS)
            .map(([key, value]) => {
              return `  ${key}: ${value};\n`;
            })
            .join("") +
          "}";
        document.head.appendChild(style);
      }
    }
  }, [ThemeTypeInCSS]);

  const AllProviderChildren = () => (
    <>
      {children}
      {/* {blurOnThemeTypeChange_
        ? //TODO: Add darking effect
          createPortal(
            <motion.div
              initial={{
                backdropFilter: "blur(0px)",
                backgroundColor: `transparent`,
              }}
              animate={
                isDuringThemeTypeChange
                  ? {
                      backdropFilter: "blur(2px)",
                      backgroundColor: `RGBA(0,0,0,0.2)`,
                    }
                  : {
                      backdropFilter: "blur(0px)",
                      backgroundColor: `transparent`,
                    }
              }
              // transition={{ duration: 0.2 }}
              className="absolute inset-0 z-50 w-screen h-screen pointer-events-none select-none"
              slot="blur"
            />,
            document.body
          )
        : null} */}
    </>
  );

  const Provider = ({ children }: { children: ReactNode }) => (
    <MultiUIContext.Provider
      value={{
        setThemeType: (ThemeType_name) => {
          currentThemeType.current = ThemeType_name;
        },
        currentThemeType: currentThemeType.current,
        currentThemeTypeValue: ThemeTypeStyles,
        ThemeTypes: ThemeTypes_.current.map((x) => x.name),

        addThemeType(ThemeType) {
          ThemeTypes_.current = [
            ...ThemeTypes_.current,
            ...(Array.isArray(ThemeType) ? ThemeType : [ThemeType]),
          ];
          console.log(`Adding ThemeType:`, ThemeType);
        },
        onThemeTypeChange(callback) {
          subscribers.current.push(callback);
          return () => {
            subscribers.current = subscribers.current.filter(
              (x) => x !== callback
            );
          };
        },
      }}
    >
      {children}
    </MultiUIContext.Provider>
  );

  if (enableBoxSelection) {
    return (
      <Provider>
        <div
          slot="multiui-box-selection-wrapper"
          ref={selectionContainerRef}
          style={{ position: "relative" }}
        >
          <AllProviderChildren />
          <SelectBoxOutlet className="box-selection" slot="box-selection" />
        </div>
      </Provider>
    );
  }
  return (
    <Provider>
      <AllProviderChildren />
    </Provider>
  );
});
export { default_ThemeType as multiUI_defaultThemeType };

export const useThemeType = () => useContext(MultiUIContext);
