import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionListing } from "@/components/product/collection-listing";
import { CollectionSkeleton } from "@/components/product/collection-skeleton";
import { getCategory, getCategorySlugs } from "@/lib/products";

type Params = PageProps<"/collections/[slug]">["params"];

// Every category is prerendered; `/collections/new-in` is its own static route
// and takes precedence. Other slugs (including the Women/Men merchandising
// tiles, which aren't categories) render at request time and hit notFound().
export async function generateStaticParams() {
  return (await getCategorySlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const category = await getCategory((await params).slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `Shop ${category.name.toLowerCase()} from Atelier.`,
  };
}

// Same Partial Prefetching trade-off as the product page: `params` is only read
// inside Suspense, so unknown slugs stream the not-found UI with a 200 + noindex.
export default function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  return (
    <Suspense fallback={<CollectionSkeleton />}>
      <CollectionView params={params} />
    </Suspense>
  );
}

async function CollectionView({ params }: { params: Params }) {
  const category = await getCategory((await params).slug);
  if (!category) notFound();

  const count = category.products.length;

  return (
    <CollectionListing
      eyebrow="Shop by category"
      title={category.name}
      description={`${count} ${count === 1 ? "piece" : "pieces"}, newest first.`}
      products={category.products}
    />
  );
}
