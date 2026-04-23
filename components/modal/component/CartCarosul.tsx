"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import defaultImage from "@/assets/images/default.png";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type ThumbnailCarouselProps = {
  images: string[];
  className?: string;
  thumbClassName?: string;
};

export function CartCarosul({
  images,
  className,
  thumbClassName,
}: ThumbnailCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [thumbApi, setThumbApi] = React.useState<CarouselApi | null>(null);
  const [selected, setSelected] = React.useState(0);
  const [imageError, setImageError] = React.useState(false);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const handleImageError = () => setImageError(true);

  React.useEffect(() => {
    if (!api) return;

    const syncSelected = () => {
      setSelected(api.selectedScrollSnap());
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };

    syncSelected();
    api.on("select", syncSelected);
    api.on("reInit", syncSelected);

    return () => {
      api.off("select", syncSelected);
      api.off("reInit", syncSelected);
    };
  }, [api]);

  const handleThumbClick = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
  };

  React.useEffect(() => {
    if (!thumbApi) return;
    thumbApi.scrollTo(selected);
  }, [selected, thumbApi]);

  if (!images.length) return null;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Main Image */}
      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{ loop: false }}
          className="overflow-hidden rounded-xl bg-gray-50"
        >
          <CarouselContent className="ml-0">
            {images.map((image, index) => (
              <CarouselItem key={`${image}-${index}`} className="pl-0">
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    fill
                    src={
                      imageError || !image || image.length === 0
                        ? defaultImage
                        : image
                    }
                    alt="product image"
                    className="object-cover"
                    onError={handleImageError}
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Prev Button */}
        <Button
          onClick={() => api?.scrollPrev()}
          disabled={!canPrev}
          size="icon"
          className={cn(
            "absolute top-1/2 left-2 z-10 size-7 -translate-y-1/2 rounded-full",
            "border border-white/60 bg-white shadow-md",
            "hover:bg-primary text-gray-600 hover:text-white",
            "disabled:pointer-events-none disabled:opacity-30",
            "transition-all duration-200",
          )}
        >
          <ArrowLeft className="size-3.5" />
        </Button>

        {/* Next Button */}
        <Button
          onClick={() => api?.scrollNext()}
          disabled={!canNext}
          size="icon"
          className={cn(
            "absolute top-1/2 right-2 z-10 size-7 -translate-y-1/2 rounded-full",
            "bg-primary border border-white/60 shadow-md",
            "hover:bg-primary/90 text-white",
            "disabled:pointer-events-none disabled:opacity-30",
            "transition-all duration-200",
          )}
        >
          <ArrowRight className="size-3.5" />
        </Button>
      </div>

      {/* Thumbnails */}
      <Carousel
        setApi={setThumbApi}
        opts={{ dragFree: true, containScroll: "trimSnaps" }}
        className="w-full"
      >
        <CarouselContent className="ml-0 cursor-grab gap-2 active:cursor-grabbing">
          {images.map((image, index) => {
            const isActive = index === selected;
            return (
              <CarouselItem key={index} className="h-16 basis-1/3 pl-0">
                <button
                  type="button"
                  aria-label={`Show slide ${index + 1}`}
                  onClick={() => {
                    const clickAllowed = (
                      thumbApi as unknown as { clickAllowed?: () => boolean }
                    )?.clickAllowed;
                    if (clickAllowed && !clickAllowed()) return;
                    handleThumbClick(index);
                  }}
                  className={cn(
                    "relative h-full w-full overflow-hidden rounded-lg border-2 transition-all duration-200",
                    isActive
                      ? "border-primary shadow-sm"
                      : "border-transparent hover:border-gray-300",
                    thumbClassName,
                  )}
                >
                  <Image
                    fill
                    src={
                      imageError || !image || image.length === 0
                        ? defaultImage
                        : image
                    }
                    alt="product image thumbnail"
                    className="object-contain"
                    onError={handleImageError}
                  />
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
