"use client";

import { Counter } from "@/components/animate-ui/components/animate/counter";
import { Button } from "@/components/animate-ui/components/buttons/button";
import Rating from "@/components/shared/Rating";
import { ThumbnailCarousel } from "@/components/shared/ThumbnailsCarousel";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product.type";
import { useState } from "react";
import { addToCart } from "../../components/action";
import { toast } from "sonner";

export default function DetailsView({ payload }: { payload: TProduct }) {
  const [count, setCount] = useState(1);
  const [cartLoading, setCartLoading] = useState<boolean>(false);

  const handleAddToCard = async (product_id: number | undefined) => {
    setCartLoading(true);
    if (!product_id) {
      console.error("Error: Product ID is required.");
      return;
    }

    try {
      const res = await addToCart(product_id, count);
      toast.success(res?.message || "Product added to cart successfully!");
      setCartLoading(false);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <section className="flex flex-col-reverse items-center justify-between gap-10 lg:flex-row">
      <div className="flex w-full flex-col rounded-2xl bg-white p-5 md:p-10 lg:h-140 lg:w-1/2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              {payload?.tags.length > 0 && (
                <div className="flex gap-2">
                  {payload.tags.map((tag) => (
                    <Badge key={tag} variant="accent" className="rounded-md">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div
              className={cn(
                payload.stockStatus === "out-of-stock"
                  ? "text-red-600"
                  : "text-primary-700",
              )}
            >
              {payload.stockStatus === "out-of-stock"
                ? "Out of Stock"
                : "In Stock"}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold">{payload.title}</h2>
            <p className="line-clamp-5">{payload.description}</p>
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <div>
            <Rating rating={payload.rating} readOnly />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {payload.oldPrice && (
                <p className="text-neutral-300 line-through">
                  ${payload.oldPrice}
                </p>
              )}

              <p className="text-primary-600 text-lg">
                ${payload.price}/{payload.unit}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              disabled={cartLoading}
              onClick={() => handleAddToCard(payload?.id)}
              variant="secondary"
              className="flex-1"
            >
              {cartLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner className="size-4" />
                  <span>Adding...</span>
                </div>
              ) : (
                "Add to Cart"
              )}
            </Button>
            <Counter
              value={count}
              onChange={(value) =>
                setCount(typeof value === "number" ? value : count)
              }
            />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <ThumbnailCarousel images={payload.images} />
      </div>
    </section>
  );
}