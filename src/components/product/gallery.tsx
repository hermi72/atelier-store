import Image from "next/image";
import type { CatalogImage } from "@/lib/catalog";
import { cn } from "@/lib/cn";

/**
 * Phones: full-bleed swipe carousel with a per-slide counter (CSS only).
 * Desktop: hero shot full width, detail shots two-up beneath it, scrolling
 * past the sticky product information.
 */
export function Gallery({ images }: { images: CatalogImage[] }) {
  return (
    <ul
      aria-label="Product images"
      className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] lg:grid lg:grid-cols-2 lg:gap-1 lg:overflow-visible"
    >
      {images.map((image, i) => (
        <li key={image.src} className={cn("relative w-full shrink-0 snap-start", i === 0 && "lg:col-span-2")}>
          <div className="relative aspect-product overflow-hidden bg-surface">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              sizes={i === 0 ? "(min-width: 64rem) 60vw, 100vw" : "(min-width: 64rem) 30vw, 100vw"}
              style={image.position ? { objectPosition: image.position } : undefined}
              className="object-cover"
            />
          </div>
          <span aria-hidden="true" className="absolute bottom-4 left-gutter eyebrow tabular-nums lg:hidden">
            {i + 1} / {images.length}
          </span>
        </li>
      ))}
    </ul>
  );
}
