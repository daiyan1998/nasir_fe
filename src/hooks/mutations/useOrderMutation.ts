import { orderService } from "@/api/services/orderService";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { useCartStore } from "@/stores/cartStore";
import { stat } from "fs";
import { useNavigate } from "react-router-dom";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const clearCart = useCartStore((stat) => stat.clearCart);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: any) => orderService.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      clearCart();
      toast({
        title: "Order created successfully",
        description: "The order has been created successfully",
      });
    },
  });
};

export const useTrackOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => orderService.trackOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      toast({
        title: "Order tracked successfully",
        description: "The order has been tracked successfully",
      });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; status: string }) =>
      orderService.updateOrderStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      toast({
        title: "Order updated successfully",
        description: "The order has been updated successfully",
      });
    },
  });
};
