export interface CartItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  specifications?: string;
  shortDesc?: string;
  sku?: string;
  salePrice?: number | null;
  stock?: number;
  lowStockThreshold?: number;
  trackInventory?: boolean;
  weight?: number; 
  dimensions?: string | null; 
  isActive?: boolean;
  isFeatured?: boolean;
  metaTitle?: string | null;
  metaDesc?: string | null;
  canonicalUrl?: string | null;
  ogImage?: string | null;
  structuredData?: unknown | null; 
  deletedAt?: string | null; 
  categoryId?: string;
  createdAt?: string; 
  updatedAt?: string; 
  attributeValues?: unknown[]; 
  images?: string[];
  variants?: unknown[]; // replace with `ProductVariant[]` if you have a variant interface
  price?: number | null;
  availability?: string;
  rating?: number;
  reviews?: number;
  colors?: {
    name: string;
    color: string; // hex, rgb, or named color
  }[];
  sizes?: string[];
  features?: string[];
  quantity: number;
  selectedOptions: {
    [key: string]: string;
  };
}