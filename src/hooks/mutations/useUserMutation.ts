import { userService } from "@/api/services/userService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "../use-toast"
import { queryKeys } from "@/utils/queryKeys"

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({userId,profileData}:{userId:string,profileData:any}) => userService.updateUser(userId,profileData),
        onSuccess: () => {
            toast({ title: "Profile updated", description: "Profile has been updated successfully." });
            queryClient.invalidateQueries({ queryKey: queryKeys.users.list() });
        }
    })
}