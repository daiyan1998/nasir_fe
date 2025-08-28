import { OrderResponse } from "@/types/Order.type"
import { apiClient } from "../client"
import { endpoints } from "../endPoints"

export const orderService = {
    // ============ READ OPERATIONS ============
    getOrders: async (params = {}) : Promise<any> => {
        const { data } = await apiClient.get(endpoints.orders,{
            params
        })
        return data
    },

    getOrderById: async (id: string) => {
        const { data } : {data: OrderResponse} = await apiClient.get(endpoints.orderById(id))
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
    }
}