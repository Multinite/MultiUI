import { createComponent } from "@multinite_official/multiui";

const { create_baseComponent, create_subComponent } = createComponent({
  name: "Button",
  version: "1.0.0",
});

const Button = create_baseComponent((props) => {
  return <button className={props.className}>{props.children}</button>;
});

const D = (
  <div>
    <Button className="Sup ">Hello world!</Button>
  </div>
);
