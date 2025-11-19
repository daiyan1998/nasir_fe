import { productService } from "@/api/services/productService";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";

// Create Product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      toast({ title: "Product created", description: "Product has been added successfully." });
    },
    onError: (error: any) => {
      toast({
        title: "Error creating product",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });
};

// Update Product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      productService.updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(variables.id) });
      toast({ title: "Product updated", description: "Product has been updated successfully." });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating product",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all,exact: false });
      toast({ title: "Product deleted", description: "Product has been deleted successfully." });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting product",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { productId: string; imageId: string }) => productService.deleteProductImage(data.productId, data.imageId),
    onSuccess: (_, { productId: id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(id) });
      toast({ title: "Image deleted", description: "Image has been deleted successfully." });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting image",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  })
}