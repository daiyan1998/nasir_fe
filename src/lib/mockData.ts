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