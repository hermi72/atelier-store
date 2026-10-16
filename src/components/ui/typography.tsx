import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/cn";

const headingSizes = {
  display: "font-serif text-display",
  h1: "font-serif text-h1",
  h2: "font-serif text-h2",
  h3: "font-sans text-h3",
} as const;

type HeadingProps = ComponentProps<"h2"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  size?: keyof typeof headingSizes;
};

/** Visual size is independent of the semantic level. */
export function Heading({ as: Tag = "h2", size = "h2", className, ...props }: HeadingProps) {
  return <Tag className={cn(headingSizes[size], className)} {...props} />;
}

const textSizes = {
  lead: "text-lead",
  body: "text-body",
  small: "text-small",
} as const;

type TextProps = ComponentProps<"p"> & {
  as?: ElementType;
  size?: keyof typeof textSizes;
  muted?: boolean;
};

export function Text({ as: Tag = "p", size = "body", muted, className, ...props }: TextProps) {
  return <Tag className={cn(textSizes[size], muted && "text-muted", className)} {...props} />;
}

/** Small tracked uppercase label: nav items, kicker lines, tile meta. */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("eyebrow", className)} {...props} />;
}
