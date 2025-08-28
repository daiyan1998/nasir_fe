import { categoryService } from "@/api/services/categoryService"
import { queryKeys } from "@/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useGetCategories = () => {
    return useQuery({
        queryKey: queryKeys.categories.all,
        queryFn: () => categoryService.getCategories(),
    })
}

export const useGetCategoryById = (id: string) => {
    return useQuery({
        queryKey: queryKeys.categories.detail(id),
        queryFn: () => categoryService.getCategoryById(id),
        enabled: !!id
    })
}

export const useGetCategoryFilter = (slug: string) => {
    return useQuery({
        queryKey: queryKeys.categories.filter(slug),
        queryFn: () => categoryService.getCategoryFilter(slug),
    })
}