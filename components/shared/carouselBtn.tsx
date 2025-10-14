"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { useCarousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CarouselBtn({ className }: { className?: string }) {
  const { canScrollPrev, scrollPrev, canScrollNext, scrollNext } =
    useCarousel();

  return (
    <section className={cn("space-x-10", className)}>
      <Button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="text-primary border-primary size-8 rounded-full border bg-transparent hover:text-white md:size-12"
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="text-primary border-primary size-8 rounded-full border bg-transparent hover:text-white md:size-12"
      >
        <ArrowRight />
      </Button>
    </section>
  );
}
