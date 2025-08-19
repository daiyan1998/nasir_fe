import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import iphoneHero from "@/assets/iphone-16-hero.jpg";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main hero banner */}
        <div className="lg:col-span-2">
          <Card className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
            <div className="p-8 flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  iPhone 16 Series
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  The most advanced iPhone yet with A18 Pro chip and enhanced cameras
                </p>
                <Button className="bg-brand-orange hover:bg-brand-orange-light text-white font-semibold px-8 py-3">
                  Shop Now
                </Button>
              </div>
              <div className="flex-1 flex justify-end">
                <img
                  src={iphoneHero}
                  alt="iPhone 16 Series"
                  className="max-w-full h-auto max-h-64 object-contain"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Side banners */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-0 p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Samsung Galaxy Watch6</h3>
            <p className="text-sm text-gray-600 mb-4">Starting at $329</p>
            <Button variant="outline" size="sm" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
              View Details
            </Button>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-0 p-6 text-center">
            <h3 className="text-xl font-bold mb-2">AirPods Pro</h3>
            <p className="text-sm text-gray-600 mb-4">with MagSafe Case</p>
            <Button variant="outline" size="sm" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
              Shop Now
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;