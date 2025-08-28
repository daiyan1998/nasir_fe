import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react'
import { Attribute, ProductVariant } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface VariantFormRowProps {
  variant: ProductVariant
  index: number
  selectedAttributes: Attribute[]
  productName: string
  onChange: (variant: ProductVariant) => void
  onRemove: () => void
}

export function VariantFormRow({
  variant,
  index,
  selectedAttributes,
  productName,
  onChange,
  onRemove
}: VariantFormRowProps) {
  const [localVariant, setLocalVariant] = useState<ProductVariant>(variant)

  useEffect(() => {
    setLocalVariant(variant)
  }, [variant])

  const handleChange = (field: keyof ProductVariant, value: any) => {
    const updated = { ...localVariant, [field]: value }
    setLocalVariant(updated)
    onChange(updated)
  }

  const handleAttributeValueChange = (attributeId: string, valueId: string) => {
    const attribute = selectedAttributes.find(a => a.id === attributeId)
    const attributeValue = attribute?.values?.find(v => v.id === valueId)
    
    const existingIndex = localVariant.attributeValues.findIndex(av => {
      const attr = selectedAttributes.find(a => a.values?.some(v => v.id === av.attributeValueId))
      return attr?.id === attributeId
    })

    let newAttributeValues = [...localVariant.attributeValues]
    
    if (existingIndex >= 0) {
      newAttributeValues[existingIndex] = {
        attributeValueId: valueId,
        attributeName: attribute?.name,
        value: attributeValue?.value
      }
    } else {
      newAttributeValues.push({
        attributeValueId: valueId,
        attributeName: attribute?.name,
        value: attributeValue?.value
      })
    }

    handleChange('attributeValues', newAttributeValues)
  }

  const getAttributeValueId = (attributeId: string): string => {
    const attrValue = localVariant.attributeValues.find(av => {
      const attr = selectedAttributes.find(a => a.values?.some(v => v.id === av.attributeValueId))
      return attr?.id === attributeId
    })
    return attrValue?.attributeValueId || ''
  }

  const getVariantLabel = () => {
    if (localVariant.attributeValues.length === 0) return `Variant ${index + 1}`
    return localVariant.attributeValues.map(av => av.value).join(' / ')
  }

  return (
    <Card className={cn(!localVariant.isActive && 'opacity-60')}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h4 className="font-medium">{getVariantLabel()}</h4>
              <div className="flex items-center gap-2">
                <Label htmlFor={`active-${index}`} className="text-sm text-muted-foreground">
                  Active
                </Label>
                <Switch
                  id={`active-${index}`}
                  checked={localVariant.isActive}
                  onCheckedChange={(checked) => handleChange('isActive', checked)}
                />
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onRemove}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          {/* Attribute Values Selection */}
          {selectedAttributes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedAttributes.map(attribute => (
                <div key={attribute.id} className="space-y-2">
                  <Label htmlFor={`${index}-${attribute.id}`}>
                    {attribute.name}
                  </Label>
                  <Select
                    value={getAttributeValueId(attribute.id)}
                    onValueChange={(value) => handleAttributeValueChange(attribute.id, value)}
                  >
                    <SelectTrigger id={`${index}-${attribute.id}`}>
                      <SelectValue placeholder={`Select ${attribute.name.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {attribute.values?.map(value => (
                        <SelectItem key={value.id} value={value.id}>
                          {value.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          )}

          {/* Variant Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`sku-${index}`}>
                SKU <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`sku-${index}`}
                placeholder="PROD-001"
                value={localVariant.sku}
                onChange={(e) => handleChange('sku', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`price-${index}`}>
                Price <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`price-${index}`}
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={localVariant.price || ''}
                onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`salePrice-${index}`}>Sale Price</Label>
              <Input
                id={`salePrice-${index}`}
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={localVariant.salePrice || ''}
                onChange={(e) => handleChange('salePrice', e.target.value ? parseFloat(e.target.value) : undefined)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`stock-${index}`}>
                Stock <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`stock-${index}`}
                type="number"
                min="0"
                placeholder="0"
                value={localVariant.stock || ''}
                onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`weight-${index}`}>Weight (kg)</Label>
              <Input
                id={`weight-${index}`}
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={localVariant.weight || ''}
                onChange={(e) => handleChange('weight', e.target.value ? parseFloat(e.target.value) : undefined)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}