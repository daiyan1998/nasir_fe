import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ProductAttributes from "./ProductAttributes";
import { Product } from "@/types/Product.type";
import { IMG_URL } from "@/utils/constants";
import { calculateDiscount } from "@/utils/calculateDiscount";

const ProductCard = ({ product }: { product: Product }) => {
  if (!product) return null;
  const price = product?.price;
  const salePrice = product?.salePrice;
  const { amount: discountAmount, percentage: discountPercentage } =
    calculateDiscount(price, salePrice);

  console.log(product.name, discountAmount);
  return (
    <Link key={product.id} to={`/product/${product.id}`}>
      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="relative mb-4">
            {discountAmount > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs z-10">
                -{discountPercentage}%
              </Badge>
            )}

            <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4 p-4">
              {product.images.length > 0 && (
                <img
                  src={`${IMG_URL}${product.images[0].url}`}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium group-hover:text-brand-orange transition-colors">
              {product.name}
            </h3>

            <div className="flex items-center space-x-1 text-sm">
              {/* <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div> */}
              {/* <span className="text-muted-foreground">({product.reviews})</span> */}
            </div>

            <div className="flex items-center space-x-2">
              {salePrice && salePrice < price ? (
                <>
                  <span className="text-lg font-bold text-brand-orange">
                    ৳ {salePrice}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ৳ {price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-brand-orange">
                  ৳ {price}
                </span>
              )}
            </div>
            <div className="flex space-x-2 pt-2">
              <Button
                size="sm"
                className="flex-1 bg-brand-orange hover:bg-brand-orange-light"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button size="sm" variant="outline">
                Shop Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
