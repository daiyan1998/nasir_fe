import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable, Column } from '@/components/admin/DataTable'
import { Modal } from '@/components/ui/modal'
import { EnhancedProductForm } from '@/components/admin/EnhancedProductForm'
import { Plus, Package } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useCreateProduct, useDeleteProduct, useUpdateProduct } from '@/hooks/mutations/useProductMutation'
import { useGetProducts } from '@/hooks/queries/useProductQuery'
import { Product } from '@/types/Product.type'
import { getImageUrl } from '@/utils/getImageUrl'
import { PaginationV1 } from '@/components/PaginationV1'
import {useSearchParams} from 'react-router-dom';
import { DataTableSkeleton } from '@/components/admin/DataTableSkeleton'

export default function Products() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)

  // hooks
  const deleteProduct = useDeleteProduct()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const productsData = useGetProducts({ page, limit })
  const products = productsData.data?.data

  const totalPages = productsData.data?.meta.totalPages || 1


  const formatPrice = (price: number | string) => {
    const numaricPrice = typeof price === 'string' ? parseFloat(price) : price
    return `৳ ${numaricPrice.toFixed(2)}`
  }

  const getStatusBadge = (status: boolean) => {
    return status === true ? (
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
      key: 'images',
      header: 'Image',
      render: (product) => (
        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
          <img 
            src={getImageUrl(product.images[0]?.url)} 
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
      header: 'Category',
      render: (product) => (
        <div>
          <div className="font-medium">{product.category.name}</div>
          <div className="text-sm text-muted-foreground">{product.category.slug}</div>
        </div>
      )
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
      key: 'isActive',
      header: 'isActive',
      render: (product) => (
        <div className="flex items-center gap-2">
          {getStatusBadge(product.isActive)}
          {product.isFeatured && <Badge variant="outline">Featured</Badge>}
        </div>
      )
    },
    {
      key: 'tags',
      header: 'Tag',
      render: (product) => (
        <>
        {product.tags.map(t => (
          <Badge color={t.color}>
            {t.name}
          </Badge>
        ))}
        </>
      )
    }
    ,
    {
      key: 'actions',
      header: 'Actions'
    }
  ]


  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleDelete = (product: Product) => {
    deleteProduct.mutate(product.id)
  }

  const handleBulkDelete = (selectedProducts: Product[]) => {
    const selectedIds = selectedProducts.map(p => p.id)
    // setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)))
    // toast({
    //   title: "Products deleted",
    //   description: `${selectedProducts.length} products have been deleted.`
    // })
  }

  const handleBulkAction = (action: string, selectedProducts: Product[]) => {
    const selectedIds = selectedProducts.map(p => p.id)
    
    if (action === 'activate') {
      // setProducts(prev => prev.map(p => 
      //   selectedIds.includes(p.id) ? { ...p, status: 'active' as const } : p
      // ))
      toast({
        title: "Products activated",
        description: `${selectedProducts.length} products have been activated.`
      })
    }
  }

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
     updateProduct.mutate({ id: editingProduct.id, data: productData })
    } else {
      // Add new product
      createProduct.mutate(productData)
    }
    
    // setIsFormOpen(false)
    setEditingProduct(null)
  }

  const handleProductDuplicate = (product: Product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
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
            <div className="text-2xl font-bold">{products?.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">
              {products.data?.filter(p => p.status === 'active').length}
            </div> */}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products?.filter(p => p.stock < 10 && p.stock > 0).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products?.filter(p => p.stock === 0).length}
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
          {productsData.isLoading ? (
            <DataTableSkeleton columns={columns.length} />
          ) : (
          <DataTable
            data={products || []}
            columns={columns}
            searchKey="name"
            // filters={filters}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBulkDelete={handleBulkDelete}
            onBulkAction={handleBulkAction}
          />
          )}
        </CardContent>
      </Card>

      <PaginationV1 page={page} totalPages={totalPages} onPageChange={(newPage) => setSearchParams({ page: newPage.toString() })} />

      {/* Product Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        description={editingProduct ? 'Update product information' : 'Create a new product for your store'}
        className="max-w-4xl"
      >
        <EnhancedProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={handleCloseForm}
        />
      </Modal>
    </div>
  )
}