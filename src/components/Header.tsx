import { Search, ShoppingCart, User, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="bg-brand-dark text-white">
      {/* Top bar */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span>Free Shipping On Order Over $100</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Follow Us:</span>
              <div className="flex space-x-2">
                <a href="#" className="hover:text-brand-orange transition-colors">Facebook</a>
                <a href="#" className="hover:text-brand-orange transition-colors">Twitter</a>
                <a href="#" className="hover:text-brand-orange transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-brand-orange">
              Gadgets
            </h1>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-2 bg-white text-black border-0"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1 bg-brand-orange hover:bg-brand-orange-light"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:text-brand-orange hover:bg-transparent">
              <User className="h-5 w-5" />
              <span className="ml-1 hidden md:inline">Account</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-brand-orange hover:bg-transparent">
              <Heart className="h-5 w-5" />
              <span className="ml-1 hidden md:inline">Wishlist</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-brand-orange hover:bg-transparent relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs px-1.5 py-0.5">
                3
              </Badge>
              <span className="ml-1 hidden md:inline">Cart</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-3">
            <a href="#" className="text-white hover:text-brand-orange transition-colors font-medium">Home</a>
            <a href="#" className="text-white hover:text-brand-orange transition-colors">Smartphones</a>
            <a href="#" className="text-white hover:text-brand-orange transition-colors">Laptops</a>
            <a href="#" className="text-white hover:text-brand-orange transition-colors">Tablets</a>
            <a href="#" className="text-white hover:text-brand-orange transition-colors">Accessories</a>
            <a href="#" className="text-white hover:text-brand-orange transition-colors">Smart Home</a>
            <a href="#" className="text-white hover:text-brand-orange transition-colors">Gaming</a>
            <a href="#" className="text-white hover:text-brand-orange transition-colors">Deals</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;