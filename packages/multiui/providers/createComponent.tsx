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
}

type CreateComponent = (props: {
  readonly name: string;
  readonly version: string;
}) => {
  create_baseComponent: Create_baseComponentFn;
  create_subComponent: Create_subComponentFn;
};

const createComponent: CreateComponent = function (props) {
  const create_baseComponent: ReturnType<CreateComponent>["create_baseComponent"] =
    (create_baseComponentFn) => {
      //@ts-ignore
      const create_baseComponent: Create_baseComponent = create_baseComponentFn;
      create_baseComponent.version = props.version;
      create_baseComponent.name = props.name;
      return create_baseComponent;
    };

  const create_subComponent: ReturnType<CreateComponent>["create_subComponent"] =
    (create_subComponentFn) => {
      //@ts-ignore
      const create_subComponent: Create_subComponent = create_subComponentFn;
      create_subComponent.version = props.version;
      create_subComponent.name = props.name;
      return create_subComponent;
    };

  const ReturnFn: ReturnType<CreateComponent> = {
    create_baseComponent: create_baseComponent,
    create_subComponent: create_subComponent,
  };

  return ReturnFn;
};
export default createComponent;
