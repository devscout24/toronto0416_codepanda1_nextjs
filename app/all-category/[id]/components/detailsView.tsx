"use client";

import { checkIsAddress } from "@/components/action";
import { Button } from "@/components/animate-ui/components/buttons/button";
import Rating from "@/components/shared/Rating";
import { ThumbnailCarousel } from "@/components/shared/ThumbnailsCarousel";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product.type";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DetailsView({ payload }: { payload: TProduct }) {
  const [isAddress, setIsAddress] = useState<boolean>(true);
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(false);

  console.log("Product Details Payload:", payload);
  useEffect(() => {
    const checkAddress = async () => {
      setIsLoadingAddress(true);
      try {
        const res = await checkIsAddress();
        setIsAddress(res === "yes");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingAddress(false);
      }
    };
    checkAddress();
  }, []);

  return (
    <section className="flex flex-col-reverse items-center justify-between gap-10 lg:flex-row">
      <div className="w-full lg:w-1/2">
        <ThumbnailCarousel images={payload.images} />
      </div>
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
            <div className="flex items-center gap-0.5 overflow-hidden sm:gap-2.5">
              {Number(payload?.price) > 0 ? (
                <>
                  {payload?.old_price && (
                    <del className="price-original text-xs text-neutral-400 line-through">
                      ${payload?.old_price}
                    </del>
                  )}
                  <p className="price-sale text-primary-600 text-xs font-medium sm:text-sm">
                    ${payload?.price}/{payload?.unit}
                  </p>
                </>
              ) : (
                payload?.old_price && (
                  <p className="text-xs font-medium text-neutral-800 sm:text-sm">
                    ${payload?.old_price}/{payload?.unit}
                  </p>
                )
              )}
            </div>
          </div>

          <Link
            scroll={false}
            className="w-full"
            href={
              isAddress
                ? `?cart-modal=cart&product_id=${payload?.id}`
                : `?shipping-address=shipping-modal&product_id=${payload?.id}`
            }
          >
            <Button
              disabled={isLoadingAddress}
              variant="secondary"
              className="h-8 w-full text-xs sm:h-9 sm:text-sm"
            >
              Add to Cart {isLoadingAddress && <Spinner />}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}