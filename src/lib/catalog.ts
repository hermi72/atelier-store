// Storefront types, formatting helpers and editorial content.
// Products, categories and stock live in the database (see `@/lib/products`).
// Photography: Unsplash (https://unsplash.com/license).

export type CatalogImage = {
  src: string;
  alt: string;
  /** CSS object-position for art-directed crops. */
  position?: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
  careInstructions: string;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  /** Price in USD cents. */
  price: number;
  /** Units available; drives the stock state shown on the product page. */
  stock: number;
  /** First image is the primary shot used on tiles. */
  images: [CatalogImage, ...CatalogImage[]];
  description: string;
  details: string[];
  badge?: string;
};

export type StockState =
  | { kind: "in-stock"; label: string }
  | { kind: "low-stock"; label: string }
  | { kind: "sold-out"; label: string };

const LOW_STOCK_THRESHOLD = 3;

export function stockState(stock: number): StockState {
  if (stock <= 0) return { kind: "sold-out", label: "Sold out" };
  if (stock <= LOW_STOCK_THRESHOLD) return { kind: "low-stock", label: `Only ${stock} left` };
  return { kind: "in-stock", label: "In stock" };
}

export type Collection = {
  slug: string;
  title: string;
  image: CatalogImage;
};

/** `rect` crops a region (x,y,w,h as fractions) for detail shots. */
const unsplash = (id: string, rect?: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop${rect ? `&rect=${rect}` : ""}`;

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(cents: number) {
  return priceFormat.format(cents / 100);
}

export const heroImage: CatalogImage = {
  src: unsplash("1603189343302-e603f7add05a"),
  alt: "Model in an oversized black coat, arms outstretched, against a white backdrop",
  position: "45% 30%",
};

export const collections: Collection[] = [
  {
    slug: "women",
    title: "Women",
    image: {
      src: unsplash("1580478491436-fd6a937acc9e"),
      alt: "Woman in a burgundy blazer and leather gloves seated on a staircase",
    },
  },
  {
    slug: "men",
    title: "Men",
    image: {
      src: unsplash("1618886614638-80e3c103d31a"),
      alt: "Man in a black suit walking across a stone plaza",
    },
  },
  {
    slug: "bags",
    title: "Bags",
    image: {
      src: unsplash("1624687943971-e86af76d57de"),
      alt: "Tan leather tote hanging against a white door",
    },
  },
];

export const editorials = [
  {
    slug: "tailoring",
    eyebrow: "The edit",
    title: "Tailoring, reconsidered",
    body: "Soft shoulders, generous volumes and cloth that moves. A wardrobe of jackets and trousers cut to be lived in.",
    cta: "Discover tailoring",
    image: {
      src: unsplash("1613915617430-8ab0fd7c6baf"),
      alt: "Black-and-white portrait of a model in a grey wool coat and wide trousers",
    },
  },
  {
    slug: "autumn-winter",
    eyebrow: "Campaign",
    title: "Autumn–Winter 2026",
    body: "Shot in the first cold light of the season: black wool, quiet movement and nothing that isn't needed.",
    cta: "View the campaign",
    image: {
      src: unsplash("1574015974293-817f0ebebb74"),
      alt: "Black-and-white portrait of a woman in black, hair caught by the wind",
      position: "50% 25%",
    },
  },
] satisfies Array<{
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  image: CatalogImage;
}>;

export const navigation = [
  { label: "New in", href: "/collections/new-in" },
  { label: "Women", href: "/collections/women" },
  { label: "Men", href: "/collections/men" },
  { label: "Bags", href: "/collections/bags" },
  { label: "Shoes", href: "/collections/shoes" },
  { label: "Eyewear", href: "/collections/eyewear" },
];
