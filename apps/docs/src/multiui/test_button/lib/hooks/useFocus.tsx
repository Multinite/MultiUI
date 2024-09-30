import { useFocus as useFocusRAI } from "react-aria";

export function useFocus(args: Parameters<typeof useFocusRAI>[0]) {
  const props = useFocusRAI(args);

  return props;
}
