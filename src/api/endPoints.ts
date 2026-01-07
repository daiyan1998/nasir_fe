export const endpoints = {
  // Products
  products: "/products",
  productById: (id: string) => `/products/${id}`,
  productsByCategory: (categoryId: string) =>
    `/products/category/${categoryId}`,
  productsImages: ({
    productId,
    imageId,
  }: {
    productId: string;
    imageId: string;
  }) => `/products/${productId}/images/${imageId}`,
  productsSearch: `/products/search`,

  // Brands
  brands: "/brands",
  brandById: (id: string) => `/brands/${id}`,

  // Categories
  categories: "/categories",
  categoryById: (id: string) => `/categories/${id}`,
  categoryFilter: (slug: string) => `/categories/${slug}/filters`,

  // Attribues
  attributes: "/attributes",
  attributeById: (id: string) => `/attributes/${id}`,
  attributesImport: "/attributes/import",

  // Category Attributes
  assignAttributeToCategory: `/category-attributes/assign`,
  categoryAttributes: "/category-attributes",
  categoryAttributeById: (id: string) => `/category-attributes/${id}`,

  // Cart
  cart: "/cart",
  cartItem: (itemId: string) => `/cart/items/${itemId}`,

  // Orders
  orders: "/orders",
  orderById: (id: string) => `/orders/${id}`,
  orderStatus: (id: string) => `/orders/${id}/status`,
  orderTracking: `/orders/track`,

  // User
  users: "/users",
  usersById: (id: string) => `/users/${id}`,
  usersMe: "/users/me",
  userOrders: "/users/orders",
  userWishlist: "/users/wishlist",
  passwordChange: "/users/me/password",

  // profile
  profile: "/profile/me",
  profilePasswordChange: "/profile/me/password",

  // Auth
  login: "/auth/login",
  register: "/auth/register",
  refreshToken: "/auth/refresh",
  logout: "/auth/logout",

  // Upload
  uploadImages: "/upload/images",

  // Tags
  tags: "/tags",
  tagById: (id: string) => `/tags/${id}`,
};
