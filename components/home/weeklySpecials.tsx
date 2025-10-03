import Link from "next/link";
import ProductCard from "../card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import CarouselBtn from "../shared/carouselBtn";
import { productData } from "@/consts/product";
import { Button } from "../animate-ui/components/buttons/button";

export default function WeeklySpecials() {
  return (
    <section className="section-container">
      <div className="flex items-center justify-between">
        <h2></h2>
      </div>

      <Carousel className="space-y-7">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold md:text-3xl">Weekly Specials</h1>

          <Link href="/all-category">
            <Button variant="link">Browse All</Button>
          </Link>
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

          <CarouselItem className="group relative z-50 -ml-48 basis-1/6 overflow-hidden rounded-r-xl p-0"></CarouselItem>
        </CarouselContent>

        <CarouselBtn className="mx-auto w-fit space-x-2" />
      </Carousel>
    </section>
  );
}
