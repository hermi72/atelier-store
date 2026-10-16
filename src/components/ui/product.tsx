import type { ComponentProps } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { cn } from "@/lib/cn";

/** 2 columns up to tablet, 4 from desktop (counts in multiples of 4 never orphan); tight column gaps, generous row gaps. */
export function ProductGrid({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-x-2 gap-y-10 md:gap-x-4 md:gap-y-14 lg:grid-cols-4",
        className,
      )}
      {...props}
    />
  );
}

type ProductTileProps = {
  href: string;
  name: string;
  price: string;
  image?: { src: string; alt: string; position?: string };
  /** Short tracked label above the name, e.g. "New in". */
  badge?: string;
  /** Load immediately instead of lazily; use for above-the-fold tiles. */
  eager?: boolean;
  soldOut?: boolean;
  className?: string;
};

/**
 * Fixed 4:5 frame on a neutral well so mixed photography lines up; text is
 * small, left-aligned, and never competes with the image.
 */
export function ProductTile({ href, name, price, image, badge, eager, soldOut, className }: ProductTileProps) {
  return (
    <li className={className}>
      <NextLink href={href} className="group block">
        <div className="relative aspect-product overflow-hidden bg-surface">
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading={eager ? "eager" : "lazy"}
              sizes="(min-width: 64rem) 25vw, 50vw"
              style={image.position ? { objectPosition: image.position } : undefined}
              className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
            />
          )}
        </div>
        <div className="mt-3 flex flex-col gap-1 pr-2">
          {badge && <span className="eyebrow text-accent">{badge}</span>}
          <span className="text-small">{name}</span>
          <span className="text-small text-muted">
            {price}
            {soldOut && <span className="text-subtle"> · Sold out</span>}
          </span>
        </div>
      </NextLink>
    </li>
  );
}
