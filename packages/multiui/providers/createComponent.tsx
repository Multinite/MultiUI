import { ReactNode } from "react";

type Create_baseComponentFn = (
  prop: (props: {
    children: ReactNode | ReactNode[] | string;
    className?: string;
  }) => ReactNode
) => Create_baseComponent;

interface Create_baseComponent {
  (...props: Parameters<Parameters<Create_baseComponentFn>[0]>): ReactNode;
  name: string;
  version: string;
  style: ({}) => void;
}

type Create_subComponentFn = (
  prop: (props: {
    children: ReactNode | ReactNode[] | string;
    className?: string;
  }) => ReactNode
) => Create_subComponent;

interface Create_subComponent {
  (...props: Parameters<Parameters<Create_subComponentFn>[0]>): ReactNode;
  version: string;
  name: string;
  style: ({}) => void;
}

type CreateComponent = (namespace: {
  readonly name: string;
  readonly version: string;
}) => {
  create_baseComponent: Create_baseComponentFn;
  create_subComponent: Create_subComponentFn;
};

type CreateComponents = ReturnType<CreateComponent>;

const createComponent: CreateComponent = function (props) {
  const create_baseComponent: ReturnType<CreateComponent>["create_baseComponent"] =
    (create_baseComponentFn) => {
      //@ts-ignore
      const create_baseComponent: Create_baseComponent = create_baseComponentFn;
      create_baseComponent.version = props.version;
      create_baseComponent.name = props.name;
      create_baseComponent.style = () => {};
      return create_baseComponent;
    };

  const create_subComponent: ReturnType<CreateComponent>["create_subComponent"] =
    (create_subComponentFn) => {
      //@ts-ignore
      const create_subComponent: Create_subComponent = create_subComponentFn;
      create_subComponent.version = props.version;
      create_subComponent.name = props.name;
      create_subComponent.style = () => {};
      return create_subComponent;
    };

  const ReturnFn: ReturnType<CreateComponent> = {
    create_baseComponent: create_baseComponent,
    create_subComponent: create_subComponent,
  };

  return ReturnFn;
};
export default createComponent;
export type {
  Create_baseComponentFn,
  Create_subComponentFn,
  CreateComponent,
  Create_baseComponent,
  Create_subComponent,
  CreateComponents,
};
