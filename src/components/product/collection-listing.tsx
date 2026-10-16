import { Container, Eyebrow, Heading, Link, Section, Text } from "@/components/ui";
import type { Product } from "@/lib/catalog";
import { ProductCardGrid } from "./product-card-grid";

type CollectionListingProps = {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
};

/** Collection page body: breadcrumb, header and the product grid (New in, categories). */
export function CollectionListing({ eyebrow, title, description, products }: CollectionListingProps) {
  return (
    <>
      <Container className="pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 eyebrow text-muted">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
      </Container>

      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="mb-10 flex flex-col gap-3 md:mb-14">
            <Eyebrow className="text-muted">{eyebrow}</Eyebrow>
            <Heading as="h1" size="h1">
              {title}
            </Heading>
            <Text muted className="max-w-narrow">
              {description}
            </Text>
          </div>

          {products.length > 0 ? (
            <ProductCardGrid products={products} eagerCount={4} />
          ) : (
            <Text muted>New pieces are on their way. Check back soon.</Text>
          )}
        </Container>
      </Section>
    </>
  );
}
