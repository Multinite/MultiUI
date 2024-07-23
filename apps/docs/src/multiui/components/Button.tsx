import { createMultiUIComponent } from "@multinite_official/multiui";

const Button = createMultiUIComponent({
  name: "Button",
  version: "1.0.0",
  slots: {
    base: "button",
    wrapper: "button-wrapper",
  },
  component: ({ children }) => {
    return <button>{children}</button>;
  },
});

export default Button;
