import { Container, ProductGrid, Section } from "@/components/ui";

/** Mirrors `CollectionListing` so content streams in without a shift. */
export function CollectionSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading collection" className="animate-pulse">
      <Container className="pt-8">
        <div className="h-3 w-28 bg-surface" />
      </Container>

      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="mb-10 flex flex-col gap-3 md:mb-14">
            <div className="h-3 w-24 bg-surface" />
            <div className="h-12 w-56 bg-surface" />
            <div className="h-5 w-72 max-w-full bg-surface" />
          </div>
          <ProductGrid>
            {Array.from({ length: 4 }, (_, index) => (
              <li key={index}>
                <div className="aspect-product bg-surface" />
                <div className="mt-3 h-4 w-3/4 bg-surface" />
                <div className="mt-2 h-4 w-1/3 bg-surface" />
              </li>
            ))}
          </ProductGrid>
        </Container>
      </Section>
    </div>
  );
}
