import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import CarouselBtn from "@/components/shared/carouselBtn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "@/components/card";
import { getWeeklySpecial } from "./actions";
import { TProduct } from "@/types/product.type";
import { Sparkles } from "lucide-react";

function WeeklySpecialsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-6 py-16 text-center">
      {/* Animated icon cluster */}
      <div className="relative flex items-center justify-center">
        {/* Blurred glow behind */}
        <div className="absolute size-20 rounded-full bg-amber-100 blur-2xl" />

        {/* Skeleton product cards (decorative) */}
        <div className="relative flex -space-x-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-28 w-20 animate-pulse rounded-xl border border-white bg-gradient-to-b from-gray-100 to-gray-200 shadow-sm"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>

        {/* Sparkle badge */}
        <div className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full bg-amber-400 shadow-md">
          <Sparkles className="size-4 text-white" />
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-base font-semibold text-gray-800">
          No specials this week — yet
        </p>
        <p className="max-w-xs text-sm text-gray-500">
          Our weekly deals are being curated. Check back soon or browse all
          products in the meantime.
        </p>
      </div>

      <Link href="/all-category">
        <Button variant="outline" size="sm">
          Browse All Products
        </Button>
      </Link>
    </div>
  );
}

export default async function WeeklySpecials() {
  let productData: TProduct[] = [];

  try {
    const data = await getWeeklySpecial();
    productData = data ?? [];
  } catch (error) {
    console.error("Failed to fetch weekly special products:", error);
    productData = [];
  }

  return (
    <section id="weekly-specials" className="section-container">
      <div className="flex items-center justify-between">
        <h2></h2>
      </div>

      <Carousel className="space-y-7">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold md:text-3xl">Weekly Specials</h1>

          {productData.length > 0 && (
            <Link href="/all-category">
              <Button variant="link">Browse All</Button>
            </Link>
          )}
        </div>

        {productData.length === 0 ? (
          <WeeklySpecialsEmpty />
        ) : (
          <>
            <CarouselContent>
              {productData.map((product) => (
                <CarouselItem
                  key={product?.id}
                  className="md:basis-1/2 lg:basis-1/4"
                >
                  <ProductCard payload={product} />
                </CarouselItem>
              ))}

              <CarouselItem className="group relative z-50 -ml-48 basis-1/6 overflow-hidden rounded-r-xl p-0" />
            </CarouselContent>

            <CarouselBtn className="mx-auto w-fit space-x-2" />
          </>
        )}
      </Carousel>
    </section>
  );
}