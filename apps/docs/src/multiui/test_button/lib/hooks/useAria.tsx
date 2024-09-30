/**
 * # useAria - Button
 * This hook is used to create the aria attributes for the button.
 */
export function useAria({
  ariaLabel,
  role = "button",
  ariaLabelledBy,
  ariaDescribedBy,
  ariaHidden = false,
  ariaExpanded = false,
  ariaSelected = false,
  ariaHasPopup = false,
  ariaInvalid = false,
  tabIndex = 0,
}: {
  /**
   * "aria-label" is used to provide a label for the button.
   *
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-label}
   */
  ariaLabel: string;
  /**
   * "role" is used to provide the role of the button.
   *
   * @default "button"
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#role_definitions}
   */
  role?: "button" | (string & {});
  /**
   * "aria-labelledby" is used to provide a label for the button.
   *
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby}
   */
  ariaLabelledBy?: string;
  /**
   * "aria-describedby" is used to provide a description for the button.
   *
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-describedby}
   */
  ariaDescribedBy?: string;
  /**
   * "aria-hidden" is used to hide the button from screen readers.
   *
   * @default false
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-hidden}
   */
  ariaHidden?: boolean;
  /**
   * "aria-expanded" is used to indicate whether the button is expanded or collapsed.
   *
   * @default false
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-expanded}
   */
  ariaExpanded?: boolean;
  /**
   * "aria-selected" is used to indicate whether the button is selected or not.
   *
   * @default false
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-selected}
   */
  ariaSelected?: boolean;
  /**
   * "aria-haspopup" is used to indicate whether the button has a popup menu or not.
   *
   * @default false
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-haspopup}
   */
  ariaHasPopup?: boolean;
  /**
   * "aria-invalid" is used to indicate whether the button is invalid or not.
   *
   * @default false
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-invalid}
   */
  ariaInvalid?: boolean;
  /**
   * "tab-index" is used to set the tab index of the button.
   *
   * @default 0
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#tab-index}
   */
  tabIndex?: number;
}) {
  return {
    "aria-label": ariaLabel,
    role: role,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-hidden": ariaHidden,
    "aria-expanded": ariaExpanded,
    "aria-selected": ariaSelected,
    "aria-haspopup": ariaHasPopup,
    "aria-invalid": ariaInvalid,
    "tab-index": tabIndex,
  };
}
