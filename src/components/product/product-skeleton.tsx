/** Mirrors the product page layout so content streams in without a shift. */
export function ProductSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading product"
      className="animate-pulse lg:container-page lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] lg:gap-[clamp(3rem,6vw,7rem)] lg:pt-8"
    >
      <div className="aspect-product bg-surface" />
      <div className="flex flex-col gap-4 px-gutter pt-8 pb-section lg:px-0 lg:pt-4">
        <div className="h-3 w-24 bg-surface" />
        <div className="mt-6 h-12 w-4/5 bg-surface" />
        <div className="h-5 w-20 bg-surface" />
        <div className="mt-4 h-16 w-full bg-surface" />
        <div className="mt-4 h-12 w-full bg-surface-strong" />
      </div>
    </div>
  );
}
