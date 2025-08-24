import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable, Column } from '@/components/admin/DataTable'
import { Modal } from '@/components/ui/modal'
import { AttributeForm } from '@/components/admin/AttributeForm'
import { CategoryAttributeAssignment } from '@/components/admin/CategoryAttributeAssignment'
import { attributes as initialAttributes, Attribute, categoryAttributes as initialCategoryAttributes, CategoryAttribute } from '@/lib/mockData'
import { Plus, Settings, Filter, Type } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Attributes() {
  const [attributes, setAttributes] = useState<Attribute[]>(initialAttributes)
  const [categoryAttributes, setCategoryAttributes] = useState<CategoryAttribute[]>(initialCategoryAttributes)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false)
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null)
  const { toast } = useToast()

  const getTypeBadge = (type: string) => {
    const colors = {
      text: 'default',
      number: 'secondary',
      select: 'outline',
      boolean: 'destructive'
    }
    return <Badge variant={colors[type as keyof typeof colors] as any}>{type}</Badge>
  }

  const columns: Column<Attribute>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (attribute) => (
        <div>
          <div className="font-medium">{attribute.name}</div>
          <div className="text-sm text-muted-foreground">{attribute.slug}</div>
        </div>
      )
    },
    {
      key: 'type',
      header: 'Type',
      render: (attribute) => (
        <div className="flex items-center gap-2">
          {getTypeBadge(attribute.type)}
          {attribute.unit && (
            <span className="text-sm text-muted-foreground">({attribute.unit})</span>
          )}
        </div>
      )
    },
    {
      key: 'values',
      header: 'Values',
      render: (attribute) => (
        <div>
          {attribute.type === 'select' && attribute.values ? (
            <div className="text-sm">
              {attribute.values.slice(0, 3).map(v => v.value).join(', ')}
              {attribute.values.length > 3 && ` +${attribute.values.length - 3} more`}
            </div>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </div>
      )
    },
    {
      key: 'isFilterable',
      header: 'Filterable',
      render: (attribute) => (
        <Badge variant={attribute.isFilterable ? 'default' : 'secondary'}>
          {attribute.isFilterable ? 'Yes' : 'No'}
        </Badge>
      )
    },
    {
      key: 'usage',
      header: 'Usage',
      render: (attribute) => {
        const usageCount = categoryAttributes.filter(ca => ca.attributeId === attribute.id).length
        return <span className="text-sm">{usageCount} categories</span>
      }
    },
    {
      key: 'actions',
      header: 'Actions'
    }
  ]

  const filters = [
    {
      key: 'type' as keyof Attribute,
      label: 'Type',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Number', value: 'number' },
        { label: 'Select', value: 'select' },
        { label: 'Boolean', value: 'boolean' }
      ]
    },
    {
      key: 'isFilterable' as keyof Attribute,
      label: 'Filterable',
      options: [
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' }
      ]
    }
  ]

  const handleEdit = (attribute: Attribute) => {
    setEditingAttribute(attribute)
    setIsFormOpen(true)
  }

  const handleDelete = (attribute: Attribute) => {
    setAttributes(prev => prev.filter(a => a.id !== attribute.id))
    setCategoryAttributes(prev => prev.filter(ca => ca.attributeId !== attribute.id))
    toast({
      title: "Attribute deleted",
      description: `${attribute.name} has been deleted successfully.`
    })
  }

  const handleSaveAttribute = (attributeData: Partial<Attribute>) => {
    if (editingAttribute) {
      // Update existing attribute
      setAttributes(prev => prev.map(a => 
        a.id === editingAttribute.id 
          ? { ...a, ...attributeData } as Attribute
          : a
      ))
      toast({
        title: "Attribute updated",
        description: `${attributeData.name} has been updated successfully.`
      })
    } else {
      // Add new attribute
      const newAttribute: Attribute = {
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString().split('T')[0],
        ...attributeData
      } as Attribute
      
      setAttributes(prev => [newAttribute, ...prev])
      toast({
        title: "Attribute created",
        description: `${attributeData.name} has been created successfully.`
      })
    }
    
    setIsFormOpen(false)
    setEditingAttribute(null)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingAttribute(null)
  }

  const handleSaveCategoryAttributes = (newCategoryAttributes: CategoryAttribute[]) => {
    setCategoryAttributes(newCategoryAttributes)
    setIsAssignmentOpen(false)
    toast({
      title: "Category attributes updated",
      description: "Attribute assignments have been saved successfully."
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attributes</h1>
          <p className="text-muted-foreground">
            Manage product attributes and their assignments to categories
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setIsAssignmentOpen(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Assign to Categories
          </Button>
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-brand-orange hover:bg-brand-orange/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Attribute
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attributes</CardTitle>
            <Type className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attributes.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filterable</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attributes.filter(a => a.isFilterable).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Select Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attributes.filter(a => a.type === 'select').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryAttributes.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Attributes Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Attributes</CardTitle>
          <CardDescription>
            Manage product attributes that can be assigned to categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={attributes}
            columns={columns}
            searchKey="name"
            filters={filters}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Attribute Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingAttribute ? 'Edit Attribute' : 'Add New Attribute'}
        description={editingAttribute ? 'Update attribute information' : 'Create a new product attribute'}
        className="max-w-2xl"
      >
        <AttributeForm
          attribute={editingAttribute}
          onSave={handleSaveAttribute}
          onCancel={handleCloseForm}
        />
      </Modal>

      {/* Category Attribute Assignment Modal */}
      <Modal
        isOpen={isAssignmentOpen}
        onClose={() => setIsAssignmentOpen(false)}
        title="Assign Attributes to Categories"
        description="Configure which attributes should be available for each category"
        className="max-w-4xl"
      >
        <CategoryAttributeAssignment
          attributes={attributes}
          categoryAttributes={categoryAttributes}
          onSave={handleSaveCategoryAttributes}
          onCancel={() => setIsAssignmentOpen(false)}
        />
      </Modal>
    </div>
  )
}