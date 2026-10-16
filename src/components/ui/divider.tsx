import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Divider({ className, ...props }: ComponentProps<"hr">) {
  return <hr className={cn("border-0 border-t border-line", className)} {...props} />;
}
