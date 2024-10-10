"use client";
import Button from "./";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      DEMO
      <Button $className={({ classes, cn }) => cn(classes, "test")}>hi</Button>
    </div>
  );
}
