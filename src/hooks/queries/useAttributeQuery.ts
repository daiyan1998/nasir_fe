import { attributeService } from "@/api/services/attributeService"
import { queryKeys } from "@/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useGetAttributes = () => {
    return useQuery({
        queryKey: queryKeys.attributes.all,
        queryFn: () => attributeService.getAttributes(),
    })
}