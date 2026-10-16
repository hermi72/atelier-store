import { Button, Eyebrow, Heading, Link, Text } from "@/components/ui";
import { formatPrice, stockState, type Product } from "@/lib/catalog";
import { StockStatus } from "./stock-status";

/** Hairline-separated disclosure rows; native <details> so they work without JS. */
function Disclosure({ title, children, open }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details className="group border-b" open={open}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 eyebrow [&::-webkit-details-marker]:hidden">
        {title}
        <span aria-hidden="true" className="text-body leading-none transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pb-6 text-small text-ink-soft">{children}</div>
    </details>
  );
}

export function ProductInfo({ product }: { product: Product }) {
  const stock = stockState(product.stock);
  const soldOut = stock.kind === "sold-out";
  const categoryHref = `/collections/${product.category.slug}`;

  return (
    <div className="flex flex-col">
      <nav aria-label="Breadcrumb">
        <ol className="flex gap-2 eyebrow text-muted">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={categoryHref}>{product.category.name}</Link>
          </li>
        </ol>
      </nav>

      {product.badge && <Eyebrow className="mt-8 text-accent">{product.badge}</Eyebrow>}
      <Heading as="h1" size="h1" className={product.badge ? "mt-3" : "mt-8"}>
        {product.name}
      </Heading>
      <p className="mt-4 text-lead">{formatPrice(product.price)}</p>

      <div className="mt-6">
        <StockStatus state={stock} />
      </div>

      <Text className="mt-6 text-ink-soft">{product.description}</Text>

      <div className="mt-8 flex flex-col gap-3">
        <Button block disabled={soldOut}>
          {soldOut ? "Sold out" : "Add to bag"}
        </Button>
        <Link href="/client-services/appointments" variant="underline" className="self-center text-small">
          {soldOut ? "Ask a client advisor about availability" : "Book an appointment to see it in store"}
        </Link>
      </div>

      <ul className="mt-8 flex flex-col gap-1 border-y py-5 text-small text-muted">
        <li>Complimentary express shipping and returns</li>
        <li>Delivered in signature packaging</li>
      </ul>

      <div>
        <Disclosure title="Details" open>
          <ul className="flex flex-col gap-1.5">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </Disclosure>
        <Disclosure title="Care">{product.category.careInstructions}</Disclosure>
        <Disclosure title="Shipping & returns">
          Orders ship within 2 business days. Returns are free within 30 days of delivery, in original condition
          with all tags attached.
        </Disclosure>
      </div>
    </div>
  );
}
