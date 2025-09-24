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
import CarouselBtn from "./carouselBtn";

type ThumbnailCarouselProps = {
  images: string[];
  className?: string;
  thumbClassName?: string;
};

export function ThumbnailCarousel({
  images,
  className,
  thumbClassName,
}: ThumbnailCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [thumbApi, setThumbApi] = React.useState<CarouselApi | null>(null);
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const syncSelected = () => setSelected(api.selectedScrollSnap());
    syncSelected();
    api.on("select", syncSelected);
    return () => {
      api.off("select", syncSelected);
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
    <div className={cn("space-y-4", className)}>
      <Carousel
        setApi={setApi}
        opts={{ loop: false }}
        className="relative overflow-hidden rounded-lg"
      >
        <CarouselContent className="ml-0">
          {images.map((image, index) => (
            <CarouselItem key={`${image}-${index}`} className="pl-0">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  fill
                  src={image}
                  alt="product image"
                  className="object-cover"
                  sizes="(min-width: 1024px) 640px, 100vw"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselBtn className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-between px-4" />
      </Carousel>

      <Carousel
        setApi={setThumbApi}
        opts={{ dragFree: true, containScroll: "trimSnaps" }}
        className="w-full"
      >
        <CarouselContent className="ml-0 cursor-grab items-center gap-4 pb-1 active:cursor-grabbing">
          {images.map((image, index) => {
            const isActive = index === selected;
            return (
              <CarouselItem
                key={index}
                className="basis-1/2 pl-0 md:basis-1/5 lg:basis-1/3"
              >
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
                    "relative h-16 w-full overflow-hidden rounded-md border transition",
                    isActive
                      ? "border-primary"
                      : "hover:border-input border-transparent",
                    thumbClassName,
                  )}
                >
                  <Image
                    fill
                    src={image}
                    alt="product image thumbnail"
                    className="object-cover"
                    sizes="(min-width: 1024px) 120px, (min-width: 768px) 96px, 40vw"
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
