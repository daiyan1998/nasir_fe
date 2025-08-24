import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Attribute, AttributeValue } from '@/lib/mockData'
import { Plus, X, GripVertical } from 'lucide-react'

interface AttributeFormProps {
  attribute?: Attribute | null
  onSave: (data: Partial<Attribute>) => void
  onCancel: () => void
}

export function AttributeForm({ attribute, onSave, onCancel }: AttributeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    type: 'text' as 'text' | 'number' | 'select' | 'boolean',
    unit: '',
    isFilterable: true,
    values: [] as AttributeValue[]
  })

  useEffect(() => {
    if (attribute) {
      setFormData({
        name: attribute.name,
        slug: attribute.slug,
        type: attribute.type,
        unit: attribute.unit || '',
        isFilterable: attribute.isFilterable,
        values: attribute.values || []
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
      values: type === 'select' ? prev.values : []
    }))
  }

  const handleAddValue = () => {
    const newValue: AttributeValue = {
      id: Math.random().toString(36).substring(7),
      value: '',
      order: formData.values.length + 1
    }
    setFormData(prev => ({
      ...prev,
      values: [...prev.values, newValue]
    }))
  }

  const handleUpdateValue = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.map(v => v.id === id ? { ...v, value } : v)
    }))
  }

  const handleRemoveValue = (id: string) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter(v => v.id !== id)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate select type has values
    if (formData.type === 'select' && formData.values.length === 0) {
      alert('Select type attributes must have at least one value')
      return
    }
    
    const dataToSave = {
      ...formData,
      values: formData.type === 'select' ? formData.values : undefined
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
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="select">Select (Dropdown)</SelectItem>
                <SelectItem value="boolean">Boolean (Yes/No)</SelectItem>
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
      </div>

      {/* Select Values */}
      {formData.type === 'select' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Select Values</h3>
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
              {formData.values.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No values added yet. Click "Add Value" to create options.
                </p>
              ) : (
                formData.values.map((value, index) => (
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