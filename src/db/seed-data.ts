// Sample catalog used to seed the database (`npm run db:seed`).
// Photography: Unsplash (https://unsplash.com/license).

import type { ProductImage } from "./schema";

export type SeedCategory = {
  slug: string;
  name: string;
  careInstructions: string;
};

export type SeedProduct = {
  slug: string;
  name: string;
  /** Slug of a category in `categories`. */
  category: string;
  /** Price in USD cents. */
  price: number;
  stock: number;
  images: [ProductImage, ...ProductImage[]];
  description: string;
  details: string[];
  badge?: string;
};

/** `rect` crops a region (x,y,w,h as fractions) for detail shots. */
const unsplash = (id: string, rect?: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop${rect ? `&rect=${rect}` : ""}`;

const leatherCare =
  "Store in the dust bag provided, away from direct sunlight. Wipe with a soft dry cloth; avoid water and solvents.";

export const categories: SeedCategory[] = [
  { slug: "bags", name: "Bags", careInstructions: leatherCare },
  {
    slug: "shoes",
    name: "Shoes",
    careInstructions:
      "Use shoe trees between wears and polish with a neutral cream. Resole through our client services.",
  },
  {
    slug: "eyewear",
    name: "Eyewear",
    careInstructions:
      "Clean lenses with the microfibre cloth provided. Store in the case to protect the frame and hinges.",
  },
];

/** Listed newest first: the seed gives earlier entries later `created_at` values. */
export const products: SeedProduct[] = [
  {
    slug: "cognac-doctor-bag",
    name: "Cognac leather doctor bag",
    category: "bags",
    price: 289000,
    stock: 8,
    badge: "New in",
    images: [
      {
        src: unsplash("1691480150204-66dd1eb77391"),
        alt: "Cognac leather doctor bag with buckled front pocket",
      },
      {
        src: unsplash("1691480150204-66dd1eb77391", "0.25,0.08,0.5,0.45"),
        alt: "Rolled leather handles and buckle hardware, close up",
      },
      {
        src: unsplash("1691480150204-66dd1eb77391", "0.06,0.42,0.42,0.45"),
        alt: "Front pocket with tonal edge stitching, close up",
      },
    ],
    description:
      "A structured doctor bag in polished calf leather, with a wide frame opening and a buckled front pocket for the things you reach for most.",
    details: [
      "Polished calf leather",
      "Cotton-linen lining",
      "Antiqued silver-tone hardware",
      "Detachable shoulder strap",
      "W 34 × H 24 × D 15 cm",
      "Made in Italy",
    ],
  },
  {
    slug: "studded-top-handle",
    name: "Studded top-handle bag",
    category: "bags",
    price: 315000,
    stock: 2,
    badge: "New in",
    images: [
      {
        src: unsplash("1691480250099-a63081ecfcb8"),
        alt: "Brown leather top-handle bag with studded base",
      },
      {
        src: unsplash("1691480250099-a63081ecfcb8", "0.35,0.33,0.45,0.45"),
        alt: "Twin buckled straps on the front flap, close up",
      },
      {
        src: unsplash("1691480250099-a63081ecfcb8", "0.58,0.55,0.38,0.38"),
        alt: "Protective metal studs on the base corner, close up",
      },
    ],
    description:
      "Soft vegetable-tanned leather shaped into a roomy top-handle bag, finished with protective studs on the base and hand-burnished edges.",
    details: [
      "Vegetable-tanned leather",
      "Suede lining",
      "Protective base studs",
      "Adjustable shoulder strap",
      "W 36 × H 28 × D 14 cm",
      "Made in Italy",
    ],
  },
  {
    slug: "slate-satchel",
    name: "Slate grained satchel",
    category: "bags",
    price: 219000,
    stock: 0,
    images: [
      {
        src: unsplash("1605733513597-a8f8341084e6"),
        alt: "Grey grained-leather satchel with twin buckles",
      },
      {
        src: unsplash("1605733513597-a8f8341084e6", "0.4,0.4,0.25,0.45"),
        alt: "Grained leather and gold-tone buckle, close up",
      },
      {
        src: unsplash("1605733513597-a8f8341084e6", "0.36,0.12,0.28,0.4"),
        alt: "Top handle with stitched leather keepers, close up",
      },
    ],
    description:
      "A compact satchel in pebble-grain leather that holds its shape, with twin buckled straps and a single top handle.",
    details: [
      "Pebble-grain calf leather",
      "Microfibre lining",
      "Gold-tone hardware",
      "Top handle",
      "W 28 × H 21 × D 10 cm",
      "Made in Spain",
    ],
  },
  {
    slug: "nude-stiletto-pump",
    name: "Nude stiletto pump",
    category: "shoes",
    price: 89500,
    stock: 14,
    images: [
      {
        src: unsplash("1519226719127-9e805abb99b1"),
        alt: "Nude pointed-toe stiletto pumps with red soles on printed linen",
      },
      {
        src: unsplash("1519226719127-9e805abb99b1", "0.15,0.25,0.35,0.6"),
        alt: "Lacquered red sole and stiletto heel, close up",
      },
      {
        src: unsplash("1519226719127-9e805abb99b1", "0.6,0.55,0.38,0.43"),
        alt: "Pointed toe in nude patent leather, close up",
      },
    ],
    description:
      "A pointed-toe pump in nude patent leather on a slender 100 mm heel. A wardrobe constant, made to be worn from morning into evening.",
    details: ["Patent calf leather", "Leather lining and sole", "100 mm heel", "Fits true to size", "Made in Italy"],
  },
  {
    slug: "split-toe-derby",
    name: "Split-toe leather derby",
    category: "shoes",
    price: 112000,
    stock: 5,
    images: [
      {
        src: unsplash("1783455042943-1a690e6dd46b"),
        alt: "Black split-toe leather derby shoes on a marble table",
        position: "50% 70%",
      },
      {
        src: unsplash("1783455042943-1a690e6dd46b", "0.08,0.55,0.62,0.42"),
        alt: "Split toe and rubber sole, close up",
      },
      {
        src: unsplash("1783455042943-1a690e6dd46b", "0.15,0.33,0.62,0.35"),
        alt: "Waxed laces and open throat, close up",
      },
    ],
    description:
      "Our derby reworked with a split toe. Brushed black calf leather on a lightweight rubber sole, Blake-stitched for flexibility.",
    details: ["Brushed calf leather", "Leather lining", "Rubber sole, Blake-stitched", "Fits large; size down", "Made in Portugal"],
  },
  {
    slug: "acetate-browline",
    name: "Acetate browline sunglasses",
    category: "eyewear",
    price: 52000,
    stock: 3,
    images: [
      {
        src: unsplash("1584036553516-bf83210aa16c"),
        alt: "Black browline sunglasses with gradient lenses on white",
      },
      {
        src: unsplash("1584036553516-bf83210aa16c", "0.15,0.4,0.42,0.2"),
        alt: "Gradient lens and acetate brow, close up",
      },
      {
        src: unsplash("1584036553516-bf83210aa16c", "0.52,0.39,0.36,0.17"),
        alt: "Metal rim and hinge, close up",
      },
    ],
    description:
      "A browline frame in hand-polished black acetate over a fine metal rim, fitted with grey gradient lenses.",
    details: ["Acetate and metal frame", "Grey gradient lenses", "100% UV protection", "Lens width 51 mm", "Made in Japan"],
  },
  {
    slug: "gold-round-frame",
    name: "Gold round-frame sunglasses",
    category: "eyewear",
    price: 48000,
    stock: 11,
    images: [
      {
        src: unsplash("1590564310418-66304f55a2c2"),
        alt: "Gold round-frame sunglasses beside a coffee cup",
      },
      {
        src: unsplash("1590564310418-66304f55a2c2", "0.28,0.45,0.35,0.45"),
        alt: "Dark green lens and thin gold rim, close up",
      },
      {
        src: unsplash("1590564310418-66304f55a2c2", "0.5,0.48,0.32,0.45"),
        alt: "Temple arm with acetate tip, close up",
      },
    ],
    description:
      "Slim round frames in gold-plated titanium with deep green mineral glass lenses. Light enough to forget you are wearing them.",
    details: ["Gold-plated titanium", "Green mineral glass lenses", "100% UV protection", "Lens width 49 mm", "Made in Japan"],
  },
  {
    slug: "crystal-frame",
    name: "Crystal frame sunglasses",
    category: "eyewear",
    price: 46000,
    stock: 0,
    images: [
      {
        src: unsplash("1577803645773-f96470509666"),
        alt: "Clear-framed sunglasses with brown lenses on a sunlit deck",
      },
      {
        src: unsplash("1577803645773-f96470509666", "0.3,0.28,0.3,0.4"),
        alt: "Clear acetate bridge and keyhole detail, close up",
      },
      {
        src: unsplash("1577803645773-f96470509666", "0.3,0.5,0.42,0.45"),
        alt: "Brown lenses casting shadows in sunlight, close up",
      },
    ],
    description:
      "A soft square frame in crystal-clear acetate with warm brown lenses, cut from a single block and polished by hand.",
    details: ["Crystal acetate", "Brown lenses", "100% UV protection", "Lens width 50 mm", "Made in Italy"],
  },
];
