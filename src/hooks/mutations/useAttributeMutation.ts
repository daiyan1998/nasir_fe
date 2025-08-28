import { attributeService } from "@/api/services/attributeService";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";

export const useCreateAttribute = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => attributeService.createAttribute(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.attributes.all });
        },
    });
}

export const useImportAttributes = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => attributeService.importAttributes(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.attributes.all });
        },
    });
}

export const useDeleteAttribute = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => attributeService.deleteAttribute(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.attributes.all });

            toast({
                title: "Attribute deleted",
                description: "Attribute has been deleted successfully.",
            });
        },
    });
}