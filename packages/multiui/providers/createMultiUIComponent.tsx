import { ReactNode } from "react";

interface create_baseComponent {
  (props: { children: ReactNode | ReactNode[]; className: string }): ReactNode;
  name: string;
  version: string;
}

interface create_subComponent {
  (props: { children: ReactNode | ReactNode[]; className: string }): ReactNode;
  version: string;
  name: string;
}

type CreateMultiUIComponent = (props: {
  readonly name: string;
  readonly version: string;
}) => {
  create_baseComponent: create_baseComponent;
  create_subComponent: create_subComponent;
};

const createMultiUIComponent: CreateMultiUIComponent = function (props) {
  const create_baseComponent: ReturnType<CreateMultiUIComponent>["create_baseComponent"] =
    (props1) => {
      return props1.children;
    };
  create_baseComponent.version = props.version;

  const create_subComponent: ReturnType<CreateMultiUIComponent>["create_subComponent"] =
    (props1) => {
      return props1.children;
    };
  create_subComponent.version = props.version;

  const ReturnFn: ReturnType<CreateMultiUIComponent> = {
    create_baseComponent,
    create_subComponent,
  };

  return ReturnFn;
};

// type MultiUIComponentReturnType = ReturnType<
//   ReturnType<typeof createMultiUIComponent>["style"]
// >;

// export type { MultiUIComponentReturnType };
export default createMultiUIComponent;
