// import { Category } from "@/lib/mockData"
import { Category, CategoryFilter } from "@/types/Category.type"
import { apiClient } from "../client"
import { endpoints } from "../endPoints"

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    const { data } : { data: Category[] } = await apiClient.get(endpoints.categories)
    return data
  },

  // Get category by ID
  getCategoryById: async (id) => {
    const { data } : { data: Category } = await apiClient.get(endpoints.categoryById(id))
    return data
  },

  // Get category tree (nested categories)
  getCategoryTree: async () => {
    const { data }  = await apiClient.get(`${endpoints.categories}/tree`)
    return data
  },

  getCategoryFilter: async (slug: string) => {
    const {data}: { data: Category } = await apiClient.get(`${endpoints.categoryFilter(slug)}`)
    return data
  },

  // Get popular categories
  getPopularCategories: async () => {
    const { data } = await apiClient.get(`${endpoints.categories}/popular`)
    return data
  },

  // =======================
  // Create
  // =======================
  createCategory: async (category: any) => {
    const { data } = await apiClient.post(endpoints.categories, category)
    return data
  },

  // =======================
  // delete
  // =======================

  deleteCategory: async (id: string) => {
    const { data } = await apiClient.delete(endpoints.categoryById(id))
    return data
  },

  // =======================
  // update
  // =======================

  updateCategory: async (id: string, category: any) => {
    const { data } = await apiClient.patch(endpoints.categoryById(id), category)
    return data
  },
}