export interface CartItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  sku: string;
  price: number | null;
  salePrice: number | null;
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  weight: string; // or consider `number` if consistently numeric
  dimensions: string | null; // adjust type if it's an object (e.g., { length: number; width: number; height: number })
  isActive: boolean;
  isFeatured: boolean;
  metaTitle: string | null;
  metaDesc: string | null;
  canonicalUrl: string | null;
  ogImage: string | null;
  structuredData: unknown | null; // or a more specific type if known
  deletedAt: string | null; // ISO 8601 date string
  categoryId: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  attributeValues: unknown[]; // replace `unknown` with actual type if defined
  images: string[];
  variants: unknown[]; // replace with `ProductVariant[]` if you have a variant interface
  originalPrice: string; // could also be `number` — see note below
  availability: string;
  rating: number;
  reviews: number;
  colors: {
    name: string;
    color: string; // hex, rgb, or named color
  }[];
  sizes: string[];
  features: string[];
  specifications: {
    label: string;
    value?: string; // optional since some entries lack `value`
  }[];
  quantity: number;
}