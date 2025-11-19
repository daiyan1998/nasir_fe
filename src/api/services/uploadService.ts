import { apiClient } from "../client"

export const uploadService = {
    uploadImages: async (images: File[]) => {
        const formData = new FormData()
        images.forEach((image) => {
            formData.append('images', image)
        })
        const { data } = await apiClient.post('/upload/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
    }
}