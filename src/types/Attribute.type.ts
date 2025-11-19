import { CategoryAttribute } from "./Category.type";
import { ProductAttributeValue, ProductVariantAttributeValue } from "./Product.type";

export type AttributeType =
  | "TEXT"
  | "NUMBER"
  | "BOOLEAN"
  | "SELECT"
  | "MULTI_SELECT"
  | "RANGE";

export interface Attribute {
  id: string;
  name: string;
  slug: string;
  type: AttributeType;
  unit?: string;
  isFilterable: boolean;
  sortOrder: number;
  deletedAt?: string;

  categoryAttributes?: CategoryAttribute[];
  attributeValues?: AttributeValue[];
}


export interface AttributeValue {
  id?: string;
  value: string;
  attributeId?: string;

  attribute?: Attribute;
  productAttributeValues?: ProductAttributeValue[];
  productVariantAttributeValues?: ProductVariantAttributeValue[];
}

