import { tv, type VariantProps } from "@jamsr-ui/utils";

export const inputVariants = tv({
  slots: {
    base: "flex flex-col gap-1",
    input:
      "block w-full grow bg-transparent text-sm placeholder:text-sm placeholder:text-foreground-400 read-only:cursor-not-allowed focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    labelWrapper: "flex items-center gap-2",
    label: "shrink-0 select-none text-sm font-normal text-foreground-400",
    mainWrapper: "flex gap-1",
    inputWrapper:
      "w-full focus-within:border-primary focus-within:ring-primary",
    innerWrapper: "flex items-center",
    helper: "",
  },
  variants: {
    variant: {
      outline: {
        inputWrapper: "rounded-lg border-2 border-divider",
        input: "rounded-lg",
      },
      transparent: {
        inputWrapper: "border-none bg-transparent outline-none",
        input: "p-0",
      },
      search: {
        inputWrapper: "rounded-2xl border-2 border-divider bg-background-paper",
      },
    },
    size: {
      false: {},
      sm: {
        input: "p-1.5",
      },
      md: {
        input: "p-3",
      },
      lg: {
        input: "p-5",
      },
    },
    isInvalid: {
      true: {
        inputWrapper:
          "border-error focus-within:border-error focus-within:shadow-error focus-within:ring-error",
      },
    },
    labelPlacement: {
      top: {
        mainWrapper: "flex-col",
      },
      start: {
        mainWrapper: "items-center",
      },
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
    labelPlacement: "top",
  },
});

export type InputVariantProps = VariantProps<typeof inputVariants>;
export type InputSlots = keyof ReturnType<typeof inputVariants>;