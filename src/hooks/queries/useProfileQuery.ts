import { profileService } from "@/api/services/profileService"
import { queryKeys } from "@/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useGetProfile = () => {
    return useQuery({
        queryKey: queryKeys.profile.me(),
        queryFn: () => profileService.getMe(),
        retry: false
    })
}