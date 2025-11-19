import { Attribute } from "./Attribute.type";
import { Product } from "./Product.type";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  sortOrder: number;
  metaTitle?: string;
  metaDesc?: string;
  deletedAt?: string;

  parent?: Category;
  children?: Category[];
  products?: Product[];
  categoryAttributes?: CategoryAttribute[];
  categoryFilters?:  CategoryFilter[]

  createdAt: string;
  updatedAt: string;
}


export interface CategoryAttribute {
  id?: string;
  categoryId: string;
  attributeId: string;
  isRequired: boolean;
  isFilterable?: boolean;
  sortOrder: number;

  category?: Category;
  attribute?: Attribute;

  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryFilter {
  id: string;
  name: string;
  type: string; // e.g. "ATTRIBUTE" | "PRICE_RANGE"
  isActive: boolean;
  sortOrder: number;
  deletedAt: string | null;
  categoryId: string;
  attributeId: string | null;
  config: any | null;
  attribute: Attribute | null;
}

