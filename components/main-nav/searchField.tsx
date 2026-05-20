"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { SearchIcon, X } from "lucide-react";
import { getSearchProducts } from "./actions";
import { TProduct } from "@/types/product.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import defaultImage from "@/assets/images/default.png";

type SearchFieldProps = {
  isMobile?: boolean;
  isTablet?: boolean;
};

export default function SearchField({
  isMobile = false,
  isTablet = false,
}: SearchFieldProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState<TProduct[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleImageError = (id: number) =>
    setImageErrors((prev) => ({ ...prev, [id]: true }));

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length >= 3) {
        setLoading(true);
        try {
          const response = await getSearchProducts(query);
          setResults(response || []);
          setShowDropdown(true);
        } catch (error) {
          console.error(error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setShowDropdown(false);
        setResults([]);
      }
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCloseDropdown = () => setShowDropdown(false);
  const handleProductClick = (productId: number) => {
    setShowDropdown(false);
    setQuery("");
    router.push(`/all-category/${productId}`);
  };

  // Sizing logic
  const inputClass = isMobile
    ? "w-56 bg-white"
    : isTablet
      ? "w-48 bg-white"
      : "w-60 lg:w-60 xl:w-[18rem]";

  const dropdownClass = isMobile ? "w-67" : "w-100 xl:w-120";

  return (
    <div
      className={`relative ${isMobile || isTablet ? "mx-auto w-fit" : "w-full"}`}
    >
      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        className="relative"
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ..."
          className={`rounded-full pr-8 ${inputClass}`}
        />
        <div className="pointer-events-none absolute top-1.5 right-2">
          <SearchIcon className="size-6 text-gray-400" />
        </div>
      </form>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className={`absolute z-50 mt-2 overflow-hidden rounded-lg border bg-white shadow-lg ${dropdownClass}`}
        >
          <div className="flex items-center justify-between border-b bg-gray-50 p-3">
            <span className="text-sm font-semibold">Results for: {query}</span>
            <button
              onClick={handleCloseDropdown}
              className="rounded-full p-1 hover:bg-gray-200"
              aria-label="Close search results"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="max-h-100 overflow-y-auto">
            {loading ? (
              <div className="py-8 text-center text-gray-500">Searching...</div>
            ) : results.length > 0 ? (
              <div className="divide-y">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex cursor-pointer items-center justify-between gap-3 px-4 py-2 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          imageErrors[product.id] ||
                          !product.images ||
                          product.images.length === 0
                            ? defaultImage
                            : product.images[0]
                        }
                        alt={product.title}
                        width={60}
                        height={60}
                        className={`rounded-md border object-cover ${
                          isTablet ? "h-10 w-10" : "h-10 w-10 md:h-16 md:w-16"
                        }`}
                        onError={() => handleImageError(product.id)}
                      />
                      <div>
                        <h3
                          className={`leading-4 font-medium ${
                            isTablet
                              ? "text-sm"
                              : "text-sm md:text-base md:leading-5 md:font-semibold"
                          }`}
                        >
                          {product.title}
                        </h3>
                        {product.rating ? (
                          <p className="text-sm text-orange-500">
                            ⭐ {product.rating}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-0.5">
                      {product.price && (
                        <p
                          className={`font-medium text-green-600 ${
                            isTablet ? "text-sm" : "text-lg"
                          }`}
                        >
                          ${product.price}
                        </p>
                      )}
                      {product.oldPrice && (
                        <p
                          className={`text-gray-400 line-through ${
                            isTablet ? "text-xs" : "text-lg"
                          }`}
                        >
                          ${product.oldPrice}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}