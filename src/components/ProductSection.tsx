import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import airpodsImage from "@/assets/airpods-pro.jpg";
import galaxyWatchImage from "@/assets/galaxy-watch.jpg";
import { Product } from "@/types/Product.type";
import ProductCarousal from "./ProductCarousal";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

const ProductSection = ({ title, subtitle, products }: ProductSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">
            {title.includes("Order") ? (
              <>Ready for <span className="text-brand-orange">Order</span></>
            ) : title.includes("Featured") ? (
              <>Featured <span className="text-brand-orange">Products</span></>
            ) : title.includes("New") ? (
              <>New <span className="text-brand-orange">Arrival</span></>
            ) : title.includes("Top") ? (
              <>Top Brand <span className="text-brand-orange">Products</span></>
            ) : (
              title
            )}
          </h2>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
        
        {/* <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div> */}
      </div>
      <ProductCarousal products={products}/>
    </section>
  );
};

// Sample data for different sections
export const readyForOrderProducts = [
  {
    id: "1",
    image: airpodsImage,
    title: "AirPods Pro 3rd Generation with USB-C",
    price: "$249.00",
    rating: 5,
    reviews: 128,
    isNew: true
  },
  {
    id: "2", 
    image: galaxyWatchImage,
    title: "Samsung Galaxy Watch6 44mm GPS",
    price: "$329.99",
    originalPrice: "$399.99",
    rating: 4,
    reviews: 89,
    discount: "-18%"
  },
  {
    id: "3",
    image: airpodsImage,
    title: "iPhone 15 Pro Max 256GB",
    price: "$1199.00",
    rating: 5,
    reviews: 245
  },
  {
    id: "4",
    image: galaxyWatchImage,
    title: "Apple Watch Series 9 GPS",
    price: "$399.00",
    rating: 5,
    reviews: 156
  },
  {
    id: "5",
    image: airpodsImage,
    title: "OnePlus 12 5G Smartphone",
    price: "$799.99",
    originalPrice: "$899.99",
    rating: 4,
    reviews: 67,
    discount: "-11%"
  }
];

export const featuredProducts = [
  {
    id: "6",
    image: galaxyWatchImage,
    title: "Samsung Galaxy S24 Ultra 512GB",
    price: "$1299.99",
    rating: 5,
    reviews: 312
  },
  {
    id: "7",
    image: airpodsImage,
    title: "Xiaomi Pad 6 11-inch Tablet",
    price: "$349.99",
    originalPrice: "$399.99",
    rating: 4,
    reviews: 89,
    discount: "-12%"
  },
  {
    id: "8",
    image: galaxyWatchImage,
    title: "Samsung Galaxy S24 Plus 256GB",
    price: "$999.99",
    rating: 5,
    reviews: 178
  },
  {
    id: "9",
    image: airpodsImage,
    title: "Pixel 8 Pro 128GB",
    price: "$999.00",
    originalPrice: "$1099.00",
    rating: 4,
    reviews: 134,
    discount: "-9%"
  },
  {
    id: "10",
    image: galaxyWatchImage,
    title: "Motorola Edge+ 2024",
    price: "$899.99",
    rating: 4,
    reviews: 56
  }
];

export default ProductSection;