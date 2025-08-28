import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Attribute, CategoryAttribute } from '@/lib/mockData'
import { Filter, Star } from 'lucide-react'

interface AttributePreviewProps {
  categoryId: string
  categoryName: string
  attributes: Attribute[]
  categoryAttributes: CategoryAttribute[]
}

export function AttributePreview({ categoryId, categoryName, attributes, categoryAttributes }: AttributePreviewProps) {
  const categoryAttrs = categoryAttributes
    .filter(ca => ca.categoryId === categoryId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(ca => ({
      ...ca,
      attribute: attributes.find(attr => attr.id === ca.attributeId)!
    }))
    .filter(ca => ca.attribute)

  const filterableAttributes = categoryAttrs.filter(ca => ca.attribute.isFilterable)
  const requiredAttributes = categoryAttrs.filter(ca => ca.isRequired)
  const optionalAttributes = categoryAttrs.filter(ca => !ca.isRequired)

  if (categoryAttrs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Preview - {categoryName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No attributes assigned to this category yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  const getAttributeTypeDisplay = (attr: Attribute) => {
    switch (attr.type) {
      case 'select':
        return 'Dropdown'
      case 'multi_select':
        return 'Multi-Select'
      case 'range':
        return 'Range Slider'
      case 'boolean':
        return 'Checkbox'
      case 'number':
        return 'Number Input'
      case 'text':
        return 'Text Input'
      default:
        return attr.type
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Frontend Filter Preview - {categoryName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filterableAttributes.length > 0 ? (
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Available Filters:</h4>
              {filterableAttributes.map(ca => (
                <div key={ca.attributeId} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{ca.attribute.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {getAttributeTypeDisplay(ca.attribute)}
                    </Badge>
                  </div>
                  
                  {ca.attribute.type === 'select' && ca.attribute.values && (
                    <div className="flex flex-wrap gap-1">
                      {ca.attribute.values.slice(0, 4).map(value => (
                        <Badge key={value.id} variant="secondary" className="text-xs">
                          {value.value}
                        </Badge>
                      ))}
                      {ca.attribute.values.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{ca.attribute.values.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {ca.attribute.type === 'range' && (
                    <div className="text-sm text-muted-foreground">
                      Range: {ca.attribute.minValue} - {ca.attribute.maxValue}
                      {ca.attribute.unit && ` ${ca.attribute.unit}`}
                    </div>
                  )}
                  
                  {ca.attribute.type === 'boolean' && (
                    <div className="text-sm text-muted-foreground">
                      Yes/No checkbox
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-2">
              No filterable attributes for this category.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Product Form Attributes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {requiredAttributes.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-destructive mb-2">Required Attributes:</h4>
              <div className="space-y-2">
                {requiredAttributes.map(ca => (
                  <div key={ca.attributeId} className="flex items-center justify-between p-2 bg-destructive/5 rounded">
                    <span className="text-sm">{ca.attribute.name}</span>
                    <Badge variant="destructive" className="text-xs">
                      {getAttributeTypeDisplay(ca.attribute)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {optionalAttributes.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Optional Attributes:</h4>
              <div className="space-y-2">
                {optionalAttributes.map(ca => (
                  <div key={ca.attributeId} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm">{ca.attribute.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {getAttributeTypeDisplay(ca.attribute)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {requiredAttributes.length === 0 && optionalAttributes.length === 0 && (
            <p className="text-muted-foreground text-center py-2">
              No attributes configured for products in this category.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}