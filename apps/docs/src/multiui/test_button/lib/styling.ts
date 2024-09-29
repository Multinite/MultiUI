import { cn } from "@multinite_official/multiui";
import { useMemo } from "react";

export function getSizeClass(size: string, isIconOnly: boolean) {
  let size_class = "";
  if (isIconOnly) {
    switch (size) {
      case "sm":
        size_class = "p-2";
        break;
      case "md":
        size_class = "p-3";
        break;
      case "lg":
        size_class = "p-4";
        break;
    }
  } else {
    switch (size) {
      case "sm":
        size_class = "px-3 py-1.5";
        break;
      case "md":
        size_class = "px-4 py-2";
        break;
      case "lg":
        size_class = "px-5 py-2.5";
        break;
    }
  }

  switch (size) {
    case "sm":
      size_class = cn(size_class, "text-small");
      break;
    case "md":
      size_class = cn(size_class, "text-medium");
      break;
    case "lg":
      size_class = cn(size_class, "text-large");
      break;
  }
  return size_class;
}

export function getRadiusClass(radius: string) {
  switch (radius) {
    case "none":
      return "rounded-none";
    case "sm":
      return "rounded-sm";
    case "md":
      return "rounded-md";
  }
}

export function getColorClass(color: string) {
  switch (color) {
    case "primary":
      return "bg-primary-500";
    case "secondary":
      return "bg-secondary-500";
    case "success":
      return "bg-success-500";
    case "danger":
      return "bg-danger-500";
    case "warning":
      return "bg-warning-500";
  }
}

export function useBaseClasses(
  size: string | undefined,
  color: string | undefined,
  radius: string | undefined,
  isIconOnly: boolean | undefined
) {
  const classes = useMemo(() => {
    return cn(
      `text-nowrap px-4 py-2 appearance-none box-border select-none outline-none transition-all ease-in-out relative overflow-hidden outline-none `,
      `data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50`,
      `data-[pressed=true]:scale-[0.97]`,
      `motion-reduce:transition-none`,
      getSizeClass(size ?? "md", isIconOnly ?? false),
      getColorClass(color ?? "primary"),
      getRadiusClass(radius ?? "sm")
    );
  }, [size, isIconOnly, radius, color]);
  return classes;
}