import { apiClient } from "../client"
import { endpoints } from "../endPoints"

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  fullName: string
  email: string
  password: string
}

interface AuthResponse {
 accessToken : string
}

interface RefreshTokenData {
  refreshToken: string
}

export const authService = {
  // ============ AUTHENTICATION OPERATIONS ============
  
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(endpoints.login, credentials)
    return data
  },

  // Register new user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(endpoints.register, userData)
    return data
  },

  // Refresh access token
  refreshToken: async (refreshTokenData: RefreshTokenData): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(endpoints.refreshToken, refreshTokenData)
    return data
  },

  // Logout user
  logout: async (): Promise<void> => {
    await apiClient.post(endpoints.logout)
  },
}

