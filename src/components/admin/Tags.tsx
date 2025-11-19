import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { DataTable } from '@/components/admin/DataTable'
import { Modal } from '@/components/ui/modal'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Tag } from '@/types/Tag.type'
import { generateSlug } from '@/lib/utils'
import { useCreateTag } from '@/hooks/mutations/useTagMutations'

export default function Tags() {
  const {mutate: createTag} = useCreateTag()

  const [tags, setTags] = useState<Tag[]>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  const [formData, setFormData] = useState<Partial<Tag>>({
    name: '',
    slug: '',
    color: '#3b82f6',
    active: true,
  })

  const columns = [
    {
      key: 'name' as keyof Tag,
      header: 'Name',
      sortable: true,
      render: (tag: Tag) => (
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: tag.color || '#3b82f6' }}
          />
          <span className="font-medium">{tag.name}</span>
        </div>
      ),
    },
    {
      key: 'slug' as keyof Tag,
      header: 'Slug',
      sortable: true,
    },
    {
      key: 'active' as keyof Tag,
      header: 'Status',
      sortable: true,
      render: (tag: Tag) => (
        <Badge variant={tag.active ? 'default' : 'secondary'}>
          {tag.active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'createdAt' as keyof Tag,
      header: 'Created',
      sortable: true,
    },
    {
      key: 'actions' as const,
      header: 'Actions',
      render: (tag: Tag) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEdit(tag)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(tag.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag)
    setFormData({
      name: tag.name,
      slug: tag.slug,
      color: tag.color || '#3b82f6',
      active: tag.active,
    })
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id))
    toast.success('Tag deleted successfully')
  }

  const handleBulkDelete = (items: Tag[]) => {
    const ids = items.map((tag) => tag.id)
    setTags(tags.filter((tag) => !ids.includes(tag.id)))
    toast.success(`${ids.length} tags deleted successfully`)
  }

  const handleSaveTag = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.slug) {
      toast.error('Please fill in all required fields')
      return
    }

    if (editingTag) {
      setTags(
        tags.map((tag) =>
          tag.id === editingTag.id
            ? {
                ...tag,
                ...formData,
                name: formData.name!,
                slug: formData.slug!,
                color: formData.color!,
                active: formData.active!,
              }
            : tag
        )
      )
      toast.success('Tag updated successfully')
    } else {
      const newTag: Omit<Tag, 'id'> = {
        name: formData.name!,
        slug: formData.slug!,
        color: formData.color!,
        active: formData.active ?? true,
      }
    //   setTags([...tags, newTag])
      createTag(newTag)
    }

    handleCloseForm()
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingTag(null)
    setFormData({
      name: '',
      slug: '',
      color: '#3b82f6',
      active: true,
    })
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tags</h1>
          <p className="text-muted-foreground mt-2">
            Manage product tags for better organization
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tag
        </Button>
      </div>

      <DataTable
        data={tags}
        columns={columns}
        onBulkDelete={handleBulkDelete}
      />

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingTag ? 'Edit Tag' : 'Add New Tag'}
        description="Fill in the details below to create or update a tag"
        className="max-w-lg"
      >
        <form onSubmit={handleSaveTag} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., New Arrival"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-destructive">*</span>
            </Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="new-arrival"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Tag Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-20 h-10"
              />
              <Input
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                placeholder="#3b82f6"
              />
            </div>
          </div>


          <div className="flex items-center justify-between">
            <Label htmlFor="active">Active</Label>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, active: checked })
              }
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCloseForm}>
              Cancel
            </Button>
            <Button type="submit">
              {editingTag ? 'Update Tag' : 'Create Tag'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
