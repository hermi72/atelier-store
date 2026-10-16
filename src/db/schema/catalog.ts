import { relations, sql } from "drizzle-orm";
import { check, index, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/** Mirrors `CatalogImage` in `@/lib/catalog`; kept local so the schema has no app imports. */
export type ProductImage = {
  src: string;
  alt: string;
  /** CSS object-position for art-directed crops. */
  position?: string;
};

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** URL key for `/collections/{slug}`. */
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  careInstructions: text("care_instructions").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const products = pgTable(
  "products",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    slug: text("slug").notNull().unique(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    name: text("name").notNull(),
    /** Price in USD cents. */
    priceCents: integer("price_cents").notNull(),
    description: text("description").notNull(),
    details: text("details").array().notNull().default(sql`'{}'::text[]`),
    /** Ordered; the first image is the primary shot used on tiles. */
    images: jsonb("images").$type<ProductImage[]>().notNull(),
    badge: text("badge"),
    ...timestamps,
  },
  (t) => [
    index("products_category_id_idx").on(t.categoryId),
    index("products_created_at_idx").on(t.createdAt),
    check("products_price_cents_nonnegative", sql`${t.priceCents} >= 0`),
    check("products_images_nonempty", sql`jsonb_array_length(${t.images}) > 0`),
  ],
);

/** One row per product; kept apart from `products` because it changes far more often. */
export const productStock = pgTable(
  "product_stock",
  {
    productId: integer("product_id")
      .primaryKey()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(0),
    updatedAt: timestamps.updatedAt,
  },
  (t) => [check("product_stock_quantity_nonnegative", sql`${t.quantity} >= 0`)],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  stock: one(productStock),
}));

export const productStockRelations = relations(productStock, ({ one }) => ({
  product: one(products, { fields: [productStock.productId], references: [products.id] }),
}));

export type CategoryRow = typeof categories.$inferSelect;
export type ProductRow = typeof products.$inferSelect;
export type ProductStockRow = typeof productStock.$inferSelect;
