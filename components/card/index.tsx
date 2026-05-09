"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import LikeButton from "./components/LikeButton";
import Rating from "../shared/Rating";
import { TProduct } from "@/types/product.type";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CardActionGuard from "./components/CardActionGuard";
import { Button } from "../animate-ui/components/buttons/button";
import defaultImage from "@/assets/images/default.png";
import { useEffect, useState } from "react";
import { checkIsAddress } from "../action";
import { Spinner } from "../ui/spinner";

export function SkeletonProductCard() {
  return (
    <section>
      <Card className="flex h-[380px] w-full flex-col overflow-hidden p-0 sm:h-[447px]">
        <CardHeader className="relative p-0">
          <Skeleton className="h-[160px] w-full rounded-none sm:h-[215px]" />
          <div className="absolute top-4 flex w-full items-center justify-between px-4">
            <Skeleton className="h-5 w-16 rounded-md sm:h-6 sm:w-24" />
            <Skeleton className="h-7 w-7 rounded-full sm:h-8 sm:w-8" />
          </div>
        </CardHeader>

        <CardContent className="mt-1.5 px-2 sm:px-4">
          <div className="flex gap-1 sm:gap-2">
            <Skeleton className="h-5 w-10 rounded-md sm:h-6 sm:w-14" />
            <Skeleton className="h-5 w-12 rounded-md sm:h-6 sm:w-16" />
          </div>
          <div className="mt-2 space-y-1.5 sm:space-y-2">
            <Skeleton className="h-4 w-3/4 sm:h-5" />
            <Skeleton className="h-3 w-5/6 sm:h-4" />
          </div>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded-lg sm:h-5 sm:w-5" />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between sm:mt-6">
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <Skeleton className="h-6 w-9 sm:h-7 sm:w-11" />
              <Skeleton className="h-6 w-9 sm:h-7 sm:w-11" />
            </div>
            <Skeleton className="h-6 w-20 sm:h-7 sm:w-28" />
          </div>
        </CardContent>

        <CardFooter className="mt-auto mb-3 px-2 sm:mb-4 sm:px-4">
          <Skeleton className="h-8 w-full rounded-md sm:h-9" />
        </CardFooter>
      </Card>
    </section>
  );
}

export default function ProductCard({
  payload,
}: {
  payload?: TProduct;
  priority?: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const [isAddress, setIsAddress] = useState<boolean>(true);
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(false);
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
    <section className="w-full select-none">
      <Card className="group flex h-fit min-h-85 w-full flex-col overflow-hidden p-0 sm:min-h-107">
        <Link href={`/all-category/${payload?.id}`}>
          <CardHeader className="relative z-30 p-0">
            <div className="overflow-hidden">
              <Image
                width={287}
                height={428}
                src={
                  imageError || !payload?.images || payload?.images.length === 0
                    ? defaultImage
                    : payload?.images[0]
                }
                alt={payload?.title || "Product Image"}
                className="h-40 w-full object-cover duration-700 group-hover:scale-125 sm:h-62"
                onError={() => setImageError(true)}
              />
            </div>
            <div className="absolute top-3 flex w-full items-center justify-between px-2 capitalize sm:top-4 sm:px-4">
              <div>
                {payload?.badge && (
                  <Badge className="text-[10px] sm:text-xs">
                    {payload.badge}
                  </Badge>
                )}
              </div>
              <CardActionGuard className="justify-end">
                <LikeButton payload={payload} />
              </CardActionGuard>
            </div>
          </CardHeader>

          <CardContent className="mt-1.5 px-2 sm:px-4">
            <div className="line-clamp-1 h-5">
              {payload?.tags && payload?.tags?.length > 0 && (
                <div className="flex gap-1 sm:gap-2">
                  {payload?.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="accent"
                      className="rounded-md text-[10px] sm:text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="my-1.5 sm:my-2.5">
              <h2 className="line-clamp-1 text-sm font-semibold sm:text-lg">
                {payload?.title}
              </h2>
              <p className="line-clamp-1 text-xs sm:text-sm">
                {payload?.description}
              </p>
            </div>

            <div className="mb-3 sm:mb-5">
              <Rating rating={payload?.rating} readOnly />
            </div>

            <div className="mb-2 flex items-center justify-between sm:mb-2.5">
              <div className="flex items-center gap-0.5 overflow-hidden sm:gap-2.5">
                {payload?.oldPrice && (
                  <p className="text-xs text-neutral-300 line-through">
                    ${payload?.oldPrice}
                  </p>
                )}
                <p className="text-primary-600 text-xs font-medium sm:text-sm">
                  ${payload?.price}/{payload?.unit}
                </p>
              </div>
              <div
                className={cn(
                  "text-[10px] sm:text-sm",
                  payload?.stockStatus === "out-of-stock"
                    ? "text-red-600"
                    : "text-primary-700",
                )}
              >
                {payload?.stockStatus === "out-of-stock"
                  ? "Out of Stock"
                  : "In Stock"}
              </div>
            </div>
          </CardContent>
        </Link>

        <CardFooter className="mt-auto mb-3 px-2 sm:mb-4 sm:px-4">
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
        </CardFooter>
      </Card>
    </section>
  );
}