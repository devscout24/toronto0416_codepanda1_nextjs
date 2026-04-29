"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { Counter } from "../animate-ui/components/animate/counter";
import LikeButton from "./components/LikeButton";
import Rating from "../shared/Rating";
import { TProduct } from "@/types/product.type";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CardActionGuard from "./components/CardActionGuard";
import { Button } from "../animate-ui/components/buttons/button";
import defaultImage from "@/assets/images/default.png";
import { useEffect, useState } from "react";
import { addToCart } from "@/app/all-category/components/action";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { checkIsAddress } from "../action";

export function SkeletonProductCard() {
  return (
    <section>
      <Card className="flex h-[447px] w-full flex-col overflow-hidden p-0">
        <CardHeader className="relative p-0">
          {/* Image placeholder */}
          <Skeleton className="h-[215px] w-full rounded-none" />

          {/* Top overlay: badge + like */}
          <div className="absolute top-4 flex w-full items-center justify-between px-4">
            <Skeleton className="h-6 w-24 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </CardHeader>

        <CardContent className="mt-1.5">
          {/* Tags */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-14 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-12 rounded-md" />
          </div>

          {/* Title + description */}
          <div className="mt-2.5 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Rating row */}
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 rounded-lg" />
            ))}
          </div>

          {/* Price */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-7 w-11" />
              <Skeleton className="h-7 w-11" />
            </div>
            <div>
              <Skeleton className="h-7 w-28" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="mt-auto mb-4 flex items-center justify-between">
          {/* Counter placeholder */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>

          {/* Button placeholder */}
          <Skeleton className="h-9 w-36 rounded-md" />
        </CardFooter>
      </Card>
    </section>
  );
}

export default function ProductCard({
  payload,
  // priority = false,
}: {
  payload?: TProduct;
  priority?: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIsAddress = async () => {
      setLoading(true);
      try {
        const res = await checkIsAddress();
        setIsAddress(res === "yes");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIsAddress();
  }, []);

  // Function to handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <section className="w-full select-none">
      <Link href={`/all-category/${payload?.id}`}>
        <Card className="group flex h-fit min-h-107 w-full cursor-pointer flex-col overflow-hidden p-0">
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
                className="h-62 w-full object-cover duration-700 group-hover:scale-125"
                onError={handleImageError}
              />
            </div>
            <div className="absolute top-4 flex w-full items-center justify-between px-4 capitalize">
              <div>{payload?.badge && <Badge>{payload.badge}</Badge>}</div>
              <CardActionGuard className="justify-end">
                <LikeButton payload={payload} />
              </CardActionGuard>
            </div>
          </CardHeader>

          <CardContent className="mt-1.5">
            <div className="line-clamp-1 h-5">
              {payload?.tags && payload?.tags?.length > 0 && (
                <div className="flex gap-2">
                  {payload?.tags.map((tag) => (
                    <Badge key={tag} variant="accent" className="rounded-md">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="my-2.5">
              <h2 className="line-clamp-1 text-lg font-semibold">
                {payload?.title}
              </h2>
              <p className="line-clamp-1">{payload?.description}</p>
            </div>

            <div className="mb-5">
              <Rating rating={payload?.rating} readOnly />
            </div>

            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {payload?.oldPrice && (
                  <p className="text-sm text-neutral-300 line-through">
                    ${payload?.oldPrice}
                  </p>
                )}
                <p className="text-primary-600">
                  ${payload?.price}/{payload?.unit}
                </p>
              </div>
              <div
                className={cn(
                  "text-sm",
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

          <CardFooter className="mt-auto mb-4">
            <Link
              className="w-full"
              href={
                isAddress
                  ? `?cart-modal=cart&product_id=${payload?.id}`
                  : `?shipping-address=shipping-modal&product_id=${payload?.id}`
              }
            >
              <Button variant="secondary" className="w-full">
                Add to Cart
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </Link>
    </section>
  );
}
