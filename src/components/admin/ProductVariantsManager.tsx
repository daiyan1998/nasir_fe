import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2 } from 'lucide-react'
import { attributes, Attribute, AttributeValue, ProductVariant } from '@/lib/mockData'
import { toast } from '@/hooks/use-toast'
import { VariantFormRow } from './VariantFormRow'

interface ProductVariantsManagerProps {
  productId?: string
  productName: string
  initialVariants?: ProductVariant[]
  onVariantsChange: (variants: ProductVariant[]) => void
}

export function ProductVariantsManager({ 
  productId, 
  productName, 
  initialVariants = [], 
  onVariantsChange 
}: ProductVariantsManagerProps) {
  const [variants, setVariants] = useState<ProductVariant[]>(initialVariants)
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])
  const [availableAttributes, setAvailableAttributes] = useState<Attribute[]>([])

  useEffect(() => {
    // Filter attributes that are suitable for variants (select type)
    const variantAttributes = attributes.filter(
      attr => (attr.type === 'select' || attr.type === 'multi_select') && attr.values && attr.values.length > 0
    )
    setAvailableAttributes(variantAttributes)
  }, [])

  useEffect(() => {
    onVariantsChange(variants)
  }, [variants, onVariantsChange])

  const handleAddAttribute = (attributeId: string) => {
    if (!selectedAttributes.includes(attributeId)) {
      setSelectedAttributes([...selectedAttributes, attributeId])
    }
  }

  const handleRemoveAttribute = (attributeId: string) => {
    setSelectedAttributes(selectedAttributes.filter(id => id !== attributeId))
    // Remove this attribute from all variants
    setVariants(variants.map(variant => ({
      ...variant,
      attributeValues: variant.attributeValues.filter(av => {
        const attr = attributes.find(a => a.values?.some(v => v.id === av.attributeValueId))
        return attr?.id !== attributeId
      })
    })))
  }

  const handleAddVariant = () => {
    const tempProductId = productId || `temp-product-${Date.now()}`
    
    const newVariant: ProductVariant = {
      id: `temp-${Date.now()}`,
      sku: '',
      price: 0,
      salePrice: undefined,
      stock: 0,
      weight: undefined,
      isActive: true,
      productId: tempProductId,
      attributeValues: []
    }
    setVariants([...variants, newVariant])
  }

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
    toast({
      title: 'Variant removed',
      description: 'The variant has been removed from the list.',
    })
  }

  const handleVariantChange = (index: number, updatedVariant: ProductVariant) => {
    const newVariants = [...variants]
    newVariants[index] = updatedVariant
    setVariants(newVariants)
  }

  const getSelectedAttributesData = () => {
    return selectedAttributes.map(attrId => 
      availableAttributes.find(attr => attr.id === attrId)
    ).filter(Boolean) as Attribute[]
  }

  const unselectedAttributes = availableAttributes.filter(
    attr => !selectedAttributes.includes(attr.id)
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Variants</CardTitle>
        <CardDescription>
          Create variants for {productName} by selecting attributes and adding variant combinations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Attribute Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Variant Attributes</h3>
            {unselectedAttributes.length > 0 && (
              <Select onValueChange={handleAddAttribute}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Add attribute" />
                </SelectTrigger>
                <SelectContent>
                  {unselectedAttributes.map(attr => (
                    <SelectItem key={attr.id} value={attr.id}>
                      {attr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {selectedAttributes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {getSelectedAttributesData().map(attr => (
                <Badge key={attr.id} variant="secondary" className="gap-2">
                  {attr.name}
                  <button
                    onClick={() => handleRemoveAttribute(attr.id)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Variants List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Variants ({variants.length})
            </h3>
            <Button
              type="button"
              onClick={handleAddVariant}
              size="sm"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Variant
            </Button>
          </div>

          {variants.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No variants yet. Click "Add Variant" to create one.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {variants.map((variant, index) => (
                <VariantFormRow
                  key={variant.id || index}
                  variant={variant}
                  index={index}
                  selectedAttributes={getSelectedAttributesData()}
                  productName={productName}
                  onChange={(updatedVariant) => handleVariantChange(index, updatedVariant)}
                  onRemove={() => handleRemoveVariant(index)}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
