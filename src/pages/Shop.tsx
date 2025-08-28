import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  List,
} from "lucide-react";
import galaxyTabImage from "@/assets/galaxy-watch.jpg";
import { useParams } from "react-router-dom";
import { useGetProducts } from "@/hooks/queries/useProductQuery";
import { useGetCategoryFilter } from "@/hooks/queries/useCategoryQuery";
import { CategoryFilter } from "@/types/Category.type";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const Shop = () => {
  const { categorySlug } = useParams();
  const [priceRange, setPriceRange] = useState([10000, 100000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  // hooks
  const {data:getProducts, isLoading: isLoadingProducts} = useGetProducts({
    filters: {
      categorySlug,
      attributes: selectedFilters,
    },
  });

  const { data: getCategoryFilter, isLoading: isLoadingCategoryFilter } =
    useGetCategoryFilter(categorySlug);

  const categoryFilters = getCategoryFilter?.categoryFilters ?? [];

  const products = getProducts?.data ?? [];


  const handleFilterChange = (
    attributeName: string,
    value: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const prevValues = prev[attributeName] || [];
      let updatedValues = checked
        ? [...prevValues, value] // add
        : prevValues.filter((v) => v !== value); // remove

      return {
        ...prev,
        [attributeName]: updatedValues,
      };
    });
  };
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
              <img
                src={galaxyTabImage}
                alt="Galaxy Tab"
                className="w-24 h-24 object-contain"
              />
              <img
                src={galaxyTabImage}
                alt="Galaxy Tab"
                className="w-24 h-24 object-contain"
              />
              <img
                src={galaxyTabImage}
                alt="Galaxy Tab"
                className="w-24 h-24 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4 border-2 rounded-md h-full">
            <div className="p-4 text-lg font-semibold border-b-2">
              Filters
            </div>
            <Accordion type="single" collapsible>
              {isLoadingCategoryFilter ? (
                <div>Loading...</div>
              ) : (
                categoryFilters.map((categoryFilter) => (
                  <AccordionItem
                    key={categoryFilter.id}
                    value={categoryFilter.name}
                    className=""
                  >
                    <AccordionTrigger className="px-2">{categoryFilter.name}</AccordionTrigger>
                    {categoryFilter.attribute?.attributeValues?.map(
                      (filter) => (
                        <AccordionContent key={filter.id} className="px-2">
                          <div
                            key={filter.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={filter.value}
                              checked={
                                selectedFilters[categoryFilter.attribute.name]?.includes(
                                  filter.value
                                ) || false
                              }
                              onCheckedChange={(checked) =>
                                handleFilterChange(
                                  categoryFilter.name,
                                  filter.value,
                                  checked as boolean
                                )
                              }
                            />
                            <Label htmlFor={filter.value} className="text-sm">
                              {filter.value}
                            </Label>
                          </div>
                        </AccordionContent>
                      )
                    )}
                  </AccordionItem>
                ))
              )}
            </Accordion>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold">Samsung</h2>
                <p className="text-muted-foreground">
                  Showing {products.length} results
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
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
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {isLoadingProducts ? (
                [1, 2, 3, 4,].map((index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : products.length === 0 ? (
                <div>No products found.</div>
              ) : 
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-12 space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-brand-orange text-white"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="px-2">...</span>
              <Button variant="outline" size="sm">
                8
              </Button>
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
              <h2 className="text-2xl font-bold mb-6">
                Samsung Tablet Price in Bangladesh
              </h2>

              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-4">
                  Samsung tablets are in big demand in Bangladesh. A full market
                  research shows that a main part of the people in Bangladesh
                  use Samsung tablets more than they use phones. Some models
                  have made Samsung tablets still more comfortable for people,
                  and due to their affordability and reliability.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4">
                  Why Samsung Tabs Are a Smart Pick in Bangladesh
                </h3>

                <p className="text-muted-foreground mb-4">
                  Quality with a wide reputation. A top tablet brand offered to
                  quality and user-friendly devices. The Galaxy Tab series in
                  more cheap ranges. Premium Range as well as mid range galaxy
                  tab, all the options in the Samsung tablet collection are
                  provided to match your requirements and budget. Most people in
                  Bangladesh are big fans of Samsung devices because of the
                  reliable performance, vibrant displays, and an extensive
                  digital ecosystem.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4">
                  Samsung Tab Price in Bangladesh - Price Range by Category
                </h3>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Budget Range</h4>
                    <p className="text-brand-orange font-bold">
                      ৳15,000 - ৳35,000
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Galaxy Tab A series, perfect for basic tasks and
                      entertainment
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Mid Range</h4>
                    <p className="text-brand-orange font-bold">
                      ৳35,000 - ৳70,000
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Galaxy Tab S FE series, balanced performance and features
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Premium Range</h4>
                    <p className="text-brand-orange font-bold">
                      ৳70,000 - ৳150,000
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Galaxy Tab S series, flagship features and premium build
                    </p>
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
