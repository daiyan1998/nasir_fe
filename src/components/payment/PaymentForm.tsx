
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Truck, CreditCard, Wallet, MapPin, Phone, User } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  enabled: boolean
  comingSoon?: boolean
}

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface PaymentFormProps {
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export function PaymentForm({ items, subtotal, shipping, tax, total }: PaymentFormProps) {
  const { toast } = useToast()
  const [selectedPayment, setSelectedPayment] = useState('cod')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    notes: ''
  })

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when your order is delivered to your doorstep',
      icon: <Truck className="h-5 w-5" />,
      enabled: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay securely with your card',
      icon: <CreditCard className="h-5 w-5" />,
      enabled: false,
      comingSoon: true
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      description: 'PayPal, Apple Pay, Google Pay',
      icon: <Wallet className="h-5 w-5" />,
      enabled: false,
      comingSoon: true
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = async () => {
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping details.",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)
    
    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully!",
        description: `Your order will be delivered via ${paymentMethods.find(m => m.id === selectedPayment)?.name}.`
      })
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment & Shipping Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Information
            </CardTitle>
            <CardDescription>
              Where should we deliver your order?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={shippingInfo.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={shippingInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={shippingInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main Street, Apt 4B"
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={shippingInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="New York"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={shippingInfo.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="NY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="10001"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Delivery Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={shippingInfo.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Special delivery instructions..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </CardTitle>
            <CardDescription>
              Choose how you'd like to pay for your order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3">
                    <RadioGroupItem 
                      value={method.id} 
                      id={method.id}
                      disabled={!method.enabled}
                    />
                    <Label 
                      htmlFor={method.id} 
                      className={`flex-1 flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        !method.enabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/50'
                      } ${selectedPayment === method.id ? 'bg-muted border-primary' : ''}`}
                    >
                      <div className="mt-0.5">{method.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{method.name}</span>
                          {method.comingSoon && (
                            <Badge variant="secondary" className="text-xs">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {method.description}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {selectedPayment === 'cod' && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Truck className="h-5 w-5 mt-0.5 text-brand-orange" />
                  <div>
                    <h4 className="font-medium">Cash on Delivery</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      You'll pay in cash when your order is delivered. Please have the exact amount ready: <strong>${total.toFixed(2)}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Place Order Button */}
        <Button 
          size="lg" 
          className="w-full bg-brand-orange hover:bg-brand-orange/90"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing Order...
            </>
          ) : (
            `Place Order - $${total.toFixed(2)}`
          )}
        </Button>
      </div>
    </div>
  )
}
