import type { ComponentProps } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/cn";

type LinkProps = ComponentProps<typeof NextLink> & {
  /** reveal: underline draws in on hover (nav). underline: always underlined (inline, CTAs). */
  variant?: "reveal" | "underline" | "plain";
};

export function Link({ variant = "reveal", className, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(variant === "reveal" && "link-reveal", variant === "underline" && "link-underline", className)}
      {...props}
    />
  );
}
