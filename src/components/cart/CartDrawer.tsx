import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart, Plus, Minus, X, Trash2 } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variant?: string
}

interface CartDrawerProps {
  items?: CartItem[]
  itemCount?: number
  total?: number
}

export function CartDrawer({ items = [], itemCount = 0, total = 0 }: CartDrawerProps) {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<CartItem[]>(items)

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({totalItems} items)
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <ShoppingCart className="h-16 w-16 mb-4 opacity-50" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Add some products to get started</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground">{item.variant}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4 py-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Shipping:</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-brand-orange hover:bg-brand-orange/90" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
