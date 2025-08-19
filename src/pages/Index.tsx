import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import ProductSection, { readyForOrderProducts, featuredProducts } from "@/components/ProductSection";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import airpodsImage from "@/assets/airpods-pro.jpg";
import galaxyWatchImage from "@/assets/galaxy-watch.jpg";

// New arrival products data
const newArrivalProducts = [
  {
    id: "11",
    image: airpodsImage,
    title: "GoPro Hero 12 4K Action Camera",
    price: "$399.99",
    rating: 5,
    reviews: 89,
    isNew: true
  },
  {
    id: "12",
    image: galaxyWatchImage,
    title: "ASUS ROG Ally Gaming Handheld",
    price: "$699.99",
    originalPrice: "$799.99",
    rating: 4,
    reviews: 124,
    discount: "-12%",
    isNew: true
  },
  {
    id: "13",
    image: airpodsImage,
    title: "Apple HomePod mini Smart Speaker",
    price: "$99.00",
    rating: 4,
    reviews: 203,
    isNew: true
  },
  {
    id: "14",
    image: galaxyWatchImage,
    title: "Instant Pot Air Fryer 7QT Duo Nova",
    price: "$159.99",
    originalPrice: "$199.99",
    rating: 5,
    reviews: 567,
    discount: "-20%",
    isNew: true
  },
  {
    id: "15",
    image: airpodsImage,
    title: "Beats Pill Wireless Speaker",
    price: "$149.99",
    rating: 4,
    reviews: 78,
    isNew: true
  }
];

// Top brand products data
const topBrandProducts = [
  {
    id: "16",
    image: galaxyWatchImage,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: "$399.99",
    originalPrice: "$429.99",
    rating: 5,
    reviews: 1245,
    discount: "-7%"
  },
  {
    id: "17",
    image: airpodsImage,
    title: "Bose QuietComfort Ultra Headphones",
    price: "$429.00",
    rating: 5,
    reviews: 892
  },
  {
    id: "18",
    image: galaxyWatchImage,
    title: "Apple 27\" Studio Display 5K",
    price: "$1599.00",
    rating: 5,
    reviews: 234
  },
  {
    id: "19",
    image: airpodsImage,
    title: "Samsung Galaxy Z Flip6 256GB",
    price: "$1099.99",
    originalPrice: "$1199.99",
    rating: 4,
    reviews: 456,
    discount: "-8%"
  },
  {
    id: "20",
    image: galaxyWatchImage,
    title: "Galaxy Buds3 Pro Wireless Earbuds",
    price: "$249.99",
    rating: 4,
    reviews: 178
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedCategories />
      <ProductSection 
        title="Ready for Order" 
        products={readyForOrderProducts} 
      />
      <ProductSection 
        title="Featured Products" 
        products={featuredProducts} 
      />
      <PromoBanner />
      <ProductSection 
        title="New Arrival" 
        products={newArrivalProducts} 
      />
      <ProductSection 
        title="Top Brand Products" 
        products={topBrandProducts} 
      />
      <Footer />
    </div>
  );
};

export default Index;
