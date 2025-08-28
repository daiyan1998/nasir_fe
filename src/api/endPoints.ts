import { categoryAttributes } from "@/lib/mockData";

export const endpoints = {
  // Products
  products: '/products',
  productById: (id: string) => `/products/${id}`,
  productsByCategory: (categoryId: string) => `/products/category/${categoryId}`,
  
  // Categories
  categories: '/categories',
  categoryById: (id: string) => `/categories/${id}`,
  categoryFilter: (slug:string) => `/categories/${slug}/filters`,

  // Attribues
  attributes: '/attributes',
  attributeById: (id: string) => `/attributes/${id}`,
  attributesImport: '/attributes/import',

  // Category Attributes
  assignAttributeToCategory: `/category-attributes/assign`,
  categoryAttributes: '/category-attributes',
  categoryAttributeById: (id: string) => `/category-attributes/${id}`,
  
  // Cart
  cart: '/cart',
  cartItem: (itemId: string) => `/cart/items/${itemId}`,
  
  // Orders
  orders: '/orders',
  orderById: (id: string) => `/orders/${id}`,
  
  // User
  user: '/user/profile',
  userOrders: '/user/orders',
  userWishlist: '/user/wishlist',
  
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  refreshToken: '/auth/refresh',
  logout: '/auth/logout',
}