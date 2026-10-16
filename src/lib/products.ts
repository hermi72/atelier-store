import "server-only";
import { desc, eq, ne, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { products, type CategoryRow, type ProductRow, type ProductStockRow } from "@/db/schema";
import type { CatalogImage, Product } from "@/lib/catalog";

// Server-side catalog reads. Results are cached so product pages and the
// homepage stay in the static shell; `minutes` bounds how stale stock can get.
// Call `revalidateTag(PRODUCTS_TAG)` / `updateTag(PRODUCTS_TAG)` after edits.

export const PRODUCTS_TAG = "products";

const withRelations = { category: true, stock: true } as const;

type ProductWithRelations = ProductRow & { category: CategoryRow; stock: ProductStockRow | null };

function toProduct(row: ProductWithRelations): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: {
      slug: row.category.slug,
      name: row.category.name,
      careInstructions: row.category.careInstructions,
    },
    price: row.priceCents,
    stock: row.stock?.quantity ?? 0,
    // A check constraint guarantees at least one image.
    images: row.images as [CatalogImage, ...CatalogImage[]],
    description: row.description,
    details: row.details,
    badge: row.badge ?? undefined,
  };
}

export async function getProductSlugs() {
  "use cache";
  cacheLife("minutes");
  cacheTag(PRODUCTS_TAG);

  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((row) => row.slug);
}

export async function getProduct(slug: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag(PRODUCTS_TAG);

  const row = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: withRelations,
  });
  return row ? toProduct(row) : undefined;
}

export async function getNewArrivals(limit = 8) {
  "use cache";
  cacheLife("minutes");
  cacheTag(PRODUCTS_TAG);

  const rows = await db.query.products.findMany({
    orderBy: [desc(products.createdAt), desc(products.id)],
    limit,
    with: withRelations,
  });
  return rows.map(toProduct);
}

/** Same-category pieces first, then the rest of the catalog. */
export async function getRelatedProducts(slug: string, limit = 4) {
  "use cache";
  cacheLife("minutes");
  cacheTag(PRODUCTS_TAG);

  const current = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    columns: { id: true, categoryId: true },
  });
  if (!current) return [];

  const rows = await db.query.products.findMany({
    where: ne(products.id, current.id),
    orderBy: [desc(sql`${products.categoryId} = ${current.categoryId}`), desc(products.createdAt), desc(products.id)],
    limit,
    with: withRelations,
  });
  return rows.map(toProduct);
}
