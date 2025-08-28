import { AttributeValue } from "./Attribute.type";
import { Category } from "./Category.type";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDesc?: string;
  sku: string;
  price: number;
  salePrice?: number;
  stock: number;
  lowStockThreshold?: number;
  trackInventory: boolean;
  weight?: number;
  dimensions?: string; // e.g. JSON string {length, width, height}
  isActive: boolean;
  isFeatured: boolean;
  metaTitle?: string;
  metaDesc?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: any;
  deletedAt?: string;

  categoryId: string;
  category?: Category;
  images?: ProductImage[];
  variants?: ProductVariant[];
  attributeValues?: ProductAttributeValue[];

  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductAttributeValue {
  id: string;
  productId: string;
  attributeValueId: string;

  product?: Product;
  attributeValue?: AttributeValue;
}


export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  salePrice?: number;
  stock: number;
  isActive: boolean;
  weight?: number;
  deletedAt?: string;

  productId: string;
  product?: Product;
  attributeValues?: ProductVariantAttributeValue[];

  createdAt: string;
  updatedAt: string;
}


export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  salePrice?: number;
  stock: number;
  isActive: boolean;
  weight?: number;
  deletedAt?: string;

  productId: string;
  product?: Product;
  attributeValues?: ProductVariantAttributeValue[];

  createdAt: string;
  updatedAt: string;
}


export interface ProductVariantAttributeValue {
  id: string;
  variantId: string;
  attributeValueId: string;

  variant?: ProductVariant;
  attributeValue?: AttributeValue;
}


