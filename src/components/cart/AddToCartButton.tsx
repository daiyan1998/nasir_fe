import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AddToCartButtonProps {
  productId: string
  productName: string
  price: number
  image: string
  inStock?: boolean
  initialQuantity?: number
  variant?: 'default' | 'compact' | 'icon'
  className?: string
}

export function AddToCartButton({ 
  productId, 
  productName, 
  price, 
  image,
  inStock = true,
  initialQuantity = 0,
  variant = 'default',
  className 
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isAdding, setIsAdding] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = async () => {
    if (!inStock) return
    
    setIsAdding(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setQuantity(prev => prev + 1)
    setIsAdding(false)
    
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`,
    })
  }

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 0) return
    setQuantity(newQuantity)
    
    if (newQuantity === 0) {
      toast({
        title: "Removed from cart",
        description: `${productName} has been removed from your cart.`,
      })
    }
  }

  if (!inStock) {
    return (
      <Button disabled className={className}>
        Out of Stock
      </Button>
    )
  }

  if (variant === 'icon') {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={handleAddToCart}
        disabled={isAdding}
        className={className}
      >
        {isAdding ? (
          <Check className="h-4 w-4" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
      </Button>
    )
  }

  if (variant === 'compact') {
    if (quantity > 0) {
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Badge variant="secondary" className="px-3 py-1">
            {quantity}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      )
    }

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddToCart}
        disabled={isAdding}
        className={className}
      >
        {isAdding ? (
          <Check className="mr-2 h-3 w-3" />
        ) : (
          <Plus className="mr-2 h-3 w-3" />
        )}
        Add
      </Button>
    )
  }

  // Default variant
  if (quantity > 0) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Button
          variant="outline"
          onClick={() => updateQuantity(quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            {quantity} in cart
          </Badge>
        </div>
        <Button
          variant="outline"
          onClick={() => updateQuantity(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={className}
    >
      {isAdding ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  )
}