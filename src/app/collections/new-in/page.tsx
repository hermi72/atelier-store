import type { Metadata } from "next";
import { CollectionListing } from "@/components/product/collection-listing";
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
    <CollectionListing
      eyebrow="Just arrived"
      title="New in"
      description="The latest pieces from the atelier, newest first."
      products={newArrivals}
    />
  );
}
