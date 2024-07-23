import Button from "../components/Button";

type Variant = {
  className: string;
  components: any[];
};

const variant: Variant = {
  className: "Hello world",
  components: [Button.style({})],
};

export default variant;
