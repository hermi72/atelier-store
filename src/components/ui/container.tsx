import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const widths = {
  page: "container-page",
  content: "mx-auto w-full px-gutter max-w-content",
  narrow: "mx-auto w-full px-gutter max-w-narrow",
  full: "w-full px-gutter",
} as const;

type ContainerProps = ComponentProps<"div"> & {
  width?: keyof typeof widths;
};

/** Centered column with fluid side gutters. */
export function Container({ width = "page", className, ...props }: ContainerProps) {
  return <div className={cn(widths[width], className)} {...props} />;
}

type SectionProps = ComponentProps<"section"> & {
  /** Draw a hairline above the section. */
  divided?: boolean;
};

/** Vertical rhythm block; pair with <Container> for horizontal bounds. */
export function Section({ divided, className, ...props }: SectionProps) {
  return <section className={cn("section-y", divided && "border-t", className)} {...props} />;
}
