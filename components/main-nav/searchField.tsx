"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { SearchIcon, X } from "lucide-react";
import { getSearchProducts } from "./actions";
import { TProduct } from "@/types/product.type";
import Image from "next/image";

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

  // Debounced search effect
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length >= 3) {
        setLoading(true);
        try {
          const response = await getSearchProducts(query);
          // Extract results array from the API response
          const products = response?.data?.results || [];
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
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Close dropdown when clicking outside
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCloseDropdown = () => setShowDropdown(false);

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
            isMobile ? "w-[14rem] bg-white" : "w-[15rem] xl:w-[18rem]"
          }`}
        />
        <div className="absolute top-1.5 right-2">
          <SearchIcon className="size-[1.5rem] text-gray-400" />
        </div>
      </form>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className={`absolute z-50 mt-2 bg-white border rounded-lg shadow-lg overflow-hidden ${
            isMobile ? "w-[20rem]" : "w-[25rem] xl:w-[30rem]"
          }`}
        >
          <div className="flex items-center justify-between p-3 border-b bg-gray-50">
            <span className="font-semibold text-sm">
              Search Results for: {query}
            </span>
            <button
              onClick={handleCloseDropdown}
              className="hover:bg-gray-200 rounded-full p-1"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3"
                  >
                    {product.images && product.images.length > 0 && (
                      <div className="flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base">{product.title}</h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {product.price && (
                          <p className="text-green-600 font-medium text-sm">
                            ${product.price}
                          </p>
                        )}
                        {product.oldPrice && (
                          <p className="text-gray-400 text-sm line-through">
                            ${product.oldPrice}
                          </p>
                        )}
                        {product.rating && (
                          <p className="text-yellow-600 text-sm ml-auto">
                            ⭐ {product.rating}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No results found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}