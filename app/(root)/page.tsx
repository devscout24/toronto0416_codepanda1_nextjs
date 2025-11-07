import ShippingIcon from "@/assets/icons/free-shipping.svg";
import PaymentIcon from "@/assets/icons/secure-payment.svg";
import SupportIcon from "@/assets/icons/support.svg";
import Hero from "./component/hero";
import Categories from "./component/categories";
import WeeklySpecials from "./component/weeklySpecials";
import Banner from "./component/banner";
import BestSelling from "./component/bestSelling";
import Testimonials from "./component/testimonials";

export default function HomePage() {
  const benefits = [
    {
      icon: ShippingIcon,
      title: "Free Shipping",
      description: "On all orders over $109.00",
    },
    {
      icon: PaymentIcon,
      title: "100% Payment Secure",
      description: "Your payment are safe with us.",
    },
    {
      icon: SupportIcon,
      title: "Support 24/7",
      description: "Contact us 24 hours a day",
    },
  ];

  return (
    <section className="mb-28 space-y-28">
      <Hero />
      <Categories />
      <WeeklySpecials />
      <Banner />
      <BestSelling />
      <Testimonials />

      <section>
        {
          <div className="section-container flex flex-col items-start justify-between gap-10 md:flex-row">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-4 md:flex-col lg:flex-row"
              >
                <benefit.icon />
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold lg:text-base">
                    {benefit.title}
                  </h4>
                  <p className="mt-2 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        }
      </section>
    </section>
  );
}
