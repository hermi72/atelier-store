import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/product/gallery";
import { ProductCardGrid } from "@/components/product/product-card-grid";
import { ProductInfo } from "@/components/product/product-info";
import { ProductSkeleton } from "@/components/product/product-skeleton";
import { Container, Heading, Section } from "@/components/ui";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/lib/products";

type Params = PageProps<"/products/[slug]">["params"];

// Every product in the database at build time is prerendered. Cache Components
// doesn't support `dynamicParams`, so other slugs render at request time:
// products added later still resolve, unknown ones hit notFound().
export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.images[0].src] },
  };
}

// `params` is only read inside the Suspense boundary so client navigations can
// show the skeleton instantly (Partial Prefetching). Trade-off: an unknown slug
// streams the not-found UI with a 200 status plus `noindex`, not a 404.
export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductView params={params} />
    </Suspense>
  );
}

async function ProductView({ params }: { params: Params }) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product.slug);

  return (
    <>
      <div className="lg:container-page lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] lg:gap-[clamp(3rem,6vw,7rem)] lg:pt-8">
        <Gallery images={product.images} />
        {/* Sticky so price and the bag button stay in view while the gallery scrolls. */}
        <div className="px-gutter pt-8 pb-section lg:sticky lg:top-[calc(var(--spacing-header-lg)+2rem)] lg:self-start lg:px-0 lg:pt-4">
          <ProductInfo product={product} />
        </div>
      </div>

      <Section divided>
        <Container>
          <Heading size="h2" className="mb-10">
            You may also like
          </Heading>
          <ProductCardGrid products={related} />
        </Container>
      </Section>
    </>
  );
}
