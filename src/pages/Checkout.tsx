
import { PaymentForm } from '@/components/payment/PaymentForm'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cartStore'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Checkout() {
const items = useCartStore(state => state.items)
const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
const total = subtotal 
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/shop">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shop
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Checkout</h1>
              <p className="text-muted-foreground">Complete your purchase</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {items.length > 0 && (
        <PaymentForm
          items={items}
          subtotal={subtotal}
          total={total}
        />
        )}
        {items.length === 0 && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link to="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
