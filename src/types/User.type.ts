import { Address } from "./Address.type"
import { Order } from "./Order.type"

export interface User {
    id: string
    firstName : string
    lastName: string
    fullName: string
    email: string
    phone: string
    role: string
    isActive: boolean
    addresses: Address[]
    orders: Order[]
}

export interface UserResponse {
    data: User
}