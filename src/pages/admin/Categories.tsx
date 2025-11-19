import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { CategoryForm } from '@/components/admin/CategoryForm'
import { TreeView } from '@/components/admin/TreeView'
import { Plus, FolderTree, Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useCreateCategory, useDeleteCategory, useUpdateCategory } from '@/hooks/mutations/useCategoryMutation'
import { useGetCategories } from '@/hooks/queries/useCategoryQuery'
import { buildCategoryTree } from '@/utils/buildCategoryTree'
import { Category } from '@/types/Category.type'

export default function Categories() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const { toast } = useToast()

  // hooks
  const { mutate: createCategory } = useCreateCategory()
  const {data: categoryData, isLoading : categoriesLoading} = useGetCategories()
  const categories = categoryData?.data
  const {mutate: deleteCategory} = useDeleteCategory()
  const {mutate: updateCategory} = useUpdateCategory()

  const nestedCategories = buildCategoryTree(categories)
  console.log('categories',categories)
  console.log(nestedCategories)

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
    updateCategory(category)
  }

  const handleDelete = (categoryId: string) => {
    deleteCategory(categoryId)
  }

  const handleToggleActive = (categoryId: string) => {
    const updateInTree = (items: Category[]): Category[] => {
      return items.map(item => {
        if (item.id === categoryId) {
          return { ...item, active: !item.isActive }
        }
        return {
          ...item,
          children: item.children ? updateInTree(item.children) : undefined
        }
      })
    }
    
    toast({
      title: "Category updated",
      description: "Category status has been updated."
    })
  }

  const handleReorder = (newOrder: Category[]) => {
    toast({
      title: "Categories reordered",
      description: "Category order has been updated."
    })
  }

  if(categoriesLoading) {
    return <div>Loading...</div>
  }

  const handleSaveCategory = (categoryData: Partial<Category>) => {
    createCategory(categoryData)
    if (editingCategory) {
      // Update existing category
      updateCategory(categoryData)
    } else {
      // Add new category
      const newCategory: Category = {
        id: Math.random().toString(36).substring(7),
        sortOrder: flattenCategories(categories).length + 1,
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
      } else {
        // Add as root category
      }
    }
    
    setIsFormOpen(false)
    setEditingCategory(null)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingCategory(null)
  }

  const totalCategories = flattenCategories(categories).length
  const activeCategories = flattenCategories(categories).filter(c => c.isActive).length

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
            data={nestedCategories}
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