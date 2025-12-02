import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="section-container">
      <div className="overflow-hidden rounded-2xl bg-[url('/images/bg-image1.png')] bg-cover bg-center py-[3.7rem] text-center text-white">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Next-Day Delivery in Durham Region
        </h2>
        <p className="mt-2 text-sm md:text-base">
          Place your order by 8 PM for guaranteed delivery tomorrow
        </p>
        <Link href={"/all-category"}>
          <RippleButton
            variant="secondary"
            className="mx-auto mt-10 w-fit px-8 py-6"
          >
            Shop Now
          </RippleButton>
        </Link>
      </div>
    </section>
  );
}
