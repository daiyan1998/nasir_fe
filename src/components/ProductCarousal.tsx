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
    className="mx-auto w-full max-w-7xl md:px-10">
      <CarouselContent className="">
        {products.map((product, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 sm:basis-1/2  md:basis-2/5 lg:basis-1/5"
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
