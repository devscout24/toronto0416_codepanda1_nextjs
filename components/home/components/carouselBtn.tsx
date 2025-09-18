"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { useCarousel } from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CarouselBtn() {
  const { canScrollPrev, scrollPrev, canScrollNext, scrollNext } =
    useCarousel();

  return (
    <section className="space-x-10">
      <Button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="text-primary border-primary size-12 rounded-full border bg-transparent hover:text-white"
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="text-primary border-primary size-12 rounded-full border bg-transparent hover:text-white"
      >
        <ArrowRight />
      </Button>
    </section>
  );
}
