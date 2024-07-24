import { ButtonComponent } from "../components/Button";

type Variant = {
  className: string;
  components: any[];
};

const variant: Variant = {
  className: "Hello world",
  components: [ButtonComponent.style({})],
};

export default variant;
