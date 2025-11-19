import { profileService } from "@/api/services/profileService"
import { useMutation } from "@tanstack/react-query"
import { toast } from "../use-toast"

export const useUpdateProfilePassword = () => {
    return useMutation({
        mutationFn: (data : any) => profileService.updatePassword(data),
        onSuccess: () => {
            toast({
                title: "Password updated successfully",
                description: "Your password has been updated successfully!",
            })
        }
    })
}