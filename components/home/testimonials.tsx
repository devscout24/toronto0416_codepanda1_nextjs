import { TTestimonial } from "@/types/testimonials.type";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Rating from "../shared/Rating";
import CarouselBtn from "./components/carouselBtn";

export default function Testimonials() {
  const testimonials: TTestimonial[] = [
    {
      id: 1,
      name: "John De",
      rating: 5,
      title: "Good news from far away",
      subtitle: "Let's see what people think of Logo",
      feedback:
        "As the importance of sustainability in fashion becomes better known, more and more companies are claiming to have created the ultimate clothing brand sustainability rating.",
    },
    {
      id: 2,
      name: "Sophia Lee",
      rating: 4,
      title: "Happy with the results",
      subtitle: "Trusted by many around the world",
      feedback:
        "The service exceeded my expectations. The process was smooth, and the team delivered everything on time. Highly recommended!",
    },
    {
      id: 3,
      name: "Michael Brown",
      rating: 5,
      title: "Amazing experience",
      subtitle: "Customer voices that matter",
      feedback:
        "I was impressed by the attention to detail and customer support. They really care about sustainability and transparency.",
    },
    {
      id: 4,
      name: "Emily Davis",
      rating: 4,
      title: "Better than expected",
      subtitle: "Stories from our clients",
      feedback:
        "The brand has been a wonderful partner. Their commitment to eco-friendly practices makes me feel confident in every purchase.",
    },
    {
      id: 5,
      name: "Carlos Martinez",
      rating: 5,
      title: "Trusted by thousands",
      subtitle: "See why people love Logo",
      feedback:
        "Fantastic work! The platform gave me exactly what I needed. Clear communication, strong values, and great results.",
    },
  ];

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
