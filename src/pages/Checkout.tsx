
import { PaymentForm } from '@/components/payment/PaymentForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock cart data - in a real app this would come from context/state management
const mockCartItems = [
  {
    id: '1',
    name: 'iPhone 16 Pro Max',
    price: 1199.99,
    quantity: 1,
    image: '/src/assets/iphone-16-hero.jpg'
  },
  {
    id: '2',
    name: 'AirPods Pro',
    price: 249.99,
    quantity: 2,
    image: '/src/assets/airpods-pro.jpg'
  }
]

const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
const shipping = 9.99
const tax = subtotal * 0.08 // 8% tax
const total = subtotal + shipping + tax

export default function Checkout() {
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
        <PaymentForm
          items={mockCartItems}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />
      </div>
    </div>
  )
}
