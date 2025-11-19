import { productService } from "@/api/services/productService";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

interface GetProductsParams {
  filters?: any;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const useGetProducts = (params?: GetProductsParams) => {
  return useQuery({
    queryKey: [...queryKeys.products.all, params],
    queryFn: () => productService.getProducts(params ?? {} ),
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  });
};

export const useGetSearchProducts = (query: string) => {
  return useQuery({
    queryKey: queryKeys.products.search(query),
    queryFn: () => productService.searchProducts(query),
    enabled: !!query,
  });
}

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productService.getProductById(id),
    enabled: !!id, // only runs if id exists
  });
};

export const useGetProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(categoryId),
    queryFn: () => productService.getProductsByCategory(categoryId),
    enabled: !!categoryId,
  });
};
