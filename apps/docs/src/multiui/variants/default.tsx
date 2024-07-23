import { Button } from "../components/Button";

type Variant = {
  className: string;
  base: Record<string, string>;
  components: any[];
};

const variant: Variant = {
  className: "Hello world",
  base: {},
  components: [Button.style({})],
};

export default variant;
