import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { brandService } from "@/api/services/brandService";

export const useGetBrands = () => {
  return useQuery({
    queryKey: queryKeys.brands.all,
    queryFn: () => brandService.getAllBrands(),
  });
};

export const useGetBrandById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.brands.detail(id),
    queryFn: () => brandService.getBrandById(id),
    enabled: !!id,
  });
};
