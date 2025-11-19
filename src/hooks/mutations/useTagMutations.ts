import { tagService } from "@/api/services/tagService"
import { useMutation } from "@tanstack/react-query"
import { toast } from "../use-toast"

export const useCreateTag = () => {
    return useMutation({
        mutationFn: (data: any) => tagService.createTag(data),
        onSuccess: () => {
            toast({ title: "Tag created", description: "Tag has been created successfully." });
        }
    })
}