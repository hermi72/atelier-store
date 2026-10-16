import type { ComponentProps } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/cn";

// Full class names so Tailwind's scanner can see them.
const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  inverse: "btn-inverse",
} as const;

type ButtonStyleProps = {
  variant?: keyof typeof variants;
  size?: "md" | "sm";
  block?: boolean;
};

export function buttonClasses({ variant = "primary", size = "md", block }: ButtonStyleProps = {}) {
  return cn("btn", variants[variant], size === "sm" && "btn-sm", block && "btn-block");
}

type ButtonProps = ComponentProps<"button"> & ButtonStyleProps;

export function Button({ variant, size, block, className, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonClasses({ variant, size, block }), className)} {...props} />
  );
}

type ButtonLinkProps = ComponentProps<typeof NextLink> & ButtonStyleProps;

/** A link that looks like a button (e.g. hero "Shop now"). */
export function ButtonLink({ variant, size, block, className, ...props }: ButtonLinkProps) {
  return <NextLink className={cn(buttonClasses({ variant, size, block }), className)} {...props} />;
}
