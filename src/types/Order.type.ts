import { ApiResponse } from "./ApiResponse.type";
import { Product } from "./Product.type";

export interface ShippingAddress {
  id: string;
  type: "HOME" | "WORK" | "OTHER"; // match your AddressType enum in Prisma
  fullName: string;
  company?: string | null;
  email?: string | null;
  address: string;
  city: string;
  state?: string | null;
  zipCode: string;
  country?: string | null;
  phone: string;
  isDefault: boolean;
  deletedAt?: string | null;
  userId?: string | null;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: string;
  orderId: string;
  productId: string;
  variantId?: string | null;
  product: Product;
  selectedOptions?: any
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"; // match backend enum
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"; //
  totalAmount: string;
  shippingCost: string;
  taxAmount: string;
  discountAmount: string;
  notes?: string | null;
  deletedAt?: string | null;
  userId: string;
  shippingAddressId: string;
  createdAt: string;
  updatedAt: string;
  shippingAddress?: ShippingAddress; // nested relation
  items?: OrderItem[];
}

// Response from backend

export interface OrdersMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  pendingOrders: number;
  completedOrders: number;
  averageOrderValue: number;
  totalRevenue: number;
}

export interface OrderResponse<T, M = undefined> {
  data: T;
  // meta?: {
  //   total: number;
  //   page: number;
  //   limit: number;
  //   totalPages: number;
  //   pendingOrders: number;
  //   completedOrders: number;
  //   averageOrderValue: number;
  //   totalRevenue: number;
  // };
  meta?: M;
}

