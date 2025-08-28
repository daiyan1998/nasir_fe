import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { categoryAttributeService } from "@/api/services/categoryAttributeService";

export const useAssignAttributeToCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any[]) => categoryAttributeService.assignAttibuteToCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.attributes.all });
            toast({
                title: "Attribute assigned to category",
                description: "Attribute has been assigned to category successfully.",
            });
        },
    });
}
