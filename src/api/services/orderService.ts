import { Order, OrderResponse, OrdersMeta } from "@/types/Order.type"
import { apiClient } from "../client"
import { endpoints } from "../endPoints"

export const orderService = {
    // ============ READ OPERATIONS ============
    getOrders: async (params = {}) : Promise<any> => {
        const { data } = await apiClient.get<OrderResponse<Order[], OrdersMeta>>(endpoints.orders,{
            params
        })
        return data
    },

    trackOrder: async (payload : { orderId: string, phoneNumber: string }) => {
        const { data } = await apiClient.post(endpoints.orderTracking, payload)
        return data
    },

    getOrderById: async (id: string) => {
        const { data }  = await apiClient.get<OrderResponse<Order>>(endpoints.orderById(id))
        return data
    },

    // ============ CREATE OPERATIONS ============
    createOrder: async (order: any) => {
        const { data } = await apiClient.post(endpoints.orders, order)
        return data
    },

    // ============ UPDATE OPERATIONS ============
    updateOrder: async (id: string, order: any) => {
        const { data } = await apiClient.patch(endpoints.orderById(id), order)
    },

    updateOrderStatus: async ({ id, status } : { id: string, status: string }) => {
        const { data } = await apiClient.patch(endpoints.orderStatus(id), { status })
        return data
    }
}