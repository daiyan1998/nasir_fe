import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Brand } from "@/types/Brand.type";
// import { Category } from '@/lib/mockData'

interface BrandSelectorProps {
  brands: Brand[];
  value: string;
  onChange: (brandId: string) => void;
  required?: boolean;
  error?: string;
}

export function BrandSelector({
  brands,
  value,
  onChange,
  required = false,
  error,
}: BrandSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1">
        Brand
        {required && <span className="text-destructive">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={error ? "border-destructive" : ""}>
          <SelectValue placeholder="Select a brand" />
        </SelectTrigger>
        <SelectContent>
          {brands?.map((brand, index) => (
            <SelectItem key={`${brand.id}${index}`} value={brand.id}>
              <div className="flex items-center">
                <span>{brand.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
