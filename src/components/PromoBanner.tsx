import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import laptopImage from "@/assets/gaming-laptop.jpg";

const PromoBanner = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <Card className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 border-0">
            <img
              src='/banner/Web-Banner-3.jpg'
              alt="Gaming Laptop"
              className="max-w-full "
            />
      </Card>
    </section>
  );
};

export default PromoBanner;