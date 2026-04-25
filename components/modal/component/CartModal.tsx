"use client";

import {
  addToCart,
  getProductDetails,
} from "@/app/all-category/components/action";
import { Counter } from "@/components/animate-ui/components/animate/counter";
import CardActionGuard from "@/components/card/components/CardActionGuard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { ThumbnailCarousel } from "@/components/shared/ThumbnailsCarousel";
import { TProduct } from "@/types/product.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Rating from "@/components/shared/Rating";
import { CartCarosul } from "./CartCarosul";

export default function CartModal() {
  const [quantity, setQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [packingInstructions, setPackingInstructions] = useState<string>("");

  const searchParams = useSearchParams();
  const product_id = searchParams.get("product_id");

  useEffect(() => {
    if (!product_id || product_id === "undefined") return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductDetails(product_id);
        setProductDetails(data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setProductDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  const handleAddToCard = async (product_id: number | undefined) => {
    if (!product_id) {
      console.error("Error: Product ID is required.");
      return;
    }

    console.log(
      { product_id, quantity, packingInstructions },
      "Payload for addToCart function",
    );
    setCartLoading(true);
    try {
      const res = await addToCart(product_id, quantity, packingInstructions);
      if (res?.status === "success") {
        toast.success(res?.message || "Product added to cart successfully!");
      } else {
        toast.error(res?.message || "Failed to add product.");
      }
      window.history.back();
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add product.",
      );
    } finally {
      setCartLoading(false);
    }
  };

  if (!product_id || product_id === "undefined") {
    return (
      <p className="mt-10 text-center text-sm text-gray-500">
        Invalid product ID.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (!productDetails) {
    return (
      <p className="mt-10 text-center text-sm text-gray-500">
        Product not found.
      </p>
    );
  }

  return (
    <section className="flex h-full flex-col gap-4 sm:flex-row">
      {/* LEFT — Carousel */}
      <div className="w-full md:w-1/2">
        <CartCarosul images={productDetails.images} />
      </div>

      {/* RIGHT — Product Info */}
      <div className="flex w-full flex-col gap-3 md:w-1/2">
        {/* Tags + Stock */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {productDetails?.tags?.length > 0 &&
              productDetails.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="accent"
                  className="rounded-md px-2 py-0.5 text-xs"
                >
                  {tag}
                </Badge>
              ))}
          </div>
          <span
            className={cn(
              "text-xs font-medium",
              productDetails.stockStatus === "out-of-stock"
                ? "text-red-500"
                : "text-primary-600",
            )}
          >
            {productDetails.stockStatus === "out-of-stock"
              ? "Out of Stock"
              : "In Stock"}
          </span>
        </div>

        {/* Title + Description */}
        <div>
          <h2 className="text-base leading-tight font-semibold text-gray-900">
            {productDetails.title}
          </h2>
          <p className="mt-1 line-clamp-2 text-xs text-gray-500">
            {productDetails.description}
          </p>
        </div>

        {/* Rating */}
        <Rating rating={productDetails.rating} readOnly />

        {/* Price */}
        <div className="flex items-center gap-2">
          {productDetails.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${productDetails.oldPrice}
            </span>
          )}
          <span className="text-primary-600 text-sm font-semibold">
            ${productDetails.price}
            <span className="text-xs font-normal text-gray-400">
              /{productDetails.unit}
            </span>
          </span>
        </div>

        {/* Packing Instructions */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Packing instruction
          </label>
          <textarea
            rows={2}
            value={packingInstructions}
            onChange={(e) => setPackingInstructions(e.target.value)}
            placeholder="Give us special instructions..."
            className="focus:ring-primary w-full resize-none rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-700 placeholder:text-gray-400 focus:ring-1 focus:outline-none"
          />
        </div>

        {/* Counter + Add to Cart */}
        <div className="mt-auto">
          <CardActionGuard className="w-full">
            <Counter
              value={quantity}
              onChange={(value) =>
                setQuantity(typeof value === "number" ? value : quantity)
              }
            />
            <Button
              disabled={
                cartLoading || productDetails.stockStatus === "out-of-stock"
              }
              onClick={() =>
                handleAddToCard(product_id ? Number(product_id) : undefined)
              }
              variant="secondary"
              className="h-9 flex-1 text-sm"
            >
              {cartLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner className="size-3.5" />
                  <span>Adding...</span>
                </div>
              ) : (
                "Add to Cart"
              )}
            </Button>
          </CardActionGuard>
        </div>
      </div>
    </section>
  );
}
