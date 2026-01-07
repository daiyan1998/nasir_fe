import React, { useState, useRef, useEffect } from "react";
import { Search, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useGetSearchProducts } from "@/hooks/queries/useProductQuery";
import { IMG_URL } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Product } from "@/types/Product.type";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => Promise<Product[]>;
  onSelect?: (result: Product) => void;
  debounceMs?: number;
  maxResults?: number;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search products...",
  onSearch,
  onSelect,
  debounceMs = 350,
  maxResults = 5,
  className,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();

  // hooks
  const { data } = useGetSearchProducts(query);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const searchResults = await data.data;
        setResults(searchResults);
        setHighlightedIndex(0);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, debounceMs, data]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;

      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;

      case "Enter":
        e.preventDefault();
        if (results.length > 0 && results[highlightedIndex]) {
          handleSelect(results[highlightedIndex]);
        }
        break;
    }
  };

  const handleSelect = (product: Product) => {
    navigate(`/product/${product.id}`);
    if (onSelect) {
      onSelect(product);
    } else {
      // Default behavior: navigate to result URL or log
      console.log("Selected:", product);
      if (product.id) {
        navigate(`/product/${product.id}`);
      }
    }
    setIsOpen(false);
    setQuery("");
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      setIsOpen(true);
    }
  };

  const showDropdown = isOpen && query.trim().length > 0;

  // if(results.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-2xl", className)}
    >
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-10 h-11 text-gray-600"
          aria-label="Search"
          aria-expanded={showDropdown}
          aria-controls="search-results"
          aria-activedescendant={
            highlightedIndex >= 0 && results[highlightedIndex]
              ? `search-result-${results[highlightedIndex].id}`
              : undefined
          }
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown Popup */}
      {showDropdown && (
        <div
          id="search-results"
          role="listbox"
          className={cn(
            "absolute top-full left-0 right-0 mt-2 z-50",
            "bg-popover border border-border rounded-lg shadow-lg",
            "animate-in fade-in-0 slide-in-from-top-2 duration-200",
            "max-h-[400px] overflow-y-auto"
          )}
        >
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8 px-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">
                Searching...
              </span>
            </div>
          )}

          {/* No Results */}
          {!isLoading && results.length === 0 && (
            <div className="py-8 px-4 text-center">
              <p className="text-sm text-muted-foreground">
                No results found for "{query}"
              </p>
            </div>
          )}

          {/* Results List */}
          {!isLoading && results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 px-4 py-2">
              {results.map((result, index) => (
                <ProductCard
                  key={result.id}
                  product={result}
                />
                // <button
                //   key={result.id}
                //   id={`search-result-${result.id}`}
                //   role="option"
                //   aria-selected={index === highlightedIndex}
                //   onClick={() => handleSelect(result)}
                //   onMouseEnter={() => setHighlightedIndex(index)}
                //   className={cn(
                //     "w-full flex items-center gap-3 px-4 py-3",
                //     "text-left transition-colors",
                //     "hover:bg-accent",
                //     index === highlightedIndex && "bg-accent",
                //     "focus:outline-none focus-visible:bg-accent"
                //   )}
                // >
                //   {result.images.length > 0 && (
                //     <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-muted">
                //       <img
                //         src={`${IMG_URL}${result.images[0].url}`}
                //         alt={result.name}
                //         className="w-full h-full object-cover"
                //       />
                //     </div>
                //   )}

                //   <div className="flex-1 min-w-0">
                //     <p className="text-sm font-medium text-foreground truncate">
                //       {result.name}
                //     </p>
                //     <p className="text-xs text-muted-foreground truncate">
                //       ৳{result.price}
                //     </p>
                //   </div>
                // </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
