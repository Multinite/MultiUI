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

type CreateComponentProps = { name: string; version: string };

const createComponent = ({ name, version }: CreateComponentProps) => {
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

  const styleVariant = (styleProps: {}) => {
    return {};
  };

  return {
    createBaseComponent,
    createSubComponent,
    styleVariant,
  };
};

export default createComponent;
export type {
  CreateBaseComponentFn,
  CreateSubComponentFn,
  CreateBaseComponent,
  CreateSubComponent,
};
