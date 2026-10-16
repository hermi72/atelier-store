import { ProductGrid, ProductTile } from "@/components/ui";
import { formatPrice, type Product } from "@/lib/catalog";

/** The shared product listing: used by the homepage and product page alike. */
export function ProductCardGrid({ products }: { products: Product[] }) {
  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductTile
          key={product.slug}
          href={`/products/${product.slug}`}
          name={product.name}
          price={formatPrice(product.price)}
          image={product.images[0]}
          badge={product.badge}
          soldOut={product.stock <= 0}
        />
      ))}
    </ProductGrid>
  );
}
