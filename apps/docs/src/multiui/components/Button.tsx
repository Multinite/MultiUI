import {
  createComponent,
  CreateComponentValues,
} from "@multinite_official/multiui";

const { create_baseComponent, create_subComponent }: CreateComponentValues =
  createComponent({
    name: "Button",
    version: "1.0.0",
  });

export const Button = create_baseComponent((props) => {
  return <button className={props.className}>{props.children}</button>;
});
