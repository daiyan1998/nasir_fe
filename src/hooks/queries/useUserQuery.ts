import { userService } from "@/api/services/userService"
import { queryKeys } from "@/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useGetUsers = () => {
    return useQuery({
        queryKey: queryKeys.users.list(),
        queryFn: () => userService.getAllUsers(),
    })
}