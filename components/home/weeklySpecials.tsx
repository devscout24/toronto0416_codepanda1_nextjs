import Link from "next/link";
import { RippleButton } from "../animate-ui/components/buttons/ripple";
import ProductCard from "../card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import CarouselBtn from "./components/carouselBtn";
import { productData } from "@/consts/product";
import { ArrowRight } from "lucide-react";

export default function WeeklySpecials() {
  return (
    <section className="section-container">
      <div className="flex items-center justify-between">
        <h2></h2>
      </div>

      <Carousel className="space-y-7">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold md:text-3xl">Weekly Specials</h1>
          <CarouselBtn className="space-x-2" />
          {/* <RippleButton variant="link">Browse All</RippleButton> */}
        </div>
        <CarouselContent>
          {productData.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/4"
            >
              <ProductCard payload={product} />
            </CarouselItem>
          ))}

          <CarouselItem className="ml-4 w-1/6 basis-1/6 p-0 hover:scale-100">
            <Link href="/all-category">
              <RippleButton className="h-full w-full rounded-xl">
                Browse All
                <ArrowRight />
              </RippleButton>
            </Link>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
}
