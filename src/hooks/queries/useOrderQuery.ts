import { orderService } from "@/api/services/orderService";
import { queryKeys } from "@/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

interface GetOrdersParams {
    filters?: any;
    page?: number;
    limit?: number;
}

export const useGetOrders = (params?: GetOrdersParams) => {
    return useQuery({
        queryKey: [queryKeys.orders.all,params],
        queryFn: () => orderService.getOrders(params ?? {} ),
    })
}

export const useGetOrderById = (id: string) => {
    return useQuery({
        queryKey: queryKeys.orders.detail(id),
        queryFn: () => orderService.getOrderById(id),
        enabled: !!id
    })
}