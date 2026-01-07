import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";

const HeroSection = () => {
  const banners = [
    "/banner/Web-Banner-4.jpg",
    "/banner/Web-Banner-1.jpg",
    "/banner/Web-Banner-2.jpg",
  ];
  return (
    <section className="container mx-auto px-2 py-8 overflow-hidden">
      <div className="grid grid-cols-1 gap-6">
        {/* Main hero banner */}
        <div className="lg:col-span-2">
          <Carousel className="w-full" plugins={[AutoPlay({ delay: 5000 })]}>
            <CarouselContent>
              {banners.map((banner, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
                      <img src={banner} className="aspect-[16/7]" />
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Side banners */}
        {/* <div className="space-y-6">
          <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-0 p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Samsung Galaxy Watch6</h3>
            <p className="text-sm text-gray-600 mb-4">Starting at $329</p>
            <Button
              variant="outline"
              size="sm"
              className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
            >
              View Details
            </Button>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-0 p-6 text-center">
            <h3 className="text-xl font-bold mb-2">AirPods Pro</h3>
            <p className="text-sm text-gray-600 mb-4">with MagSafe Case</p>
            <Button
              variant="outline"
              size="sm"
              className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
            >
              Shop Now
            </Button>
          </Card>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
