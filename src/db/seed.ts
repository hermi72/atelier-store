// Loads the sample catalog into the database. Idempotent: rows are upserted by
// slug, so re-running resets the sample products to `seed-data.ts`.
// Run with `npm run db:seed` (reads DATABASE_URL from .env.local).

import { sql } from "drizzle-orm";
import { db } from "./index";
import { categories, products, productStock } from "./schema";
import { categories as seedCategories, products as seedProducts } from "./seed-data";

const excluded = (column: string) => sql.raw(`excluded.${column}`);

async function main() {
  const categoryRows = await db
    .insert(categories)
    .values(seedCategories.map((category, index) => ({ ...category, sortOrder: index })))
    .onConflictDoUpdate({
      target: categories.slug,
      set: {
        name: excluded("name"),
        careInstructions: excluded("care_instructions"),
        sortOrder: excluded("sort_order"),
        updatedAt: new Date(),
      },
    })
    .returning({ id: categories.id, slug: categories.slug });
  const categoryIds = new Map(categoryRows.map((row) => [row.slug, row.id]));

  // Earlier entries get later timestamps so "New arrivals" keeps the seed order.
  const now = Date.now();
  const productRows = await db
    .insert(products)
    .values(
      seedProducts.map((product, index) => {
        const categoryId = categoryIds.get(product.category);
        if (!categoryId) throw new Error(`Unknown category "${product.category}" for ${product.slug}`);
        return {
          slug: product.slug,
          categoryId,
          name: product.name,
          priceCents: product.price,
          description: product.description,
          details: product.details,
          images: product.images,
          badge: product.badge ?? null,
          createdAt: new Date(now - index * 60_000),
        };
      }),
    )
    .onConflictDoUpdate({
      target: products.slug,
      set: {
        categoryId: excluded("category_id"),
        name: excluded("name"),
        priceCents: excluded("price_cents"),
        description: excluded("description"),
        details: excluded("details"),
        images: excluded("images"),
        badge: excluded("badge"),
        createdAt: excluded("created_at"),
        updatedAt: new Date(),
      },
    })
    .returning({ id: products.id, slug: products.slug });
  const productIds = new Map(productRows.map((row) => [row.slug, row.id]));

  await db
    .insert(productStock)
    .values(seedProducts.map((product) => ({ productId: productIds.get(product.slug)!, quantity: product.stock })))
    .onConflictDoUpdate({
      target: productStock.productId,
      set: { quantity: excluded("quantity"), updatedAt: new Date() },
    });

  console.log(`Seeded ${categoryRows.length} categories and ${productRows.length} products with stock.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
