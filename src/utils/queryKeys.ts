 export const queryKeys = {
  products: {
    all: ['products'] as const,
    list: (filters?: unknown) => ['products', 'list', filters] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
  },
  categories: {
    all: ['categories'] as const,
    list: () => ['categories', 'list'] as const,
    detail: (id: string) => ['categories', 'detail', id] as const,
    filter:(slug:string) => ['categoryFilter'] as const
  },
  attributes: {
    all: ['attributes'] as const,
    list: () => ['attributes', 'list'] as const,
  },
  categoryAttributes: {
    all: ['category-attributes'] as const,
    list: () => ['category-attributes', 'list'] as const,
    detail: (id: string) => ['category-attributes', 'detail', id] as const,
  },
  cart: {
    all: ['cart'] as const,
    items: () => ['cart', 'items'] as const,
  },
  orders: {
    all: ['orders'] as const,
    list: (filters?: unknown) => ['orders', 'list', filters] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
  },
  user: {
    all: ['user'] as const,
    profile: () => ['user', 'profile'] as const,
    wishlist: () => ['user', 'wishlist'] as const,
  },
};
