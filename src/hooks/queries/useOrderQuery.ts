import { orderService } from "@/api/services/orderService";
import { Order, OrderResponse, OrdersMeta } from "@/types/Order.type";
import { queryKeys } from "@/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

interface GetOrdersParams {
    filters?: any;
    page?: number;
    limit?: number;
}

export const useGetOrders = (params?: GetOrdersParams) => {
    return useQuery<OrderResponse<Order[], OrdersMeta>>({
        queryKey: queryKeys.orders.list(params),
        queryFn: () => orderService.getOrders(params ?? {} ),
    })
}

export const useGetOrderById = (id: string) => {
    return useQuery<OrderResponse<Order>>({
        queryKey: queryKeys.orders.detail(id),
        queryFn: () => orderService.getOrderById(id),
        enabled: !!id
    })
}