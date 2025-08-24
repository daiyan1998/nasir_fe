import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { CategoryForm } from '@/components/admin/CategoryForm'
import { TreeView } from '@/components/admin/TreeView'
import { categories as initialCategories, Category } from '@/lib/mockData'
import { Plus, FolderTree, Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const { toast } = useToast()

  const flattenCategories = (cats: Category[]): Category[] => {
    const result: Category[] = []
    
    const traverse = (items: Category[], parentId?: string) => {
      items.forEach(item => {
        result.push({ ...item, parentId })
        if (item.children) {
          traverse(item.children, item.id)
        }
      })
    }
    
    traverse(cats)
    return result
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsFormOpen(true)
  }

  const handleDelete = (categoryId: string) => {
    const deleteFromTree = (items: Category[]): Category[] => {
      return items
        .filter(item => item.id !== categoryId)
        .map(item => ({
          ...item,
          children: item.children ? deleteFromTree(item.children) : undefined
        }))
    }
    
    setCategories(deleteFromTree(categories))
    toast({
      title: "Category deleted",
      description: "Category has been deleted successfully."
    })
  }

  const handleToggleActive = (categoryId: string) => {
    const updateInTree = (items: Category[]): Category[] => {
      return items.map(item => {
        if (item.id === categoryId) {
          return { ...item, active: !item.active }
        }
        return {
          ...item,
          children: item.children ? updateInTree(item.children) : undefined
        }
      })
    }
    
    setCategories(updateInTree(categories))
    toast({
      title: "Category updated",
      description: "Category status has been updated."
    })
  }

  const handleReorder = (newOrder: Category[]) => {
    setCategories(newOrder)
    toast({
      title: "Categories reordered",
      description: "Category order has been updated."
    })
  }

  const handleSaveCategory = (categoryData: Partial<Category>) => {
    if (editingCategory) {
      // Update existing category
      const updateInTree = (items: Category[]): Category[] => {
        return items.map(item => {
          if (item.id === editingCategory.id) {
            return { ...item, ...categoryData } as Category
          }
          return {
            ...item,
            children: item.children ? updateInTree(item.children) : undefined
          }
        })
      }
      
      setCategories(updateInTree(categories))
      toast({
        title: "Category updated",
        description: `${categoryData.name} has been updated successfully.`
      })
    } else {
      // Add new category
      const newCategory: Category = {
        id: Math.random().toString(36).substring(7),
        order: flattenCategories(categories).length + 1,
        active: true,
        ...categoryData
      } as Category
      
      if (categoryData.parentId) {
        // Add as child category
        const addToTree = (items: Category[]): Category[] => {
          return items.map(item => {
            if (item.id === categoryData.parentId) {
              return {
                ...item,
                children: [...(item.children || []), newCategory]
              }
            }
            return {
              ...item,
              children: item.children ? addToTree(item.children) : undefined
            }
          })
        }
        setCategories(addToTree(categories))
      } else {
        // Add as root category
        setCategories(prev => [...prev, newCategory])
      }
      
      toast({
        title: "Category created",
        description: `${categoryData.name} has been created successfully.`
      })
    }
    
    setIsFormOpen(false)
    setEditingCategory(null)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingCategory(null)
  }

  const totalCategories = flattenCategories(categories).length
  const activeCategories = flattenCategories(categories).filter(c => c.active).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Organize your products into categories and subcategories
          </p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-brand-orange hover:bg-brand-orange/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCategories}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Categories</CardTitle>
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories - activeCategories}</div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Tree */}
      <Card>
        <CardHeader>
          <CardTitle>Category Hierarchy</CardTitle>
          <CardDescription>
            Drag and drop to reorder categories. Click to edit or manage subcategories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TreeView
            data={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
            onReorder={handleReorder}
          />
        </CardContent>
      </Card>

      {/* Category Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
        description={editingCategory ? 'Update category information' : 'Create a new category for your products'}
        className="max-w-2xl"
      >
        <CategoryForm
          category={editingCategory}
          categories={flattenCategories(categories)}
          onSave={handleSaveCategory}
          onCancel={handleCloseForm}
        />
      </Modal>
    </div>
  )
}