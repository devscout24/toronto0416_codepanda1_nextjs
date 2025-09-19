import ProductCard from "../card";
import CarouselBtn from "../home/components/carouselBtn";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { productData } from "@/consts/product";

export default function RecentlyViewed() {
  return (
    <section>
      <Carousel className="space-y-7">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
            Recently Viewed
          </h1>
          <CarouselBtn className="space-x-4" />
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
        </CarouselContent>
      </Carousel>
    </section>
  );
}
