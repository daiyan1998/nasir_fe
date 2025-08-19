import { Smartphone, Laptop, Tablet, Headphones, Watch, Camera, GamepadIcon, Speaker } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  { name: "Smartphones", icon: Smartphone, color: "text-blue-500" },
  { name: "Laptops", icon: Laptop, color: "text-purple-500" },
  { name: "Tablets", icon: Tablet, color: "text-green-500" },
  { name: "Headphones", icon: Headphones, color: "text-pink-500" },
  { name: "Smartwatches", icon: Watch, color: "text-indigo-500" },
  { name: "Cameras", icon: Camera, color: "text-yellow-500" },
  { name: "Gaming", icon: GamepadIcon, color: "text-red-500" },
  { name: "Audio", icon: Speaker, color: "text-orange-500" },
];

const FeaturedCategories = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">
        Featured <span className="text-brand-orange">Categories</span>
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Card
              key={index}
              className="p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-brand-orange"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-3 rounded-full bg-gray-50 group-hover:bg-brand-orange/10 transition-colors ${category.color} group-hover:text-brand-orange`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-brand-orange transition-colors">
                  {category.name}
                </h3>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCategories;