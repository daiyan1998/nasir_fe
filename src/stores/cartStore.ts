import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension'
import { CartItem } from '@/types/Cart.type'

// Define types


interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  incrementQuantity: (productId: string) => void
  decrementQuantity: (productId: string) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  total: () => number
}

// Create store with TypeScript and middleware
export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        items: [],
        
        // Actions
        addItem: (item) => set((state) => {
          const existing = state.items.find(i => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              )
            };
          }
          return { items: [...state.items, item] };
        }),
        
        incrementQuantity: (productId) => set((state) => ({
          items: state.items.map(i =>
            i.id === productId ? { ...i, quantity: i.quantity + 1 } : i
          )
        })),
        
        decrementQuantity: (productId) => set((state) => ({
          items: state.items.map(i =>
            i.id === productId && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
        })),
        removeItem: (productId) => set((state) => ({
          items: state.items.filter(i => i.id !== productId)
        })),
        
        clearCart: () => set({ items: [] }),
        
        // Derived state (getter)
        total: () => {
          const state = get();
          return state.items.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0
          );
        }
      }),
      {
        name: 'cart-storage',
        // Optional: only persist certain fields
        // partialize: (state) => ({ items: state.items })
      }
    )
  )
)