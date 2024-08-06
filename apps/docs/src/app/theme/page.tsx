"use client";
import chroma from "chroma-js";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// 100 (full/normal) = 1
// 50 (half) = 0.5

const baseColors = {
  "50": "#f6f6f6",
  "100": "#e7e7e7",
  "200": "#d1d1d1",
  "300": "#b0b0b0",
  "400": "#888888",
  "500": "#6d6d6d",
  "600": "#5d5d5d",
  "700": "#4f4f4f",
  "800": "#454545",
  "900": "#3d3d3d",
  "950": "#000000",
};
const baseColors_2 = {
  "50": "#ffffff",
  "100": "#efefef",
  "200": "#dcdcdc",
  "300": "#bdbdbd",
  "400": "#989898",
  "500": "#7c7c7c",
  "600": "#656565",
  "700": "#525252",
  "800": "#464646",
  "900": "#3d3d3d",
  "950": "#292929",
};

const desired_color_indexs = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
];
// Normal:
// 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
//
// if 400 is the base/lock than:
// 350, 300, 200, 100, 0, 100, 200, 300, 400, 500, 550
// formula = base (-/+) index

function ThemeGenerationPage() {
  const [hex, setHex] = useState("#6374ae"); //6374ae // f300f3
  const [testHex, setTestHex] = useState("#f00");
  const [colorPalette, setColorPalette] = useState<Record<string, string>>({});
  const [colorPalette2, setColorPalette2] = useState<Record<string, string>>(
    {}
  );

  const lock = findClosestColor(hex, baseColors_2);
  let ranOnce = useRef(false);
  useEffect(() => {
    // console.log(`TEST:`, chroma(`#fff`).mix("#fff").hex());
    const duration = 300;
    for (let index = 0; index < duration; index++) {
      console.log(`TEST:`, easeOutExpo(index, 1, 50, duration));
    }

    ranOnce.current = true;
    let cp: typeof colorPalette = desired_color_indexs.reduce((acc, curr) => {
      return { ...acc, [curr]: curr === lock.key ? lock.color : undefined };
    }, {});
    let effect: "darken" | "brighten" = "brighten";
    Object.entries(cp).forEach(([key, value]) => {
      if (key === lock.key) effect = "darken";
      const strength_multiplier = 0.55; // 0.55;
      const strength =
        ((effect === "brighten"
          ? parseInt(lock.key) - parseInt(key)
          : parseInt(key) - parseInt(lock.key)) /
          100) *
        strength_multiplier;
      cp[key] = chroma(hex)[effect](strength).hex();
    });
    console.log(`cp`, cp);
    setColorPalette(cp);
    let cp2 = { ...cp };
    Object.entries(cp2).forEach(([key, value], index) => {
      //@ts-ignore
      cp2[key] = chroma(value).mix(baseColors_2[key], 0.4).hex();
      const isLast_or_first =
        index === 0 || index === desired_color_indexs.length - 1;

      const isSecond_or_SecondLast =
        index === 1 || index === desired_color_indexs.length - 2;

      // if (!isLast_or_first || isSecond_or_SecondLast) {
      if (parseInt(lock.key) > 500) {
        cp2[key] = chroma(cp2[key]).brighten(0.2).hex();
      } else {
        cp2[key] = chroma(cp2[key]).darken(0.2).hex();
      }
      // } else if (isSecond_or_SecondLast) {
      //   cp2[key] = chroma(cp2[key]).saturate(0.3).hex();
      // } else if (isLast_or_first) {
      //   cp2[key] = chroma(cp2[key]).saturate(0.2).hex();
      // }
    });
    console.log(`cp2`, cp2);
    setColorPalette2(cp2);
  }, [hex]);

  return (
    <div className="w-screen h-screen text-wrap whitespace-pre-line overflow-auto p-10">
      <h1>Theme Generation</h1>
      <input
        type="text"
        onInput={(e) => setHex(e.currentTarget.value)}
        value={hex}
      />
      <div style={{ backgroundColor: hex }} className="size-10">
        main
      </div>
      <div style={{ backgroundColor: testHex }} className="size-10">
        test
      </div>
      <pre>CSS: {chroma.hex(hex).css()}</pre>
      <pre>HEX: {chroma.hex(hex).hex()}</pre>
      <pre>RGBA: {chroma.hex(hex).rgba().join(", ")}</pre>
      <pre>HSV: {chroma.hex(hex).hsv().join(", ")}</pre>
      <pre>HSL: {chroma.hex(hex).hsl().join(", ")}</pre>
      <pre>lock: {lock.key}</pre>
      <div className="w-0 h-32"></div>
      <div className="w-full h-fit">
        <Image
          src={`https://media.discordapp.net/attachments/797814323673301033/1269792812459757628/jeeV2qp.png?ex=66b15a36&is=66b008b6&hm=aed15b567c0354f11cf9f6c78a37c79fcbf859496291e0eb6ffa84eec8f1aa63&=&format=webp`}
          width={1100}
          height={196}
          alt="jeeV2qp"
          className="w-[85%] h-full"
        />
      </div>
      <hr className="my-10" />
      <ColorPalette colorPalette={colorPalette} lock={lock} />
      <Demo colorPalette={colorPalette} />
      <hr className="my-10" />
      <ColorPalette colorPalette={colorPalette2} lock={lock} />
      <Demo colorPalette={colorPalette2} />
      <hr className="mt-32" />
    </div>
  );
}

export default ThemeGenerationPage;

function Demo({ colorPalette }: { colorPalette: Record<string, string> }) {
  if (Object.keys(colorPalette).length === 0) return null;
  console.log(chroma(colorPalette["500"]!).css());
  return (
    <div className="w-full h-fit space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
      <div
        className="w-72 h-96 rounded-2xl"
        style={{
          backgroundColor: colorPalette["200"],
        }}
      >
        <div
          className="leading-none p-6 rounded-2xl mb-2 text-4xl font-semibold drop-shadow-sm tracking-tight"
          style={{
            color: colorPalette["950"],
          }}
        >
          {" "}
          Create
          <br />{" "}
          <span
            style={{
              color: colorPalette["600"],
            }}
          >
            color scales
          </span>{" "}
          in seconds.{" "}
        </div>
      </div>
      <div
        className="card-shadow w-72 rounded-2xl p-0 bg-cover bg-center h-96 relative overflow-hidden"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1611244419377-b0a760c19719?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydGlzdHxlbnwwfHwwfHx8MA%3D%3D)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(transparent 0%, ${chroma(colorPalette["500"]!).css()} 100%)`,
          }}
        >
          <div className="h-full flex">
            <div
              className="leading-none p-6 rounded-2xl mt-auto mb-2 text-4xl font-semibold drop-shadow-sm tracking-tight"
              style={{
                color: colorPalette["50"],
              }}
            >
              {" "}
              Create
              <br />{" "}
              <span
                style={{
                  color: colorPalette["200"],
                }}
              >
                color scales
                <br />
              </span>{" "}
              in seconds.{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorPalette({
  colorPalette,
  lock,
}: {
  colorPalette: Record<string, string>;
  lock: { key: string; color: string };
}) {
  return (
    <div className="w-full min-h-32 h-fit flex flex-wrap gap-2">
      {Object.entries(colorPalette).map(([key, value], index) => {
        const color =
          parseInt(key) < 500 ? colorPalette["900"] : colorPalette["50"];
        return (
          <div
            key={key}
            style={{ backgroundColor: value, color: color }}
            className="size-32 rounded-lg flex items-center justify-center flex-col"
          >
            {lock.key === key ? (
              <span className="text-2xl -mt-4">🔒</span>
            ) : (
              <span className="mb-3"></span>
            )}
            <div className="font-semibold">{key}</div>
            <div className="">{value}</div>
          </div>
        );
      })}
    </div>
  );
}

function findClosestColor(
  color: string,
  compareColors: Record<string, string>
) {
  const inputColor = chroma(color);
  let closest: { key: string; color: string; distance: number } = {
    key: "",
    color: "",
    distance: 0,
  };

  for (const [key, value] of Object.entries(compareColors)) {
    const compareColor = chroma(value);
    const distance = chroma.distance(compareColor, inputColor);
    if (closest.key === "") {
      closest = { key, color: value, distance };
    } else if (distance < closest.distance) {
      closest = { key, color: value, distance };
    }
  }
  return closest;
}

/**
 *
 * @param t time
 * @param b beginning value
 * @param c change in value
 * @param d duration
 * @returns {number}
 */
function easeOutExpo(t: number, b: number, c: number, d: number) {
  return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
}
