
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Truck, CreditCard, Wallet } from 'lucide-react'

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  enabled: boolean
  comingSoon?: boolean
}

interface PaymentMethodSelectorProps {
  selectedMethod: string
  onMethodChange: (method: string) => void
  className?: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when your order is delivered',
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

export function PaymentMethodSelector({ selectedMethod, onMethodChange, className }: PaymentMethodSelectorProps) {
  return (
    <div className={className}>
      <RadioGroup value={selectedMethod} onValueChange={onMethodChange}>
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
                } ${selectedMethod === method.id ? 'bg-muted border-primary' : ''}`}
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
    </div>
  )
}
