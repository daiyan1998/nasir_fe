import { categoryAttributeService } from "@/api/services/categoryAttributeService"
import { queryKeys } from "@/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useGetCategoryAttributes = () => {

    return useQuery({
        queryKey: queryKeys.categoryAttributes.all,
        queryFn: () => categoryAttributeService.getCategoryAttributes(),
    })
}

export const useGetCategoryAttributesById = (id: string) => {

    return useQuery({
        queryKey: queryKeys.categoryAttributes.detail(id),
        queryFn: () => categoryAttributeService.getCategoryAttributeById(id),
        enabled: !!id
    })
}