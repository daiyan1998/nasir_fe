import { tagService } from "@/api/services/tagService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "../use-toast"
import { queryKeys } from "@/utils/queryKeys"

export const useCreateTag = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: any) => tagService.createTag(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:queryKeys.tag.all})
            toast({ title: "Tag created", description: "Tag has been created successfully." });
        }
    })
}

export const useDeleteTag = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => tagService.deleteTag(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.tag.all })
            toast({ title: "Tag deleted", description: "Tag has been deleted successfully." });
        }
    })
}

export const useUpdateTag = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: any) => tagService.updateTag(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:queryKeys.tag.all})
            toast({ title: "Tag updated", description: "Tag has been updated successfully." });
        }
    })
}