export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  salePrice?: number
  sku: string
  stock: number
  category: string
  categoryId: string
  status: 'active' | 'inactive'
  featured: boolean
  images: string[]
  primaryImage: string
  metaTitle: string
  metaDescription: string
  attributes: Record<string, any>
  createdAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  image?: string
  active: boolean
  order: number
  children?: Category[]
}

export interface Attribute {
  id: string
  name: string
  slug: string
  type: 'text' | 'number' | 'select' | 'boolean'
  unit?: string
  isFilterable: boolean
  values?: AttributeValue[]
  createdAt: string
}

export interface AttributeValue {
  id: string
  value: string
  order: number
}

export interface CategoryAttribute {
  categoryId: string
  attributeId: string
  required: boolean
  order: number
}

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    active: true,
    order: 1,
    children: [
      { id: 'smartphones', name: 'Smartphones', slug: 'smartphones', parentId: 'electronics', active: true, order: 1 },
      { id: 'laptops', name: 'Laptops', slug: 'laptops', parentId: 'electronics', active: true, order: 2 },
      { id: 'headphones', name: 'Headphones', slug: 'headphones', parentId: 'electronics', active: true, order: 3 },
      { id: 'smartwatches', name: 'Smart Watches', slug: 'smartwatches', parentId: 'electronics', active: true, order: 4 }
    ]
  }
]

export const attributes: Attribute[] = [
  {
    id: 'brand',
    name: 'Brand',
    slug: 'brand',
    type: 'select',
    isFilterable: true,
    values: [
      { id: 'apple', value: 'Apple', order: 1 },
      { id: 'samsung', value: 'Samsung', order: 2 }
    ],
    createdAt: '2024-01-01'
  }
]

export const categoryAttributes: CategoryAttribute[] = [
  { categoryId: 'smartphones', attributeId: 'brand', required: true, order: 1 }
]

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 16 Pro Max',
    slug: 'iphone-16-pro-max',
    description: 'The most advanced iPhone ever with A18 Pro chip, improved cameras, and all-day battery life.',
    shortDescription: 'Latest iPhone with advanced features',
    price: 1199,
    salePrice: 1099,
    sku: 'APL-IP16PM-001',
    stock: 25,
    category: 'Smartphones',
    categoryId: '2',
    status: 'active',
    featured: true,
    images: ['/src/assets/iphone-16-hero.jpg'],
    primaryImage: '/src/assets/iphone-16-hero.jpg',
    metaTitle: 'iPhone 16 Pro Max - Latest Apple Smartphone',
    metaDescription: 'Get the latest iPhone 16 Pro Max with advanced features and improved performance.',
    attributes: { brand: 'apple' },
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'MacBook Pro 14"',
    slug: 'macbook-pro-14',
    description: 'Powerful laptop with M3 chip for professional work and creative tasks.',
    shortDescription: 'Professional laptop with M3 chip',
    price: 1999,
    sku: 'APL-MBP14-001',
    stock: 15,
    category: 'Laptops',
    categoryId: '3',
    status: 'active',
    featured: true,
    images: ['/src/assets/gaming-laptop.jpg'],
    primaryImage: '/src/assets/gaming-laptop.jpg',
    metaTitle: 'MacBook Pro 14" - Professional Laptop',
    metaDescription: 'Powerful MacBook Pro with M3 chip for professionals and creatives.',
    attributes: {},
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    name: 'AirPods Pro 3rd Gen',
    slug: 'airpods-pro-3rd-gen',
    description: 'Premium wireless earbuds with active noise cancellation and spatial audio.',
    shortDescription: 'Premium wireless earbuds',
    price: 249,
    salePrice: 199,
    sku: 'APL-APP3-001',
    stock: 50,
    category: 'Audio',
    categoryId: '4',
    status: 'active',
    featured: false,
    images: ['/src/assets/airpods-pro.jpg'],
    primaryImage: '/src/assets/airpods-pro.jpg',
    metaTitle: 'AirPods Pro 3rd Generation - Premium Audio',
    metaDescription: 'Experience premium sound quality with AirPods Pro 3rd generation.',
    attributes: {},
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    name: 'Galaxy Watch 6',
    slug: 'galaxy-watch-6',
    description: 'Advanced smartwatch with health monitoring and fitness tracking.',
    shortDescription: 'Advanced smartwatch',
    price: 329,
    sku: 'SAM-GW6-001',
    stock: 30,
    category: 'Wearables',
    categoryId: '5',
    status: 'active',
    featured: true,
    images: ['/src/assets/galaxy-watch.jpg'],
    primaryImage: '/src/assets/galaxy-watch.jpg',
    metaTitle: 'Galaxy Watch 6 - Advanced Smartwatch',
    metaDescription: 'Stay connected and healthy with the Galaxy Watch 6.',
    attributes: {},
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    name: 'Dell XPS 13',
    slug: 'dell-xps-13',
    description: 'Ultra-portable laptop with stunning display and long battery life.',
    shortDescription: 'Ultra-portable laptop',
    price: 1299,
    sku: 'DEL-XPS13-001',
    stock: 20,
    category: 'Laptops',
    categoryId: '3',
    status: 'active',
    featured: false,
    images: ['/src/assets/gaming-laptop.jpg'],
    primaryImage: '/src/assets/gaming-laptop.jpg',
    metaTitle: 'Dell XPS 13 - Ultra-portable Laptop',
    metaDescription: 'Lightweight and powerful Dell XPS 13 laptop.',
    attributes: {},
    createdAt: '2024-01-11'
  },
  {
    id: '6',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality.',
    shortDescription: 'Noise canceling headphones',
    price: 399,
    salePrice: 349,
    sku: 'SNY-WH1000XM5-001',
    stock: 40,
    category: 'Audio',
    categoryId: '4',
    status: 'active',
    featured: false,
    images: ['/src/assets/airpods-pro.jpg'],
    primaryImage: '/src/assets/airpods-pro.jpg',
    metaTitle: 'Sony WH-1000XM5 - Premium Headphones',
    metaDescription: 'Experience superior sound with Sony WH-1000XM5 headphones.',
    attributes: {},
    createdAt: '2024-01-10'
  },
  {
    id: '7',
    name: 'iPad Air 5th Gen',
    slug: 'ipad-air-5th-gen',
    description: 'Versatile tablet with M1 chip for work, creativity, and entertainment.',
    shortDescription: 'Versatile tablet with M1 chip',
    price: 599,
    sku: 'APL-IPAD5-001',
    stock: 35,
    category: 'Electronics',
    categoryId: '1',
    status: 'active',
    featured: true,
    images: ['/src/assets/iphone-16-hero.jpg'],
    primaryImage: '/src/assets/iphone-16-hero.jpg',
    metaTitle: 'iPad Air 5th Gen - Versatile Tablet',
    metaDescription: 'Powerful iPad Air with M1 chip for all your needs.',
    attributes: {},
    createdAt: '2024-01-09'
  },
  {
    id: '8',
    name: 'Gaming Chair Pro',
    slug: 'gaming-chair-pro',
    description: 'Ergonomic gaming chair with lumbar support and adjustable features.',
    shortDescription: 'Ergonomic gaming chair',
    price: 299,
    sku: 'GC-PRO-001',
    stock: 12,
    category: 'Furniture',
    categoryId: '7',
    status: 'active',
    featured: false,
    images: ['/src/assets/gaming-laptop.jpg'],
    primaryImage: '/src/assets/gaming-laptop.jpg',
    metaTitle: 'Gaming Chair Pro - Ergonomic Comfort',
    metaDescription: 'Comfortable gaming chair for long gaming sessions.',
    attributes: {},
    createdAt: '2024-01-08'
  },
  {
    id: '9',
    name: 'Wireless Charging Pad',
    slug: 'wireless-charging-pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    shortDescription: 'Fast wireless charger',
    price: 49,
    salePrice: 39,
    sku: 'WCP-001',
    stock: 100,
    category: 'Electronics',
    categoryId: '1',
    status: 'active',
    featured: false,
    images: ['/src/assets/airpods-pro.jpg'],
    primaryImage: '/src/assets/airpods-pro.jpg',
    metaTitle: 'Wireless Charging Pad - Fast Charging',
    metaDescription: 'Convenient wireless charging for your devices.',
    attributes: {},
    createdAt: '2024-01-07'
  },
  {
    id: '10',
    name: 'Smart Home Hub',
    slug: 'smart-home-hub',
    description: 'Central control hub for all your smart home devices and automation.',
    shortDescription: 'Smart home control hub',
    price: 199,
    sku: 'SHH-001',
    stock: 25,
    category: 'Electronics',
    categoryId: '1',
    status: 'inactive',
    featured: false,
    images: ['/src/assets/galaxy-watch.jpg'],
    primaryImage: '/src/assets/galaxy-watch.jpg',
    metaTitle: 'Smart Home Hub - Home Automation',
    metaDescription: 'Control all your smart devices from one hub.',
    attributes: {},
    createdAt: '2024-01-06'
  }
]

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  orderDate: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: string
  transactionId: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  statusHistory: OrderStatusHistory[]
  createdAt: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  subtotal: number
}

export interface OrderStatusHistory {
  id: string
  status: Order['status']
  timestamp: string
  notes?: string
}

export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '+1 (555) 123-4567',
    orderDate: '2024-01-20',
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-123456789',
    shippingAddress: {
      street: '123 Main St, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'iPhone 16 Pro Max',
        productImage: '/src/assets/iphone-16-hero.jpg',
        quantity: 1,
        price: 1099,
        subtotal: 1099
      }
    ],
    subtotal: 1099,
    shipping: 15,
    tax: 87.92,
    total: 1201.92,
    statusHistory: [
      { id: '1', status: 'pending', timestamp: '2024-01-20T10:00:00Z' },
      { id: '2', status: 'confirmed', timestamp: '2024-01-20T14:30:00Z' },
      { id: '3', status: 'shipped', timestamp: '2024-01-21T09:15:00Z' },
      { id: '4', status: 'delivered', timestamp: '2024-01-23T16:45:00Z' }
    ],
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    customerPhone: '+1 (555) 987-6543',
    orderDate: '2024-01-21',
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'PayPal',
    transactionId: 'PP-987654321',
    shippingAddress: {
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'United States'
    },
    items: [
      {
        id: '2',
        productId: '2',
        productName: 'MacBook Pro 14"',
        productImage: '/src/assets/gaming-laptop.jpg',
        quantity: 1,
        price: 1999,
        subtotal: 1999
      },
      {
        id: '3',
        productId: '3',
        productName: 'AirPods Pro 3rd Gen',
        productImage: '/src/assets/airpods-pro.jpg',
        quantity: 2,
        price: 199,
        subtotal: 398
      }
    ],
    subtotal: 2397,
    shipping: 25,
    tax: 191.76,
    total: 2613.76,
    statusHistory: [
      { id: '5', status: 'pending', timestamp: '2024-01-21T11:00:00Z' },
      { id: '6', status: 'confirmed', timestamp: '2024-01-21T15:20:00Z' },
      { id: '7', status: 'shipped', timestamp: '2024-01-22T08:30:00Z' }
    ],
    createdAt: '2024-01-21'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customerName: 'Michael Brown',
    customerEmail: 'mike.brown@email.com',
    customerPhone: '+1 (555) 456-7890',
    orderDate: '2024-01-22',
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-456789123',
    shippingAddress: {
      street: '789 Pine Street',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'United States'
    },
    items: [
      {
        id: '4',
        productId: '4',
        productName: 'Galaxy Watch 6',
        productImage: '/src/assets/galaxy-watch.jpg',
        quantity: 1,
        price: 329,
        subtotal: 329
      }
    ],
    subtotal: 329,
    shipping: 10,
    tax: 26.32,
    total: 365.32,
    statusHistory: [
      { id: '8', status: 'pending', timestamp: '2024-01-22T13:15:00Z' },
      { id: '9', status: 'confirmed', timestamp: '2024-01-22T16:45:00Z' }
    ],
    createdAt: '2024-01-22'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@email.com',
    customerPhone: '+1 (555) 321-0987',
    orderDate: '2024-01-23',
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-789123456',
    shippingAddress: {
      street: '321 Elm Drive',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      country: 'United States'
    },
    items: [
      {
        id: '5',
        productId: '6',
        productName: 'Sony WH-1000XM5',
        productImage: '/src/assets/airpods-pro.jpg',
        quantity: 1,
        price: 349,
        subtotal: 349
      },
      {
        id: '6',
        productId: '9',
        productName: 'Wireless Charging Pad',
        productImage: '/src/assets/airpods-pro.jpg',
        quantity: 3,
        price: 39,
        subtotal: 117
      }
    ],
    subtotal: 466,
    shipping: 12,
    tax: 37.28,
    total: 515.28,
    statusHistory: [
      { id: '10', status: 'pending', timestamp: '2024-01-23T09:30:00Z' }
    ],
    createdAt: '2024-01-23'
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customerName: 'David Wilson',
    customerEmail: 'david.wilson@email.com',
    customerPhone: '+1 (555) 654-3210',
    orderDate: '2024-01-24',
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-321654987',
    shippingAddress: {
      street: '654 Maple Lane',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'United States'
    },
    items: [
      {
        id: '7',
        productId: '7',
        productName: 'iPad Air 5th Gen',
        productImage: '/src/assets/iphone-16-hero.jpg',
        quantity: 1,
        price: 599,
        subtotal: 599
      }
    ],
    subtotal: 599,
    shipping: 15,
    tax: 47.92,
    total: 661.92,
    statusHistory: [
      { id: '11', status: 'pending', timestamp: '2024-01-24T12:00:00Z' },
      { id: '12', status: 'confirmed', timestamp: '2024-01-24T14:20:00Z' },
      { id: '13', status: 'cancelled', timestamp: '2024-01-24T18:30:00Z', notes: 'Customer requested cancellation' }
    ],
    createdAt: '2024-01-24'
  }
]

export const generateSKU = (): string => {
  const prefix = 'PRD'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}