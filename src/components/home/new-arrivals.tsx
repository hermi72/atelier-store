import { ProductCardGrid } from "@/components/product/product-card-grid";
import { Container, Eyebrow, Heading, Link, Section } from "@/components/ui";
import { getNewArrivals } from "@/lib/products";

export async function NewArrivals() {
  const newArrivals = await getNewArrivals();

  return (
    <Section divided>
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <Eyebrow className="text-muted">Just arrived</Eyebrow>
            <Heading size="h2">New this season</Heading>
          </div>
          <Link href="/collections/new-in" variant="underline" className="eyebrow shrink-0">
            View all
          </Link>
        </div>
        <ProductCardGrid products={newArrivals} />
      </Container>
    </Section>
  );
}
