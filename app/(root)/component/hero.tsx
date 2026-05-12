import Image from "next/image";
import Search from "./search";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <>
      <section className="flex h-full w-full items-center bg-[url('/images/BGHome.png')] bg-cover bg-center pb-36 md:h-[60vh] md:pb-16 lg:h-[80vh]">
        <div className="section-container flex w-full flex-col-reverse items-center gap-6 md:flex-row md:justify-between md:gap-4">
          <div className="text-white md:w-1/2 lg:w-[55%]">
            <Badge variant={"accent"}>100% HMA Halal product</Badge>
            <h1 className="mt-3 text-[22px] leading-tight font-bold sm:text-[28px] lg:text-[32px] xl:text-[45px]">
              Fresh Halal Groceries Delivered Across Durham Region & Scarborough
            </h1>
            <p className="mt-3 text-xs leading-relaxed opacity-90 sm:text-sm lg:mt-4 lg:text-base">
              Shop South Asian, Middle Eastern, halal meat, frozen foods, pantry
              items, snacks, beverages, produce and everyday grocery essentials.{" "}
              <span className="font-semibold">
                Order before 3 PM for next business day delivery.
              </span>{" "}
              Free delivery over $150.
            </p>

            <Link href="/all-category">
              <RippleButton
                variant="secondary"
                className="mt-6 md:px-8 md:py-6 lg:mt-8"
              >
                Shop Now
              </RippleButton>
            </Link>
          </div>

          <div className="flex shrink-0 justify-center md:w-1/2 lg:w-[45%]">
            <Image
              alt="hero-image"
              src="/images/hero-image.png"
              width={500}
              height={500}
              className="w-56 sm:w-72 md:w-80 lg:w-96 xl:w-[420px]"
            />
          </div>
        </div>
      </section>
      <div className="-mt-52">
        <Search />
      </div>
    </>
  );
}