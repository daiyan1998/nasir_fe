import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { useGetProducts } from "@/hooks/queries/useProductQuery";

const Index = () => {
  const { data: productsRes } = useGetProducts();
  const products = productsRes?.data || [];
  const { data: featuredProducts } = useGetProducts({
    filters: {
      tags: ["Featured Product"],
    },
  });
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      {/* <FeaturedCategories /> */}
      <ProductSection title="New Products" products={products} />
      <PromoBanner />
      <ProductSection
        title="Featured Products"
        products={featuredProducts?.data || []}
      />
    </div>
  );
};

export default Index;
