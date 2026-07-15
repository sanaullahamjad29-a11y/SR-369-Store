export const CATEGORIES = ["Stationery", "Ceramics", "Botanicals", "Apparel", "Home & Table"];

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
}

export const seedProducts: Product[] = [
  {
    id: "seed-1",
    title: "Hand-thrown Speckled Mug",
    category: "Ceramics",
    price: 28,
    stock: 14,
    description: "A stoneware mug thrown on a slow wheel and glazed in oatmeal speckle. Holds a generous 12oz pour.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
  },
  {
    id: "seed-2",
    title: "Pressed Botanical Notecards, Set of 8",
    category: "Stationery",
    price: 16,
    stock: 32,
    description: "Eight letterpress cards featuring pressed clippings from the shop garden printed on cotton stock.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
  },
  {
    id: "seed-3",
    title: "Waxed Canvas Market Tote",
    category: "Apparel",
    price: 54,
    stock: 7,
    description: "A field-weight waxed canvas tote with saddle-leather straps, reinforced corners, and brass snaps.",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
  },
];