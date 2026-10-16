import type { Metadata } from "next";
import { ProductCardGrid } from "@/components/product/product-card-grid";
import { Container, Eyebrow, Heading, Link, Section, Text } from "@/components/ui";
import { getNewArrivals } from "@/lib/products";

export const metadata: Metadata = {
  title: "New in",
  description: "The latest arrivals from Atelier: leather goods, ready-to-wear and accessories, newest first.",
};

// The homepage shows the first 8; this page lists a full season's worth.
const NEW_ARRIVALS_LIMIT = 24;

export default async function NewInPage() {
  const newArrivals = await getNewArrivals(NEW_ARRIVALS_LIMIT);

  return (
    <>
      <Container className="pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 eyebrow text-muted">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">New in</li>
          </ol>
        </nav>
      </Container>

      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="mb-10 flex flex-col gap-3 md:mb-14">
            <Eyebrow className="text-muted">Just arrived</Eyebrow>
            <Heading as="h1" size="h1">
              New in
            </Heading>
            <Text muted className="max-w-narrow">
              The latest pieces from the atelier, newest first.
            </Text>
          </div>

          {newArrivals.length > 0 ? (
            <ProductCardGrid products={newArrivals} eagerCount={4} />
          ) : (
            <Text muted>New pieces are on their way. Check back soon.</Text>
          )}
        </Container>
      </Section>
    </>
  );
}
