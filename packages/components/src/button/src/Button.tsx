"use client";

import { cn } from "@jamsrworld/utils";
import { type ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

let a = 4;
const sum = (a: number) => {
  return a + 3;
};
console.log(sum("adf"));

export const Button = ({ children, className = "", ...rest }: ButtonProps) => (
  <button
    type="button"
    className={cn(
      `rounded-lg border border-gray-500 bg-black px-4 py-2 text-pink-50 ring-2 ring-pink-400 md:bg-white`,
      className,
    )}
    onClick={() => alert(`Hello from your  app!`)}
    {...rest}
  >
    {children}
  </button>
);
