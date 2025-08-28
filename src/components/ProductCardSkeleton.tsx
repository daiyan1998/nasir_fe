import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

const ProductCardSkeleton = () => {
  return (
    <Card className="group cursor-pointer">
      <CardContent className="p-4">
        {/* Image placeholder */}
        <div className="relative mb-4">
          <Skeleton className="absolute top-2 right-2 h-5 w-12 rounded" />

          <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4 p-4 flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        </div>

        {/* Text + Rating */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" /> {/* product name */}

          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-3 w-3 rounded" />
            ))}
            <Skeleton className="h-3 w-6 ml-2" /> {/* reviews count */}
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>

          {/* Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button disabled size="sm" className="flex-1">
              <Skeleton className="h-4 w-20" />
            </Button>
            <Button disabled size="sm" variant="outline">
              <Skeleton className="h-4 w-16" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCardSkeleton
