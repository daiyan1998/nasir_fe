import { get } from "http"
import { apiClient } from "../client"
import { endpoints } from "../endPoints"

export const categoryAttributeService = {

    assignAttibuteToCategory: async (categoryAttributes: any[]) => {
        const { data } = await apiClient.post(endpoints.assignAttributeToCategory,categoryAttributes)
        return data
    },

    getCategoryAttributes: async () => {
        const { data } = await apiClient.get(endpoints.categoryAttributes)
        return data
    },

    getCategoryAttributeById: async (id) => {
        const { data } = await apiClient.get(endpoints.categoryAttributeById(id))
        return data
    }
}