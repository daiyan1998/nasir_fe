import { Heart, Star, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "./cart/AddToCartButton";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  discount?: string;
}

const ProductCard = ({ 
  image, 
  title, 
  price, 
  originalPrice, 
  rating, 
  reviews, 
  isNew = false,
  discount 
}: ProductCardProps) => {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-brand-orange/30">
      <CardContent className="p-4">
        <div className="relative mb-4">
          {isNew && (
            <Badge className="absolute top-2 left-2 bg-success text-white text-xs px-2 py-1">
              NEW
            </Badge>
          )}
          {discount && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1">
              {discount}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-white shadow-md"
          >
            <Heart className="h-4 w-4" />
          </Button>
          
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-brand-orange transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center space-x-1 text-sm">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500">({reviews})</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-brand-orange">{price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
            )}
          </div>

          <AddToCartButton
            productId={title}
            productName={title}
            price={parseFloat(price.replace('$', ''))}
            image={image}
            className="w-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;