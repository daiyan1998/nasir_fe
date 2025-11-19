import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types/Product.type";
import ProductCard from "./ProductCard";

interface ProductCarousalProps {
  products: Product[];
}
const ProductCarousal = ({ products }: ProductCarousalProps): JSX.Element => {
  return (
    <Carousel
    className="mx-auto w-full max-w-7xl p-10">
      <CarouselContent className="">
        {products.map((product, index) => (
          <CarouselItem
            key={index}
            className="md:basis-2/5 lg:basis-1/3"
          >
            <div className="p-1">
              <ProductCard product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductCarousal;
