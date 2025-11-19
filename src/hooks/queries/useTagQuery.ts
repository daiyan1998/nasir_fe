import { tagService } from "@/api/services/tagService"
import { queryKeys } from "@/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useGetTags = () => {
    return useQuery({
        queryKey: queryKeys.tag.all,
        queryFn: () => tagService.getTags(),
    })
}