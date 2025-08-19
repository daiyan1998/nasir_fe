import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Grid3x3, List, Star, ShoppingCart } from "lucide-react";
import galaxyTabImage from "@/assets/galaxy-watch.jpg";

const Shop = () => {
  const [priceRange, setPriceRange] = useState([10000, 100000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popularity");

  const tabletProducts = [
    {
      id: "1",
      name: "Galaxy Tab A9+",
      price: 30000,
      originalPrice: 35000,
      discount: 14,
      rating: 4.2,
      reviews: 128,
      image: galaxyTabImage,
      inStock: true
    },
    {
      id: "2", 
      name: "Galaxy Tab S9 FE",
      price: 65000,
      rating: 4.5,
      reviews: 89,
      image: galaxyTabImage,
      inStock: true
    },
    {
      id: "3",
      name: "Galaxy Tab S9 FE+",
      price: 75000,
      rating: 4.6,
      reviews: 67,
      image: galaxyTabImage,
      inStock: true
    },
    {
      id: "4",
      name: "Galaxy Tab S9 FE",
      price: 62000,
      originalPrice: 68000,
      discount: 9,
      rating: 4.4,
      reviews: 145,
      image: galaxyTabImage,
      inStock: true
    },
    {
      id: "5",
      name: "Galaxy Tab S8",
      price: 55000,
      rating: 4.3,
      reviews: 203,
      image: galaxyTabImage,
      inStock: true
    },
    {
      id: "6",
      name: "Galaxy Tab A8 Ultra",
      price: 95000,
      rating: 4.7,
      reviews: 56,
      image: galaxyTabImage,
      inStock: true
    },
    {
      id: "7",
      name: "Galaxy Tab S9 FE+",
      price: 85000,
      rating: 4.5,
      reviews: 78,
      image: galaxyTabImage,
      inStock: true
    },
    {
      id: "8",
      name: "Galaxy Tab A9",
      price: 25000,
      originalPrice: 28000,
      discount: 11,
      rating: 4.1,
      reviews: 234,
      image: galaxyTabImage,
      inStock: true
    },
    {
      id: "9",
      name: "Galaxy Tab S9 Ultra",
      price: 120000,
      rating: 4.8,
      reviews: 89,
      image: galaxyTabImage,
      inStock: true
    }
  ];

  const brands = ["Samsung", "Apple", "Xiaomi", "Huawei", "Lenovo"];
  const features = ["WiFi", "5G", "4G LTE", "GPS", "Bluetooth"];
  const screenSizes = ["7-8 inch", "8-10 inch", "10-12 inch", "12+ inch"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Galaxy Tab</h1>
              <p className="text-xl opacity-90">Explore all devices</p>
            </div>
            <div className="flex space-x-4">
              <img src={galaxyTabImage} alt="Galaxy Tab" className="w-24 h-24 object-contain" />
              <img src={galaxyTabImage} alt="Galaxy Tab" className="w-24 h-24 object-contain" />
              <img src={galaxyTabImage} alt="Galaxy Tab" className="w-24 h-24 object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Filters</h3>
                
                {/* Brand Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Brand</h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <label htmlFor={brand} className="text-sm">{brand}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={150000}
                      min={10000}
                      step={5000}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>৳{priceRange[0].toLocaleString()}</span>
                      <span>৳{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Features</h4>
                  <div className="space-y-2">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox id={feature} />
                        <label htmlFor={feature} className="text-sm">{feature}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Screen Size */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Screen Size</h4>
                  <div className="space-y-2">
                    {screenSizes.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox id={size} />
                        <label htmlFor={size} className="text-sm">{size}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold">Samsung</h2>
                <p className="text-muted-foreground">Showing {tabletProducts.length} results</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none border-l"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {tabletProducts.map((product) => (
                <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      {product.discount && (
                        <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                          -{product.discount}%
                        </Badge>
                      )}
                      
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4 p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium group-hover:text-brand-orange transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-1 text-sm">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-muted-foreground">({product.reviews})</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-brand-orange">
                          ৳{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ৳{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1 bg-brand-orange hover:bg-brand-orange-light">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button size="sm" variant="outline">
                          Shop Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-12 space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-brand-orange text-white">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="px-2">...</span>
              <Button variant="outline" size="sm">8</Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Information Section */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Samsung Tablet Price in Bangladesh</h2>
              
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-4">
                  Samsung tablets are in big demand in Bangladesh. A full market research shows that a main part of 
                  the people in Bangladesh use Samsung tablets more than they use phones. Some models have made 
                  Samsung tablets still more comfortable for people, and due to their affordability and reliability.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Why Samsung Tabs Are a Smart Pick in Bangladesh</h3>
                
                <p className="text-muted-foreground mb-4">
                  Quality with a wide reputation. A top tablet brand offered to quality and user-friendly devices. The 
                  Galaxy Tab series in more cheap ranges. Premium Range as well as mid range galaxy tab, all the options 
                  in the Samsung tablet collection are provided to match your requirements and budget. Most people in 
                  Bangladesh are big fans of Samsung devices because of the reliable performance, vibrant displays, and 
                  an extensive digital ecosystem.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4">Samsung Tab Price in Bangladesh - Price Range by Category</h3>
                
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Budget Range</h4>
                    <p className="text-brand-orange font-bold">৳15,000 - ৳35,000</p>
                    <p className="text-sm text-muted-foreground">Galaxy Tab A series, perfect for basic tasks and entertainment</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Mid Range</h4>
                    <p className="text-brand-orange font-bold">৳35,000 - ৳70,000</p>
                    <p className="text-sm text-muted-foreground">Galaxy Tab S FE series, balanced performance and features</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Premium Range</h4>
                    <p className="text-brand-orange font-bold">৳70,000 - ৳150,000</p>
                    <p className="text-sm text-muted-foreground">Galaxy Tab S series, flagship features and premium build</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;