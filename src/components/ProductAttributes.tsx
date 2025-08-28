import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";

type AttributeItem = { value: string; color: string | null };
type GroupedAttributes = Record<string, AttributeItem[]>;

type ProductAttributesProps = {
  product: any;
  onSelectionChange?: (selections: Record<string, string>) => void;
};

const ProductAttributes = ({ product, onSelectionChange }: ProductAttributesProps) => {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const attributeValues: Array<{ attributeValue: any }> = Array.isArray(product?.attributeValues)
    ? (product.attributeValues as Array<{ attributeValue: any }>)
    : [];

  const groupedAttributes: GroupedAttributes | undefined = attributeValues.length
    ? attributeValues.reduce((acc, { attributeValue }) => {
        const { attribute, value } = attributeValue;
        if (!acc[attribute.name]) acc[attribute.name] = [];
        acc[attribute.name].push({
          value: attribute.unit ? `${value} ${attribute.unit}` : value,
          color: attributeValue.color || null
        });
        return acc;
      }, {} as GroupedAttributes)
    : undefined;

  if (!groupedAttributes) return null;

  const handleSelect = (attributeName: string, value: string) => {
    const newSelections = { ...selections, [attributeName]: value };
    setSelections(newSelections);
    onSelectionChange?.(newSelections);
  };

  const isSelected = (attributeName: string, value: string) => selections[attributeName] === value;

  return (
    <div className="w-full grid grid-cols-2 gap-4 ">
      {Object.entries(groupedAttributes).map(([name, items]) => (
        <div key={name} className="border-[1px] border-slate-200 rounded-md p-4">
          <div className="text-sm font-semibold text-slate-900 mb-2">
            {name}:
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map(({ value, color }, i) => (
              <button
                key={i}
                onClick={() => handleSelect(name, value)}
               
              >
                {/* {color && (
                  <span
                    className="w-4 h-4 rounded-full border border-slate-300"
                    style={{ backgroundColor: color }}
                  />
                )} */}
                <Badge  variant={isSelected(name, value) ? "default" : "secondary"}>{value}</Badge>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAttributes;