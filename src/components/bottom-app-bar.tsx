"use client";
import { Home, Search, ShoppingCart, Truck, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface BottomAppBarProps {
  cartCount?: number;
}

export default function BottomAppBar({ cartCount = 0 }: BottomAppBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
      <ul className="flex h-14 items-center justify-around">
        <li>
          <NavItem href="/" label="Home" icon={<Home className="h-5 w-5" />} />
        </li>
        <li>
          <NavItem
            href="/search"
            label="Search"
            icon={<Search className="h-5 w-5" />}
          />
        </li>
        <li className="relative">
          <NavItem
            href="/track-order"
            label="Track Order"
            icon={<Truck className="h-5 w-5" />}
          />
        </li>
        <li>
          <NavItem
            href="/profile"
            label="Profile"
            icon={<User className="h-5 w-5" />}
          />
        </li>
      </ul>
    </nav>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={href}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 text-xs text-muted-foreground",
        "transition-colors hover:text-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
