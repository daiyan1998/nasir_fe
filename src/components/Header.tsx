import { Search, ShoppingCart, User, Heart, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "./cart/CartDrawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      title: "Apple Products",
      items: ["iPhone", "MacBook", "iPad", "Apple Watch", "AirPods", "Accessories"]
    },
    {
      title: "Phones",
      items: ["iPhone", "Samsung Galaxy", "Google Pixel", "OnePlus", "Xiaomi", "HONOR"]
    },
    {
      title: "Tablet",
      items: [
        "iPad",
        {
          title: "Tablet",
          submenu: ["Galaxy Tab", "HONOR Tab", "Xiaomi Pad", "Amazon"]
        },
        "Galaxy Tab",
        "HONOR Tab", 
        "Xiaomi Pad",
        "Amazon"
      ]
    },
    {
      title: "Sound Equipment",
      items: ["Headphones", "Speakers", "Earbuds", "Sound Bars", "Microphones", "Audio Cables"]
    },
    {
      title: "Power & Accessories",
      items: ["Chargers", "Power Banks", "Cables", "Adapters", "Wireless Chargers", "Car Accessories"]
    },
    {
      title: "Fitness & Wearable",
      items: ["Smartwatches", "Fitness Trackers", "Heart Rate Monitors", "Sport Accessories", "Health Monitors"]
    },
    {
      title: "Peripherals",
      items: ["Keyboards", "Mice", "Monitors", "Webcams", "Printers", "External Storage"]
    },
    {
      title: "Cover & Glass",
      items: ["Phone Cases", "Screen Protectors", "Tablet Cases", "Laptop Sleeves", "Camera Protection"]
    },
    {
      title: "Smart Electronics",
      items: ["Smart Home", "IoT Devices", "Smart Lights", "Security Cameras", "Smart Speakers"]
    },
    {
      title: "Used Device",
      items: ["Refurbished Phones", "Used Laptops", "Pre-owned Tablets", "Second-hand Accessories"]
    }
  ];

  const renderMobileMenuItem = (item: any) => {
    if (typeof item === 'string') {
      return (
        <a
          key={item}
          href="#"
          className="block px-4 py-2 text-sm text-foreground hover:bg-[#F97316] hover:text-white rounded transition-colors"
        >
          {item}
        </a>
      );
    }
    
    return (
      <div key={item.title} className="px-4 py-2">
        <div className="font-medium text-sm text-foreground mb-2">{item.title}</div>
        <div className="pl-4 space-y-1">
          {item.submenu.map((subItem: string) => (
            <a
              key={subItem}
              href="#"
              className="block py-1 text-sm text-muted-foreground hover:text-[#F97316] transition-colors"
            >
              {subItem}
            </a>
          ))}
        </div>
      </div>
    );
  };

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
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
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
            <Button variant="ghost" size="sm" className="text-white hover:text-brand-orange hover:bg-transparent hidden md:flex">
              <User className="h-5 w-5" />
              <span className="ml-1">Account</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-brand-orange hover:bg-transparent hidden md:flex">
              <Heart className="h-5 w-5" />
              <span className="ml-1">Wishlist</span>
            </Button>
            <CartDrawer />
            
            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <h2 className="font-bold text-lg">Menu</h2>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {menuItems.map((menu) => (
                      <div key={menu.title} className="border-b">
                        <div className="px-4 py-3 font-medium text-foreground bg-muted/50">
                          {menu.title}
                        </div>
                        <div className="py-2">
                          {menu.items.map((item) => renderMobileMenuItem(item))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Navigation - Desktop */}
      <nav className="border-t border-gray-700 hidden md:block">
        <div className="container mx-auto px-4 py-2">
          <div className="relative w-full overflow-hidden">
            <NavigationMenu className="max-w-full">
              <NavigationMenuList className="flex flex-wrap justify-start space-x-1">
                {menuItems.map((menu) => (
                  <NavigationMenuItem key={menu.title} className="relative">
                    <NavigationMenuTrigger 
                      className="bg-transparent text-white hover:text-white hover:bg-brand-orange data-[state=open]:bg-brand-orange data-[state=open]:text-white font-medium px-3 py-2 rounded transition-colors text-sm whitespace-nowrap"
                    >
                      {menu.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="absolute top-full left-0 mt-1 min-w-[280px] max-w-[400px] p-4 bg-white rounded-lg shadow-lg border z-50 data-[motion=from-start]:animate-in data-[motion=from-start]:slide-in-from-left-52 data-[motion=from-end]:animate-in data-[motion=from-end]:slide-in-from-right-52 data-[motion=to-start]:animate-out data-[motion=to-start]:slide-out-to-left-52 data-[motion=to-end]:animate-out data-[motion=to-end]:slide-out-to-right-52">
                      <div className="grid gap-1">
                        {menu.items.map((item) => {
                          if (typeof item === 'string') {
                            return (
                              <NavigationMenuLink
                                key={item}
                                className="block px-3 py-2 text-sm text-foreground hover:bg-brand-orange hover:text-white rounded transition-colors cursor-pointer"
                              >
                                {item}
                              </NavigationMenuLink>
                            );
                          } else {
                            // Handle nested submenu with proper flyout
                            return (
                              <div key={item.title} className="relative group/submenu">
                                <NavigationMenuLink className="flex items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-brand-orange hover:text-white rounded transition-colors cursor-pointer group-hover/submenu:bg-brand-orange group-hover/submenu:text-white">
                                  <span>{item.title}</span>
                                  <span className="ml-2 text-xs">▶</span>
                                </NavigationMenuLink>
                                {/* Flyout Submenu */}
                                <div className="absolute left-full top-0 ml-1 min-w-[200px] p-2 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 z-[70] pointer-events-none group-hover/submenu:pointer-events-auto">
                                  <div className="space-y-1">
                                    {item.submenu.map((subItem: string) => (
                                      <NavigationMenuLink
                                        key={subItem}
                                        className="block px-3 py-2 text-sm text-foreground hover:bg-brand-orange hover:text-white rounded transition-colors cursor-pointer"
                                      >
                                        {subItem}
                                      </NavigationMenuLink>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;