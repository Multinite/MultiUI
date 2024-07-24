import { ReactNode } from "react";

type DefaultComponentProps = {
  children: ReactNode | ReactNode[] | string;
  className?: string;
};

type CreateBaseComponentFn<ComponentProps extends {} = {}> = (
  props: DefaultComponentProps & ComponentProps
) => ReactNode;

interface CreateBaseComponent<ComponentProps extends {}> {
  (props: DefaultComponentProps & ComponentProps): ReactNode;
  component_name: string;
  version: string;
  style: (styleProps: {}) => void;
}

type CreateSubComponentFn<ComponentProps extends {} = {}> = (
  props: DefaultComponentProps & ComponentProps
) => ReactNode;

interface CreateSubComponent<ComponentProps extends {}> {
  (props: DefaultComponentProps & ComponentProps): ReactNode;
  component_name: string;
  version: string;
  style: (styleProps: {}) => void;
}

type CreateComponent = (namespace: { name: string; version: string }) => {
  createBaseComponent: CreateBaseComponentFn;
  createSubComponent: CreateSubComponentFn;
};

// CreateComponents type
type CreateComponents = ReturnType<CreateComponent>;

// Implementation of createComponent
const createComponent = ({ name, version }: Parameters<CreateComponent>[0]) => {
  const createBaseComponent = <ComponentProps extends {}>(
    componentFn: CreateBaseComponentFn<ComponentProps>
  ) => {
    const baseComponent: CreateBaseComponent<ComponentProps> =
      componentFn as CreateBaseComponent<ComponentProps>;
    baseComponent.component_name = name;
    baseComponent.version = version;
    baseComponent.style = () => {};
    return baseComponent;
  };

  const createSubComponent = <ComponentProps extends {}>(
    componentFn: CreateSubComponentFn<ComponentProps>
  ) => {
    const subComponent: CreateSubComponent<ComponentProps> =
      componentFn as CreateSubComponent<ComponentProps>;
    subComponent.component_name = name;
    subComponent.version = version;
    subComponent.style = () => {};
    return subComponent;
  };

  return {
    createBaseComponent,
    createSubComponent,
  };
};

export default createComponent;
export type {
  CreateBaseComponentFn,
  CreateSubComponentFn,
  CreateComponent,
  CreateBaseComponent,
  CreateSubComponent,
  CreateComponents,
};
