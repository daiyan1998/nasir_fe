import { ApiResponse } from "@/types/ApiResponse.type"
import { apiClient } from "../client"
import { endpoints } from "../endPoints"
import { User } from "@/types/User.type"

interface UpdatePassword {
    currentPassword: string
    newPassword: string
}

export const profileService = {
    getMe: async (): Promise<ApiResponse<User>> => {
        const {data} = await apiClient.get(endpoints.profile)
        return data
    },

    updatePassword: async (payload: UpdatePassword) => {
        const {data} = await apiClient.patch(endpoints.profilePasswordChange,payload)
        return data
    }
}