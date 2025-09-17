import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import BestSelling from "@/components/home/bestSelling";
import Categories from "@/components/home/categories";
import Hero from "@/components/home/hero";
import Testimonials from "@/components/home/testimonials";
import WeeklySpecials from "@/components/home/weeklySpecials";

export default function Home() {
  return (
    <section className="mb-28 space-y-28">
      <Hero />
      <Categories />
      <WeeklySpecials />

      <div className="section-container">
        <div className="overflow-hidden rounded-2xl bg-[url('/images/bg-image1.png')] bg-cover bg-center py-[3.7rem] text-center text-white">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Next-Day Delivery in Durham Region
          </h2>
          <p className="mt-2 text-sm md:text-base">
            Place your order by 8 PM for guaranteed delivery tomorrow
          </p>
          <RippleButton
            variant="secondary"
            className="mx-auto mt-10 w-fit px-8 py-6"
          >
            Shop Now
          </RippleButton>
        </div>
      </div>

      <BestSelling />
      <Testimonials />

      {/* <div className="section-container my-4">
        <Link href={"?modal=test-modal"}>
          <RippleButton>Ripple Button</RippleButton>
        </Link>

        <Link href={"?modal2=test-modal2"}>
          <RippleButton variant="secondary">Ripple Button</RippleButton>
        </Link>
      </div> */}
    </section>
  );
}
