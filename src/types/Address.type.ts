export enum AddressType {
  BILLING = "BILLING",
  SHIPPING = "SHIPPING",
  BOTH = "BOTH",
}

export interface Address {
  id: string;
  type: AddressType;
  fullName: string;
  email?: string | null;
  company?: string | null;
  address: string;
  city: string;
  state?: string | null;
  zipCode: string;
  country?: string | null;
  phone: string;
  isDefault: boolean;
  deletedAt?: string | null; // ISO string from backend
  userId?: string | null;
}
