import { TProduct } from "@/types/product.type";
import ProductCard from "../card";
import CarouselBtn from "../shared/carouselBtn";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { getRecentlyViews } from "./actions";

export default async function RecentlyViewed({
  title = "Recently Viewed",
}: {
  title?: string;
}) {
  let productData: TProduct[] = [];

  try {
    const data = await getRecentlyViews();
    productData = data ?? [];
  } catch (error) {
    console.error("Failed to fetch weekly special products:", error);
    productData = [];
  }

  if (productData?.length === 0) return null;

  return (
    <section>
      <Carousel className="space-y-7">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">{title}</h1>
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