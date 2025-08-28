import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImageUploader } from './ImageUploader'
import { Category } from '@/lib/mockData'

interface CategoryFormProps {
  category?: Category | null
  categories: Category[]
  onSave: (data: Partial<Category>) => void
  onCancel: () => void
}

interface CategoryFormData  {
  id?: string
  name: string
  slug: string
  description: string
  parentId: string | null
  image: string
  isActive: boolean
}

export function CategoryForm({ category, categories, onSave, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
    parentId: null,
    image: '',
    isActive: true
  })
  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        parentId: category.parentId || null,
        image: category.image || '',
        isActive: category.active
      })
    }
  }, [category])

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
      slug: category ? prev.slug : generateSlug(name)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  // Get available parent categories (exclude current category and its children)
  const availableParents = categories.filter(cat => 
    cat.id !== category?.id && !cat.parentId
  )

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
              placeholder="Enter category name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="category-slug"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter category description"
            rows={3}
          />
        </div>
      </div>

      {/* Hierarchy */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Hierarchy</h3>
        
        <div className="space-y-2">
          <Label htmlFor="parentId">Parent Category</Label>
          <Select
            value={formData.parentId || "none"}
            onValueChange={(value) => setFormData(prev => ({ ...prev, parentId: value === "none" ? null : value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select parent category (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (Root Category)</SelectItem>
              {availableParents.map((parent) => (
                <SelectItem key={parent.id} value={parent.id}>
                  {parent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Media */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Media</h3>
        
        <div className="space-y-2">
          <Label>Category Image</Label>
          <ImageUploader
            images={formData.image ? [{ id: '1', file: new File([''], 'placeholder'), preview: formData.image }] : []}
            onImagesChange={(images) => setFormData(prev => ({ ...prev, image: images[0]?.preview || '' }))}
            maxImages={1}
          />
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Settings</h3>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="active">Active Status</Label>
            <p className="text-sm text-muted-foreground">
              Inactive categories won't be visible on the storefront
            </p>
          </div>
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90">
          {category ? 'Update Category' : 'Create Category'}
        </Button>
      </div>
    </form>
  )
}