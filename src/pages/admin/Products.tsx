import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable, Column } from '@/components/admin/DataTable'
import { Modal } from '@/components/ui/modal'
import { ProductForm } from '@/components/admin/ProductForm'
import { products as initialProducts, categories, Product } from '@/lib/mockData'
import { Plus, Package } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { toast } = useToast()

  const formatPrice = (price: number) => `$${price.toFixed(2)}`

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge variant="default">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    )
  }

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock < 10) {
      return <Badge variant="outline">Low Stock ({stock})</Badge>
    }
    return <span className="text-muted-foreground">{stock}</span>
  }

  const columns: Column<Product>[] = [
    {
      key: 'primaryImage',
      header: 'Image',
      render: (product) => (
        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
          <img 
            src={product.primaryImage} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      key: 'name',
      header: 'Name',
      render: (product) => (
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-muted-foreground">{product.sku}</div>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category'
    },
    {
      key: 'price',
      header: 'Price',
      render: (product) => (
        <div>
          <div className="font-medium">{formatPrice(product.price)}</div>
          {product.salePrice && (
            <div className="text-sm text-green-600">{formatPrice(product.salePrice)}</div>
          )}
        </div>
      )
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (product) => getStockBadge(product.stock)
    },
    {
      key: 'status',
      header: 'Status',
      render: (product) => (
        <div className="flex items-center gap-2">
          {getStatusBadge(product.status)}
          {product.featured && <Badge variant="outline">Featured</Badge>}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions'
    }
  ]

  const filters = [
    {
      key: 'category' as keyof Product,
      label: 'Category',
      options: categories.flatMap(cat => 
        cat.children ? cat.children.map(child => ({ 
          label: child.name, 
          value: child.name 
        })) : [{ label: cat.name, value: cat.name }]
      )
    },
    {
      key: 'status' as keyof Product,
      label: 'Status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
      ]
    }
  ]

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleDelete = (product: Product) => {
    setProducts(prev => prev.filter(p => p.id !== product.id))
    toast({
      title: "Product deleted",
      description: `${product.name} has been deleted successfully.`
    })
  }

  const handleBulkDelete = (selectedProducts: Product[]) => {
    const selectedIds = selectedProducts.map(p => p.id)
    setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)))
    toast({
      title: "Products deleted",
      description: `${selectedProducts.length} products have been deleted.`
    })
  }

  const handleBulkAction = (action: string, selectedProducts: Product[]) => {
    const selectedIds = selectedProducts.map(p => p.id)
    
    if (action === 'activate') {
      setProducts(prev => prev.map(p => 
        selectedIds.includes(p.id) ? { ...p, status: 'active' as const } : p
      ))
      toast({
        title: "Products activated",
        description: `${selectedProducts.length} products have been activated.`
      })
    }
  }

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData } as Product
          : p
      ))
      toast({
        title: "Product updated",
        description: `${productData.name} has been updated successfully.`
      })
    } else {
      // Add new product
      const newProduct: Product = {
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString().split('T')[0],
        ...productData
      } as Product
      
      setProducts(prev => [newProduct, ...prev])
      toast({
        title: "Product created",
        description: `${productData.name} has been created successfully.`
      })
    }
    
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-brand-orange hover:bg-brand-orange/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter(p => p.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter(p => p.stock < 10 && p.stock > 0).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter(p => p.stock === 0).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            View and manage all products in your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={products}
            columns={columns}
            searchKey="name"
            filters={filters}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBulkDelete={handleBulkDelete}
            onBulkAction={handleBulkAction}
          />
        </CardContent>
      </Card>

      {/* Product Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        description={editingProduct ? 'Update product information' : 'Create a new product for your store'}
        className="max-w-4xl"
      >
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={handleCloseForm}
        />
      </Modal>
    </div>
  )
}