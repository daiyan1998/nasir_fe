import { Attribute } from "./Attribute.type";

export interface CategoryAttribute {
  id: string;
  categoryId: string;
  attributeId: string;
  isRequired: boolean;
  sortOrder: number;
  attribute?: Attribute;
  createdAt: string;
  updatedAt: string;
}
