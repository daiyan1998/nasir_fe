import { apiClient } from "../client"
import { endpoints } from "../endPoints"

export const attributeService = {
    // ============ READ OPERATIONS ============
    getAttributes: async () => {
        const { data } = await apiClient.get(endpoints.attributes)
        return data
    },

    getAttributeById: async (id) => {
        const { data } = await apiClient.get(endpoints.attributeById(id))
        return data
    },

    // ============ CREATE OPERATIONS ============
    createAttribute: async (attribute) => {
        const { data } = await apiClient.post(endpoints.attributes, attribute)
        return data
    },

    importAttributes: async (attributes) => {
        const { data } = await apiClient.post(endpoints.attributesImport, attributes)
        return data
    },

    // ============ UPDATE OPERATIONS ============
    updateAttribute: async (id, attribute) => {
        const { data } = await apiClient.patch(endpoints.attributeById(id), attribute)
        return data
    },

    // ============ DELETE OPERATIONS ============
    deleteAttribute: async (id) => {
        const { data } = await apiClient.delete(endpoints.attributeById(id))
        return data
    },
}