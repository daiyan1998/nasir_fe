import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ProductAttributes from "./ProductAttributes";
import { Product } from "@/types/Product.type";
import { IMG_URL } from "@/utils/constants";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { currencyFormatter } from "@/lib/utils";

const ProductCard = ({ product }: { product: Product }) => {
  if (!product) return null;
  const price = product?.price;
  const salePrice = product?.salePrice;
  const { amount: discountAmount, percentage: discountPercentage } =
    calculateDiscount(price, salePrice);

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 rounded-2xl">
      <CardContent className="min-h-[340px] flex flex-col justify-between p-2">
        <Link key={product.id} to={`/product/${product.id}`}>
          <div className="relative mb-4">
            <div className="aspect-square rounded-lg overflow-hidden mb-4 p-4">
              {product.images?.length > 0 && (
                <img
                  src={`${IMG_URL}${product.images[0].url}`}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <h3 className="font-medium text-base md:text-xl group-hover:text-brand-orange transition-colors">
              {product.name}
            </h3>
          </div>
        </Link>
        <div>
          <div className="flex flex-col">
            <span className="text-base font-semibold">
              {currencyFormatter(
                salePrice && salePrice < price ? salePrice : price
              )}
            </span>
            <div className="flex items-center space-x-2">
              <span
                className={
                  salePrice && salePrice < price
                    ? "text-xs sm:text-base text-muted-foreground line-through"
                    : "hidden text-xl"
                }
              >
                {currencyFormatter(price)}
              </span>
              {discountAmount > 0 && (
                <Badge className="h-5 text-xs bg-green-100 text-green-600">
                  <span className="inline-block">
                    - {discountPercentage}%
                  </span>
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
