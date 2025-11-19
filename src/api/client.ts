import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

let accessToken = null
export const setAccessToken = (token: string) => {
  accessToken = token
}

export const clearAccessToken = () => {
  accessToken = null
}

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
 async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true
       try {
        // call refresh endpoint — refresh_token is automatically sent in cookie
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true })
        console.log(data)
        setAccessToken(data.accessToken)
        error.config.headers.Authorization = `Bearer ${data.accessToken}`
        return apiClient(error.config)
      } catch (refreshError) {
        clearAccessToken()
        // optional: redirect to login
      }
    }
    return Promise.reject(error)
  }
)