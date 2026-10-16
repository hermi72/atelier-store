import type { StockState } from "@/lib/catalog";
import { cn } from "@/lib/cn";

const dot = {
  "in-stock": "bg-success",
  "low-stock": "bg-accent",
  "sold-out": "bg-subtle",
} as const;

export function StockStatus({ state }: { state: StockState }) {
  return (
    <p className="flex items-center gap-2 text-small">
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dot[state.kind])} />
      <span className={cn(state.kind === "low-stock" && "text-accent", state.kind === "sold-out" && "text-muted")}>
        {state.label}
      </span>
    </p>
  );
}
