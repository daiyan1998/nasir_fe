import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import laptopImage from "@/assets/gaming-laptop.jpg";

const PromoBanner = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <Card className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 border-0">
        <div className="flex items-center justify-between p-8 text-white">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                HOT DEAL
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Buy Your Favorite Laptop
            </h2>
            <p className="text-xl mb-2">Save Up to 40%</p>
            <p className="text-blue-200 mb-6">Limited time offer on premium gaming laptops</p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
              Shop Now
            </Button>
          </div>
          
          <div className="flex-1 flex justify-end">
            <img
              src={laptopImage}
              alt="Gaming Laptop"
              className="max-w-full h-auto max-h-64 object-contain"
            />
          </div>
        </div>
      </Card>
    </section>
  );
};

export default PromoBanner;