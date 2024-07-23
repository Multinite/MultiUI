import { createMultiUIComponent } from "@multinite_official/multiui";

const { create_baseComponent, create_subComponent } = createMultiUIComponent({
  name: "Button",
  version: "1.0.0",
});

const Button = create_baseComponent(({children, className}: {children: ReactNode | ReactNode[], className: string}) => {
  return <div>hey</div>;
});
