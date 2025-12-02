import CarouselBtn from "@/components/shared/carouselBtn";
import Rating from "@/components/shared/Rating";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { getReview } from "./actions";
import { TTestimonial } from "@/types/testimonials.type";

export default async function Testimonials() {
 let testimonials: TTestimonial[] = [];

try {
  const response = await getReview();
  if (response) {
    testimonials = response; 
  }
} catch (error) {
  console.error("Error fetching testimonials:", error);
}

  return (
    <section className="section-container">
      <div className="rounded-2xl bg-white p-8 text-center md:p-14">
        <Carousel>
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="space-y-10">
                <div>
                  <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                    {testimonial.title}
                  </h1>
                  <p className="text-sm lg:text-base">{testimonial.subtitle}</p>
                </div>

                <div className="flex flex-col items-center gap-5">
                  <h2 className="font-semibold lg:text-xl">
                    {testimonial.name}
                  </h2>
                  <Rating rating={testimonial.rating} readOnly />
                  <p className="w-full text-sm md:w-1/2 lg:text-base">
                    {testimonial.feedback}
                  </p>
                </div>

                <div></div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselBtn />
        </Carousel>
      </div>
    </section>
  );
}
