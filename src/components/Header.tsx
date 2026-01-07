import { User, Menu, X, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCategories } from "@/hooks/queries/useCategoryQuery";
import { SearchBar } from "./search-bar";
import { Separator } from "./ui/separator";
import BottomAppBar from "./bottom-app-bar";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // hooks
  const { data: categoryData } = useGetCategories();
  const categories = categoryData?.data;

  const renderMobileMenuItem = (item: any) => {
    if (typeof item === "string") {
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
        <div className="font-medium text-sm text-foreground mb-2">
          {item.title}
        </div>
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
    <header className="bg-brand-dark text-white sticky top-0 z-50">
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-3 justify-between">
          {/* Logo */}
          <Link to="/">
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl font-bold">Flux Fords</h1>
              <img src="/flux-icon.jpg" alt="Logo" className="h-10 w-10 mr-2" />
            </div>
          </Link>

          {/* Search bar */}
          <SearchBar />

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-brand-orange hover:bg-transparent hidden md:flex"
              >
                <User className="h-5 w-5" />
                <span className="ml-1">Account</span>
              </Button>
            </Link>

            <Link to="/track-order">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-brand-orange hover:bg-transparent hidden md:flex"
              >
                <Truck className="h-5 w-5" />
                <span className="ml-1">Track Order</span>
              </Button>
            </Link>
            <CartDrawer />

            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <h2 className="font-bold text-lg">Menu</h2>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {categories?.map((menu) => (
                      <div key={menu.name} className="border-b">
                        <Link to={`/category/${menu.slug}`}>
                          <div className="px-4 py-3 font-medium text-foreground bg-muted/50">
                            {menu.name}
                          </div>
                        </Link>
                        {/* <div className="py-2">
                          {menu.items?.map((item) => renderMobileMenuItem(item))}
                        </div>name*/}
                      </div>
                    ))}
                    <Separator/>
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
                {categories?.map((menu) => (
                  <NavigationMenuItem key={menu.id} className="relative">
                    <Link to={`/category/${menu.slug}`}>
                      <NavigationMenuTrigger className="bg-transparent text-white hover:text-white hover:bg-brand-orange data-[state=open]:bg-brand-orange data-[state=open]:text-white font-medium px-3 py-2 rounded transition-colors text-sm whitespace-nowrap">
                        {menu.name}
                      </NavigationMenuTrigger>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>

      {/* Bottom App Bar */}
      <BottomAppBar cartCount={0} />
    </header>
  );
};

export default Header;
