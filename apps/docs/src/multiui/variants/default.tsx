import Button from "../components/Button";
import { MultiUIComponentReturnType } from "@multinite_official/multiui";

type Variant = {
  className: string;
  base: Record<string, string>;
  components: MultiUIComponentReturnType[];
};

const variant: Variant = {
  className: "Hello world",
  base: {},
  components: [
    Button.style({
      className: "Hello world",
      base: "213",
    }),
  ],
};

export default variant;
