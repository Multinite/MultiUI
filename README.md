![MultiUI Banner](https://github.com/Multinite/MultiUI/blob/main/resources/assets/multiui/MultiUI_Banner_830x200.png?raw=true "MultiUI Banner")

# [MultiUI](https://multiui.org)

[![npm version](https://flat.badgen.net/npm/v/@multinite_official/multiui?icon=npm)](https://npmjs.com/package/@multinite_official/multiui)
[![npm downloads](https://flat.badgen.net/npm/dm/@multinite_official/multiui?icon=npm)](https://npmjs.com/package/@multinite_official/multiui)
[![npm downloads](https://flat.badgen.net/npm/dependents/@multinite_official/multiui?icon=npm)](https://npmjs.com/package/@multinite_official/multiui)
[![license](https://flat.badgen.net/github/license/multinite/multiui?icon=github)](https://github.com/Multinite/MultiUI/blob/main/LICENSE.md)

> [!IMPORTANT]  
> This is the monorepo for MultiUI.
> <br />
> You can find MultiUI [here](https://github.com/Multinite/MultiUI/tree/main/packages/multiui).
> <br />
> You can find MultiUI's docs [here](https://github.com/Multinite/MultiUI/tree/main/apps/docs).
> <br />
> You can find MultiUI's CLI [here](https://github.com/Multinite/MultiUI/tree/main/packages/multiui-cli).

#### The best React Component Library focused on everything.

- Highly customizable. 🔧
- Custom themes. 🎨
- Performance in mind. 🚀
- Accessible. 👍
- We love animations. 💈
- You own the code, you own the style. 🎉

#### Helpful Links:

- [MultiUI Documentation 📚](https://multiui.org)
- [Multinite Discord Server 💬](https://discord.gg/Q38kKV9PUT)
- [NPM 📡](https://www.npmjs.com/package/@multinite_official/multiui)
- [GitHub 💾](https://github.com/Multinite/MultiUI)

## Installation

```bash
npm install @multinite_official/multiui
```

## Usage

Create your own Button component!
<br />
`@/components/multiUi/Button.tsx`

```tsx
import {
  ButtonEl,
  Content,
  Start_Content,
  End_Content,
  ButtonProps,
  MultiUI,
} from "@multinite_official/multiui/button";

function Button({ children, endContent, startContent }: ButtonProps) {
  const element = (
    <ButtonEl>
      <Start_Content>{startContent}</Start_Content>
      <Content>{children}</Content>
      <End_Content>{endContent}</End_Content>
    </ButtonEl>
  );

  return MultiUI(element);
}

export default Button;
```

Access your new Button component!
<br />
`/app/home/index.tsx`

```tsx
import Button from "@/components/multiUi/Button";

export default function Home() {
  return <Button>Hello World</Button>;
}
```

## License

[MIT](https://github.com/Multinite/MultiUI/blob/main/LICENSE.md)
