import { useMutation, useQueryClient } from "@tanstack/react-query";
import { brandService } from "@/api/services/brandService";
import { Brand } from "@/types/Brand.type";
import { queryKeys } from "@/utils/queryKeys";

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (brand: Omit<Brand, "id" | "createdAt" | "updatedAt">) =>
      brandService.createBrand(brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.brands.all });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, brand }: { id: string; brand: Partial<Brand> }) =>
      brandService.updateBrand(id, brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.brands.all });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => brandService.deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.brands.all });
    },
  });
};
