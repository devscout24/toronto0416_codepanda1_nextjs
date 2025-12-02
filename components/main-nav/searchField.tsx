"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { SearchIcon, X } from "lucide-react";
import { getSearchProducts } from "./actions";
import { TProduct } from "@/types/product.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import defaultImage from "@/assets/images/default.png";

type SearchFieldProps = {
  isMobile?: boolean;
};

export default function SearchField({ isMobile = false }: SearchFieldProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState<TProduct[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  // Function to handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length >= 3) {
        setLoading(true);
        try {
          const response = await getSearchProducts(query);
          const products = response || [];
          setResults(products);
          setShowDropdown(true);
        } catch (error) {
          console.error("Error searching products:", error);
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

  return (
    <div className={`relative ${isMobile ? "mx-auto w-fit" : "w-full"}`}>
      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        className="relative"
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ..."
          className={`rounded-full pr-8 ${
            isMobile ? "w-56 bg-white" : "w-60 xl:w-[18rem]"
          }`}
        />
        <div className="pointer-events-none absolute top-1.5 right-2">
          <SearchIcon className="size-6 text-gray-400" />
        </div>
      </form>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className={`absolute z-50 mt-2 overflow-hidden rounded-lg border bg-white shadow-lg ${
            isMobile ? "w-[20rem]" : "w-100 xl:w-120"
          }`}
        >
          <div className="flex items-center justify-between border-b bg-gray-50 p-3">
            <span className="text-sm font-semibold">
              Search Results for: {query}
            </span>
            <button
              onClick={handleCloseDropdown}
              className="rounded-full p-1 hover:bg-gray-200"
              aria-label="Close search results"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="py-8 text-center">
                <p className="text-gray-500">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex cursor-pointer items-center justify-between gap-3 px-4 py-2 transition-colors hover:bg-gray-50"
                  >
                    {product.images && product.images.length > 0 && (
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            imageError ||
                            !product?.images ||
                            product?.images.length === 0
                              ? defaultImage
                              : product?.images[0]
                          }
                          alt={product.title}
                          width={60}
                          height={60}
                          className="rounded-md border object-cover"
                          onError={handleImageError}
                        />
                        <div className="">
                          <h3 className="text-base font-semibold">
                            {product.title}
                          </h3>
                          {product.rating && (
                            <p className="ml-auto text-sm text-orange-500">
                              ⭐ {product.rating}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-2 flex items-center gap-2">
                      {product.price && (
                        <p className="text-lg font-medium text-green-600">
                          ${product.price}
                        </p>
                      )}
                      {product.oldPrice && (
                        <p className="text-lg text-gray-400 line-through">
                          ${product.oldPrice}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No results found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
