import { ReactNode } from "react";

type MultiUIComponent = {
  name: string;
  version: string;
  slots: {
    base: string;
    wrapper: string;
  };
  component: (prop: {
    children: ReactNode | ReactNode[];
    [key: string]: any;
  }) => ReactNode;
};

function createMultiUIComponent(props: MultiUIComponent) {
  type Slots = keyof typeof props.slots;

  type ReturnFunction = {
    (props_0: { children: any }): ReactNode;
    details: Omit<MultiUIComponent, "component">;
    style: (
      props1: Partial<Record<"className" | Slots, string>> & {
        className: string;
      }
    ) => 1;
  };
  const ReturnFn: ReturnFunction = ((
    ...props_: Parameters<typeof props.component>
  ) => {
    return props.component(...props_);
  }) as ReturnFunction;

  ReturnFn.details = {
    name: props.name,
    version: props.version,
    slots: props.slots,
  };
  ReturnFn.style = ({ className, ...slots }) => {
    return 1;
  };

  return ReturnFn;
}

type MultiUIComponentReturnType = ReturnType<
  ReturnType<typeof createMultiUIComponent>["style"]
>;

export type { MultiUIComponentReturnType };
export default createMultiUIComponent;
