import { Search, ShoppingCart, User, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "./cart/CartDrawer";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

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
            <CartDrawer />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-2">
          <Menubar className="bg-transparent border-0 h-auto p-0">
            <MenubarMenu>
              <MenubarTrigger className="text-white hover:text-brand-orange data-[state=open]:text-brand-orange font-medium bg-transparent">
                Home
              </MenubarTrigger>
            </MenubarMenu>
            
            <MenubarMenu>
              <MenubarTrigger className="text-white hover:text-brand-orange data-[state=open]:text-brand-orange bg-transparent">
                Smartphones
              </MenubarTrigger>
              <MenubarContent className="bg-popover border-border">
                <MenubarItem>iPhone</MenubarItem>
                <MenubarItem>Samsung Galaxy</MenubarItem>
                <MenubarItem>Google Pixel</MenubarItem>
                <MenubarItem>OnePlus</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cases & Protection</MenubarItem>
                <MenubarItem>Screen Protectors</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-white hover:text-brand-orange data-[state=open]:text-brand-orange bg-transparent">
                Laptops
              </MenubarTrigger>
              <MenubarContent className="bg-popover border-border">
                <MenubarItem>MacBook</MenubarItem>
                <MenubarItem>Gaming Laptops</MenubarItem>
                <MenubarItem>Business Laptops</MenubarItem>
                <MenubarItem>Ultrabooks</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Laptop Bags</MenubarItem>
                <MenubarItem>Cooling Pads</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-white hover:text-brand-orange data-[state=open]:text-brand-orange bg-transparent">
                Tablets
              </MenubarTrigger>
              <MenubarContent className="bg-popover border-border">
                <MenubarItem>iPad</MenubarItem>
                <MenubarItem>Samsung Galaxy Tab</MenubarItem>
                <MenubarItem>Surface Tablets</MenubarItem>
                <MenubarItem>Android Tablets</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Tablet Cases</MenubarItem>
                <MenubarItem>Stylus & Pens</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-white hover:text-brand-orange data-[state=open]:text-brand-orange bg-transparent">
                Accessories
              </MenubarTrigger>
              <MenubarContent className="bg-popover border-border">
                <MenubarItem>Headphones & Earbuds</MenubarItem>
                <MenubarItem>Chargers & Cables</MenubarItem>
                <MenubarItem>Power Banks</MenubarItem>
                <MenubarItem>Wireless Speakers</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Phone Holders</MenubarItem>
                <MenubarItem>Camera Accessories</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-white hover:text-brand-orange data-[state=open]:text-brand-orange bg-transparent">
                Smart Home
              </MenubarTrigger>
              <MenubarContent className="bg-popover border-border">
                <MenubarItem>Smart Speakers</MenubarItem>
                <MenubarItem>Smart Lights</MenubarItem>
                <MenubarItem>Security Cameras</MenubarItem>
                <MenubarItem>Smart Thermostats</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Smart Plugs</MenubarItem>
                <MenubarItem>Home Automation</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-white hover:text-brand-orange data-[state=open]:text-brand-orange bg-transparent">
                Gaming
              </MenubarTrigger>
              <MenubarContent className="bg-popover border-border">
                <MenubarItem>Gaming Consoles</MenubarItem>
                <MenubarItem>Gaming Controllers</MenubarItem>
                <MenubarItem>Gaming Keyboards</MenubarItem>
                <MenubarItem>Gaming Mice</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Gaming Headsets</MenubarItem>
                <MenubarItem>Gaming Chairs</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-white hover:text-brand-orange data-[state=open]:text-brand-orange bg-transparent">
                Deals
              </MenubarTrigger>
              <MenubarContent className="bg-popover border-border">
                <MenubarItem>Daily Deals</MenubarItem>
                <MenubarItem>Flash Sales</MenubarItem>
                <MenubarItem>Clearance</MenubarItem>
                <MenubarItem>Bundle Offers</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </nav>
    </header>
  );
};

export default Header;