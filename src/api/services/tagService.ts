import { ApiResponse } from "@/types/ApiResponse.type"
import { apiClient } from "../client"
import { endpoints } from "../endPoints"
import { Tag } from "@/types/Tag.type"

export const tagService = {
    getTags: async () => {
        const {data} = await apiClient.get<ApiResponse<Tag[]>>(endpoints.tags)
        return data
    },

    createTag: async (payload) => {
        const {data} = await apiClient.post(endpoints.tags,payload)
        return data
    },
    updateTag: async (payload) => {
        const {data} = await apiClient.patch(endpoints.tagById(payload.id), payload)
        return data
    },

    deleteTag: async (id: string) => {
        const {data} = await apiClient.delete(endpoints.tagById(id))
        return data
    },
}