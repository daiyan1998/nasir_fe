import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Star, Heart, ShoppingCart, Plus, Minus, Truck, Shield, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useGetProductById, useGetProducts } from "@/hooks/queries/useProductQuery";
import ProductAttributes from "@/components/ProductAttributes";
import { useCartStore } from "@/stores/cartStore";
import { IMG_URL } from '@/utils/constants';

const Product = () => {
  const { id } = useParams();
  const addItem = useCartStore(state => state.addItem);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  

  // hooks
  const { data, isLoading } = useGetProductById(id);

  const productData = data?.data ?? null

  const price = productData?.price
  const salePrice = productData?.salePrice ?? 1
  const discountAmmount = price - salePrice
  const discountPercentage = ((discountAmmount / price) * 100).toFixed(0)

  
  
  const product = {
    ...productData,
    productId: productData?.id,
    images: productData?.images?.map(img => img.url),
    salePrice: productData?.salePrice,
    price: productData?.price,
    availability:
      productData?.trackInventory && productData?.stock <= productData?.lowStockThreshold
        ? "Low Stock"
        : "In Stock",
    rating: 4.5, // stub
    reviews: 120, // stub
    features: [productData?.shortDesc],
    selectedOptions: selectedOptions
  
  };


  const [selectedImage, setSelectedImage] = useState(
    productData?.images?.findIndex(img => img.isPrimary) || 0
  );
  const [selectedColor, setSelectedColor] = useState(0);
  // const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity: quantity
    })
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {/* <div className="text-sm text-muted-foreground mb-6">
          Home {'>'} Electronics {'>'} Smart Watches {'>'} Apple {'>'} Apple Watch Series 10
        </div> */}

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                // src={product.images?.[selectedImage] || `${'/placeholder.png'}`}
                src={`${IMG_URL}${product.images?.[selectedImage]}`}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>
            <div className="flex space-x-2">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-[hsl(var(--brand-orange))]" : "border-gray-200"
                  }`}
                >
                  <img src={`${IMG_URL}${image}`} alt="" className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2 bg-[hsl(var(--success))] text-white">New Arrival</Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product?.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product?.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {productData?.salePrice > productData?.price ? (
               <>
              <span className="text-3xl font-bold text-[hsl(var(--brand-orange))]">৳ {product?.price}</span>
               </>
              ) :
                <>
              <span className="text-3xl font-bold text-[hsl(var(--brand-orange))]">৳ {product?.salePrice}</span>
              <span className="text-xl text-muted-foreground line-through">৳ {product?.price}</span>
              <Badge variant="destructive">-{discountPercentage}%</Badge>
                </>
              }
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium">Availability: </span>
                <span className="text-[hsl(var(--success))]">{product.availability}</span>
              </div>
              <div>
                <span className="text-sm font-medium">SKU: </span>
                <span className="text-muted-foreground">{product.sku}</span>
              </div>
              <div className="prose tiptap" dangerouslySetInnerHTML={{ __html: product.specifications }}>
              </div>
            </div>

            {/* Color Selection */}
            <ProductAttributes product={product} onSelectionChange={(selections) => setSelectedOptions(selections)} />
         

         

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-0"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleAddToCart} className="flex-1 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange-light))] text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-[hsl(var(--brand-orange))]" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-[hsl(var(--brand-orange))]" />
                <p className="text-xs text-muted-foreground">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-6 w-6 mx-auto mb-2 text-[hsl(var(--brand-orange))]" />
                <p className="text-xs text-muted-foreground">30 Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-medium mb-2">Description</h3>
          <p className="text-sm leading-relaxed text-muted-foreground prose" dangerouslySetInnerHTML={{ __html: product.description }}>
          </p>
        </div>

        {/* Recently Viewed */}
        {/* <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.slice(0, 4).map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <img src={item.image} alt={item.name} className="w-full h-24 object-contain mb-2" />
                  <h3 className="text-sm font-medium mb-1">{item.name}</h3>
                  <p className="text-[hsl(var(--brand-orange))] font-bold">{item.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Product Details Tabs */}
        <Tabs defaultValue="overview" className="mb-12">
          {/* <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="more">More</TabsTrigger>
          </TabsList> */}
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* <div>
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="space-y-3">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">{spec.label}</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div> */}
              
              {/* <div>
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-[hsl(var(--brand-orange))] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </TabsContent>
          
          {/* <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-4">Apple Watch Series 10</h3>
              <p className="mb-4">
                The Apple Watch Series 10 represents the pinnacle of wearable technology, combining advanced health monitoring capabilities with sleek design. This revolutionary smartwatch features the new S10 chip for lightning-fast performance and extended battery life.
              </p>
              <p className="mb-4">
                With its Always-On Retina display, you can check the time, notifications, and complications without raising your wrist. The Digital Crown with haptic feedback provides intuitive navigation, while the comprehensive suite of health sensors keeps you informed about your wellbeing.
              </p>
              <h4 className="text-md font-semibold mb-2">Apple Watch Series 10 Features</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>All-day battery life with fast-charging capabilities</li>
                <li>Advanced fitness tracking with built-in GPS</li>
                <li>Comprehensive health monitoring including ECG and blood oxygen</li>
                <li>Seamless integration with iPhone and other Apple devices</li>
                <li>Water resistant design perfect for swimming and water sports</li>
              </ul>
            </div>
          </TabsContent> */}
          
          {/* <TabsContent value="shipping" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Shipping Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Delivery Options</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Standard Delivery: 3-5 business days</li>
                    <li>• Express Delivery: 1-2 business days</li>
                    <li>• Same Day Delivery: Available in select cities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Shipping Costs</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Free shipping on orders over $500</li>
                    <li>• Standard shipping: $15</li>
                    <li>• Express shipping: $25</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent> */}
          
          {/* <TabsContent value="more" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Why Choose Apple Gadgets?</h3>
                <p className="text-muted-foreground mb-4">
                  Apple has long been known for its commitment to innovation, quality, and user experience. When you choose Apple products, you're investing in technology that seamlessly integrates into your daily life, providing reliable performance and cutting-edge features.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Warranty</h3>
                <p className="text-muted-foreground">
                  Every Apple Watch Series 10 comes with a comprehensive 2-year manufacturer warranty covering defects in materials and workmanship.
                </p>
              </div>
            </div>
          </TabsContent> */}
        </Tabs>

        {/* Related Products */}
        {/* <div>
          <h2 className="text-xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {relatedProducts.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <img src={item.image} alt={item.name} className="w-full h-32 object-contain mb-3" />
                  <h3 className="text-sm font-medium mb-2 line-clamp-2">{item.name}</h3>
                  <p className="text-[hsl(var(--brand-orange))] font-bold">{item.price}</p>
                  <Button size="sm" className="w-full mt-2 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange-light))]">
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default Product;