import { User, UserResponse } from "@/types/User.type"
import { apiClient } from "../client"
import { endpoints } from "../endPoints"
import { ApiResponse } from "@/types/ApiResponse.type"

// Legacy interface for backward compatibility (used in updateProfile, etc.)
interface LegacyUser {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: 'admin' | 'customer'
  status: 'active' | 'inactive'
  registrationDate: string
  lastLogin?: string
  totalOrders: number
  totalSpent: number
  addresses: UserAddress[]
}

interface UserAddress {
  id: string
  type: 'billing' | 'shipping'
  isDefault: boolean
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface UpdateProfileData {
  fullName?: string
  phone?: string
  role?: 'ADMIN' | 'CUSTOMER'
  isActive?: boolean
}

interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword?: string
}

interface CreateAddressData {
  type: 'billing' | 'shipping'
  isDefault?: boolean
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface UpdateAddressData extends Partial<CreateAddressData> {
  id: string
}

export const userService = {
  // ============ READ OPERATIONS ============
  
  // Get all users
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    const { data } = await apiClient.get<ApiResponse<User[]>>(endpoints.users)
    return data
  },

  // Get user orders
  getUserOrders: async (params = {}): Promise<any> => {
    const { data } = await apiClient.get(endpoints.userOrders, { params })
    return data
  },

  // Get user wishlist
  getUserWishlist: async (params = {}): Promise<any> => {
    const { data } = await apiClient.get(endpoints.userWishlist, { params })
    return data
  },

  // ============ UPDATE OPERATIONS ============

  // Update user profile
  updateUser: async (userId:string,profileData:any) => {
    console.log('updateUser',{userId,profileData})
    const { data } = await apiClient.patch(endpoints.usersById(userId), profileData)
    return data
  },

  // Update user profile (partial)
  updateProfilePartial: async (updates: UpdateProfileData): Promise<LegacyUser> => {
    const { data } = await apiClient.patch<LegacyUser>(endpoints.usersMe, updates)
    return data
  },

  // Change password
  changePassword: async (passwordData: ChangePasswordData): Promise<void> => {
    await apiClient.put(endpoints.passwordChange, passwordData)
  },

  // Upload user avatar
  uploadAvatar: async (avatarFile: File): Promise<LegacyUser> => {
    const formData = new FormData()
    formData.append('avatar', avatarFile)

    const { data } = await apiClient.patch<LegacyUser>(`${endpoints.usersMe}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  },

  // Remove user avatar
  removeAvatar: async (): Promise<LegacyUser> => {
    const { data } = await apiClient.delete<LegacyUser>(`${endpoints.usersMe}/avatar`)
    return data
  },

  // ============ ADDRESS OPERATIONS ============

  // Get user addresses
  getAddresses: async (): Promise<UserAddress[]> => {
    const { data } = await apiClient.get<UserAddress[]>(`${endpoints.usersMe}/addresses`)
    return data
  },

  // Add new address
  addAddress: async (addressData: CreateAddressData): Promise<UserAddress> => {
    const { data } = await apiClient.post<UserAddress>(`${endpoints.usersMe}/addresses`, addressData)
    return data
  },

  // Update address
  updateAddress: async (addressId: string, addressData: Partial<CreateAddressData>): Promise<UserAddress> => {
    const { data } = await apiClient.put<UserAddress>(
      `${endpoints.usersMe}/addresses/${addressId}`,
      addressData
    )
    return data
  },

  // Delete address
  deleteAddress: async (addressId: string): Promise<void> => {
    await apiClient.delete(`${endpoints.usersMe}/addresses/${addressId}`)
  },

  // Set default address
  setDefaultAddress: async (addressId: string): Promise<UserAddress> => {
    const { data } = await apiClient.patch<UserAddress>(
      `${endpoints.usersMe}/addresses/${addressId}/default`
    )
    return data
  },

  // ============ WISHLIST OPERATIONS ============

  // Add product to wishlist
  addToWishlist: async (productId: string): Promise<any> => {
    const { data } = await apiClient.post(`${endpoints.userWishlist}`, { productId })
    return data
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId: string): Promise<void> => {
    await apiClient.delete(`${endpoints.userWishlist}/${productId}`)
  },

  // ============ ADDITIONAL OPERATIONS ============

  // Get user statistics
  getUserStats: async (): Promise<any> => {
    const { data } = await apiClient.get(`${endpoints.usersMe}/stats`)
    return data
  },

  // Deactivate account
  deactivateAccount: async (): Promise<void> => {
    await apiClient.post(`${endpoints.usersMe}/deactivate`)
  },

  // Delete account
  deleteAccount: async (password: string): Promise<void> => {
    await apiClient.delete(endpoints.usersMe, {
      data: { password }
    })
  }
}

