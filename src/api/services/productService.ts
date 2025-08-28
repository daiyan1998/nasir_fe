import { Product } from "@/types/Product.type"
import { apiClient } from "../client"
import { endpoints } from "../endPoints"

interface ProductListResponse {
  data: Product[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  };
}

export const productService = {
  // ============ READ OPERATIONS ============
  
  // Get all products with optional filters
  getProducts: async (params = {}) : Promise<any> => {
    const { data } = await apiClient.get<any>(endpoints.products, { params,
     })
    return data
  },

  // Get single product by ID
  getProductById: async (id) => {
    const { data } = await apiClient.get(endpoints.productById(id))
    return data
  },

  // Get products by category
  getProductsByCategory: async (categoryId, params = {}) => {
    const { data } = await apiClient.get(
      endpoints.productsByCategory(categoryId),
      { params }
    )
    return data
  },

  // Search products
  searchProducts: async (query, params = {}) => {
    const { data } = await apiClient.get(endpoints.products, {
      params: { search: query, ...params }
    })
    return data
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const { data } = await apiClient.get(endpoints.products, {
      params: { featured: true }
    })
    return data
  },

  // Get product reviews
  getProductReviews: async (productId, params = {}) => {
    const { data } = await apiClient.get(`${endpoints.productById(productId)}/reviews`, {
      params
    })
    return data
  },

  // Get products for admin (includes draft, archived, etc.)
  getAdminProducts: async (params = {}) => {
    const { data } = await apiClient.get('/admin/products', { params })
    return data
  },

  // Get product analytics/stats
  getProductStats: async (productId) => {
    const { data } = await apiClient.get(`${endpoints.productById(productId)}/stats`)
    return data
  },

  // ============ CREATE OPERATIONS ============
  
  // Create new product
  createProduct: async (productData : any) => {
    const { data } = await apiClient.post(endpoints.products, productData)
    return data
  },

  // Create product with images

  // Duplicate existing product
  duplicateProduct: async (productId, newProductData = {}) => {
    const { data } = await apiClient.post(`${endpoints.productById(productId)}/duplicate`, 
      newProductData
    )
    return data
  },

  // ============ UPDATE OPERATIONS ============

  // Update product
  updateProduct: async (productId, productData) => {
    const { data } = await apiClient.put(endpoints.productById(productId), productData)
    return data
  },

  // Partial update product
  updateProductPartial: async (productId, updates) => {
    const { data } = await apiClient.patch(endpoints.productById(productId), updates)
    return data
  },

  // Update product status (publish, draft, archive)
  updateProductStatus: async (productId, status) => {
    const { data } = await apiClient.patch(endpoints.productById(productId), {
      status
    })
    return data
  },

  // Update product inventory
  updateProductInventory: async (productId, inventoryData) => {
    const { data } = await apiClient.patch(`${endpoints.productById(productId)}/inventory`, 
      inventoryData
    )
    return data
  },

  // Update product pricing
  updateProductPricing: async (productId, pricingData) => {
    const { data } = await apiClient.patch(`${endpoints.productById(productId)}/pricing`, 
      pricingData
    )
    return data
  },

  // Add/Update product images
  updateProductImages: async (productId, images, imagesToDelete = []) => {
    const formData = new FormData()
    
    // Add new images
    images.forEach((image) => {
      formData.append('images', image)
    })

    // Add images to delete
    imagesToDelete.forEach((imageId) => {
      formData.append('deleteImages[]', imageId)
    })

    const { data } = await apiClient.patch(`${endpoints.productById(productId)}/images`, 
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return data
  },

  // Update product SEO data
  updateProductSEO: async (productId, seoData) => {
    const { data } = await apiClient.patch(`${endpoints.productById(productId)}/seo`, 
      seoData
    )
    return data
  },

  // Bulk update products
  bulkUpdateProducts: async (productIds, updates) => {
    const { data } = await apiClient.patch('/admin/products/bulk-update', {
      productIds,
      updates
    })
    return data
  },

  // ============ DELETE OPERATIONS ============

  // Delete product (soft delete)
  deleteProduct: async (productId) => {
    const { data } = await apiClient.delete(endpoints.productById(productId))
    return data
  },

  // Permanently delete product
  deleteProductPermanently: async (productId) => {
    const { data } = await apiClient.delete(`${endpoints.productById(productId)}/permanent`)
    return data
  },

  // Restore deleted product
  restoreProduct: async (productId) => {
    const { data } = await apiClient.patch(`${endpoints.productById(productId)}/restore`)
    return data
  },

  // Delete product image
  deleteProductImage: async (productId, imageId) => {
    const { data } = await apiClient.delete(`${endpoints.productById(productId)}/images/${imageId}`)
    return data
  },

  // Bulk delete products
  bulkDeleteProducts: async (productIds) => {
    const { data } = await apiClient.delete('/admin/products/bulk-delete', {
      data: { productIds }
    })
    return data
  },

  // ============ ADDITIONAL OPERATIONS ============

  // Add product variant
  addProductVariant: async (productId, variantData) => {
    const { data } = await apiClient.post(`${endpoints.productById(productId)}/variants`, 
      variantData
    )
    return data
  },

  // Update product variant
  updateProductVariant: async (productId, variantId, variantData) => {
    const { data } = await apiClient.put(
      `${endpoints.productById(productId)}/variants/${variantId}`, 
      variantData
    )
    return data
  },

  // Delete product variant
  deleteProductVariant: async (productId, variantId) => {
    const { data } = await apiClient.delete(
      `${endpoints.productById(productId)}/variants/${variantId}`
    )
    return data
  },

  // Import products from CSV/Excel
  importProducts: async (file, importOptions = {}) => {
    const formData = new FormData()
    formData.append('file', file)
    
    Object.keys(importOptions).forEach(key => {
      formData.append(key, importOptions[key])
    })

    const { data } = await apiClient.post('/admin/products/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  },

  // Export products to CSV/Excel
  exportProducts: async (filters = {}, format = 'csv') => {
    const response = await apiClient.get('/admin/products/export', {
      params: { ...filters, format },
      responseType: 'blob'
    })
    return response.data
  },

  // Get product export template
  getProductTemplate: async (format = 'csv') => {
    const response = await apiClient.get('/admin/products/template', {
      params: { format },
      responseType: 'blob'
    })
    return response.data
  }
}