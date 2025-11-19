import { uploadService } from "@/api/services/uploadService"
import { useMutation } from "@tanstack/react-query"
import { toast } from "../use-toast"

export const useUplaodMutation = () => {
    return useMutation({
        mutationFn: (data: any) => uploadService.uploadImages(data),
        onSuccess: () => {
            toast({
                title: "Image uploaded successfully",
                description: "Your image has been uploaded successfully!",
            })
        }
    })
}