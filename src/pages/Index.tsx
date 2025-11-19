import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { useGetProducts } from "@/hooks/queries/useProductQuery";


const Index = () => {
  const {data: productsRes} = useGetProducts()
  const products = productsRes?.data || []
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      {/* <FeaturedCategories /> */}
      <ProductSection 
        title="Featured Products" 
        products={products} 
      />
      <PromoBanner />
      <ProductSection 
        title="New Arrival Products" 
        products={products} 
      />
      <Footer />
    </div>
  );
};

export default Index;
