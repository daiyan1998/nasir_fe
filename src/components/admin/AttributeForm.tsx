import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
// import { Attribute, AttributeValue } from '@/lib/mockData'
import { Plus, X, GripVertical } from 'lucide-react'
import { Attribute, AttributeValue } from '@/types/Attribute.type'

interface AttributeFormProps {
  attribute?: Attribute | null
  onSave: (data: Partial<Attribute>) => void
  onCancel: () => void
}

export function AttributeForm({ attribute, onSave, onCancel }: AttributeFormProps) {
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    type: 'TEXT' as 'TEXT' | 'NUMBER' | 'SELECT' | 'MULTI_SELECT' | 'BOOLEAN' | 'RANGE',
    unit: '',
    isFilterable: true,
    // required: false,
    attributeValues: [] as AttributeValue[],
    // minValue: 0,
    // maxValue: 100
  })

  useEffect(() => {
    if (attribute) {
      setFormData({
        name: attribute.name,
        slug: attribute.slug,
        type: attribute.type,
        unit: attribute.unit || '',
        isFilterable: attribute.isFilterable,
        // required: attribute.required || false,
        attributeValues: attribute.attributeValues || [],
        // minValue: attribute.minValue || 0,
        // maxValue: attribute.maxValue || 100
      })
    }
  }, [attribute])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: attribute ? prev.slug : generateSlug(name)
    }))
  }

  const handleTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      type: type as any,
      attributeValues: (type === 'select' || type === 'multi_select') ? prev.attributeValues : []
    }))
  }

  const handleAddValue = () => {
    const newValue: AttributeValue = {
      id: Math.random().toString(36).substring(7),
      value: '',
      // order: formData.attributeValues.length + 1
    }
    setFormData(prev => ({
      ...prev,
      attributeValues: [...prev.attributeValues, newValue]
    }))
  }

  const handleUpdateValue = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      attributeValues: prev.attributeValues.map(v => v.id === id ? { ...v, value } : v)
    }))
  }

  const handleRemoveValue = (id: string) => {
    setFormData(prev => ({
      ...prev,
      attributeValues: prev.attributeValues.filter(v => v.id !== id)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate select/multi_select type has values
    if ((formData.type === 'SELECT' || formData.type === 'MULTI_SELECT') && formData.attributeValues.length === 0) {
      alert('Select and Multi-select type attributes must have at least one value')
      return
    }
    
    // Validate range type has min/max values
    // if (formData.type === 'RANGE' && (formData.minValue >= formData.maxValue)) {
    //   alert('Range type attributes must have valid min and max values')
    //   return
    // }
    
    const dataToSave = {
      ...formData,
      attributeValues: (formData.type === 'SELECT' || formData.type === 'MULTI_SELECT') ? formData.attributeValues : undefined,
      // minValue: formData.type === 'RANGE' ? formData.minValue : undefined,
      // maxValue: formData.type === 'RANGE' ? formData.maxValue : undefined
    }
    onSave(dataToSave)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter attribute name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="attribute-slug"
              required
            />
          </div>
        </div>
      </div>

      {/* Type & Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Type & Configuration</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Select
              value={formData.type}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TEXT">Text</SelectItem>
                <SelectItem value="NUMBER">Number</SelectItem>
                <SelectItem value="SELECT">Select (Dropdown)</SelectItem>
                <SelectItem value="MULTI_SELECT">Multi-Select</SelectItem>
                <SelectItem value="BOOLEAN">Boolean (Yes/No)</SelectItem>
                <SelectItem value="RANGE">Range (Min/Max)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Input
              id="unit"
              value={formData.unit}
              onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
              placeholder="e.g., GB, inches, years"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="isFilterable">Filterable</Label>
              <p className="text-sm text-muted-foreground">
                Allow customers to filter products by this attribute
              </p>
            </div>
            <Switch
              id="isFilterable"
              checked={formData.isFilterable}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFilterable: checked }))}
            />
          </div>
          
          {/* <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="required">Required</Label>
              <p className="text-sm text-muted-foreground">
                This attribute is required for products
              </p>
            </div>
            <Switch
              id="required"
              checked={formData.required}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, required: checked }))}
            />
          </div> */}
        </div>
      </div>

      {/* Range Values */}
      {/* {formData.type === 'RANGE' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Range Configuration</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minValue">Minimum Value</Label>
              <Input
                id="minValue"
                type="number"
                value={formData.minValue}
                onChange={(e) => setFormData(prev => ({ ...prev, minValue: parseFloat(e.target.value) || 0 }))}
                placeholder="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxValue">Maximum Value</Label>
              <Input
                id="maxValue"
                type="number"
                value={formData.maxValue}
                onChange={(e) => setFormData(prev => ({ ...prev, maxValue: parseFloat(e.target.value) || 100 }))}
                placeholder="100"
              />
            </div>
          </div>
        </div>
      )} */}

      {/* Select/Multi-Select Values */}
      {(formData.type === 'SELECT' || formData.type === 'MULTI_SELECT') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              {formData.type === 'SELECT' ? 'Select Values' : 'Multi-Select Values'}
            </h3>
            <Button type="button" variant="outline" size="sm" onClick={handleAddValue}>
              <Plus className="mr-2 h-4 w-4" />
              Add Value
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Available Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.attributeValues.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No values added yet. Click "Add Value" to create options.
                </p>
              ) : (
                formData.attributeValues.map((value, index) => (
                  <div key={value.id} className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                    <Input
                      value={value.value}
                      onChange={(e) => handleUpdateValue(value.id, e.target.value)}
                      placeholder="Enter value"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveValue(value.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90">
          {attribute ? 'Update Attribute' : 'Create Attribute'}
        </Button>
      </div>
    </form>
  )
}