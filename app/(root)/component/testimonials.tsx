import CarouselBtn from "@/components/shared/carouselBtn";
import Rating from "@/components/shared/Rating";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getReview } from "./actions";
import { TTestimonial } from "@/types/testimonials.type";
import { MessageSquareQuote } from "lucide-react";

function TestimonialsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-6 py-16 text-center">
      {/* Decorative avatar placeholders */}
      <div className="relative flex items-center justify-center">
        {/* Blurred glow */}
        <div className="absolute size-20 rounded-full bg-blue-100 blur-2xl" />

        {/* Skeleton avatars */}
        <div className="relative flex -space-x-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex size-12 animate-pulse items-end justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-b from-gray-100 to-gray-200 shadow-sm"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Silhouette shape */}
              <div className="mb-0 h-7 w-7 rounded-full bg-gray-300/60" />
            </div>
          ))}
        </div>

        {/* Quote badge */}
        <div className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full bg-blue-400 shadow-md">
          <MessageSquareQuote className="size-4 text-white" />
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-base font-semibold text-gray-800">No reviews yet</p>
        <p className="max-w-xs text-sm text-gray-500">
          Customer testimonials will appear here once reviews start coming in.
        </p>
      </div>
    </div>
  );
}

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
        {testimonials.length === 0 ? (
          <TestimonialsEmpty />
        ) : (
          <Carousel>
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="space-y-10">
                  <div>
                    <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                      {testimonial.title}
                    </h1>
                  </div>

                  <div className="flex flex-col items-center gap-5">
                    <h2 className="font-semibold lg:text-xl">
                      {testimonial.reviewer_name}
                    </h2>
                    <Rating rating={testimonial.rating} readOnly />
                    <p className="w-full text-sm md:w-1/2 lg:text-base">
                      {testimonial.comment}
                    </p>
                  </div>

                  <div></div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselBtn />
          </Carousel>
        )}
      </div>
    </section>
  );
}