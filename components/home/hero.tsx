import Image from "next/image";
import { RippleButton } from "../animate-ui/components/buttons/ripple";
import Search from "./search";

export default function Hero() {
  return (
    <>
      <section className="flex h-[78vh] w-full items-center bg-[url('/images/BGHome.png')] bg-cover bg-center pb-16">
        <div className="section-container flex w-full flex-col items-center md:flex-row md:justify-between">
          <div className="text-white">
            <h1 className="text-3xl font-bold md:text-6xl">
              From our store <br /> to your door
            </h1>
            <p className="mt-5 text-xs md:w-[70%] md:text-base">
              Get organic produce and sustainably sourced groceries delivery at
              up to 4% off grocery.
            </p>

            <RippleButton variant="secondary" className="mt-10 px-8 py-6">
              Shop Now
            </RippleButton>
          </div>

          <div>
            <Image
              alt="hero-image"
              src="/images/hero-image.png"
              width={500}
              height={500}
              className="w-full lg:w-[27.5rem]"
            />
          </div>
        </div>
      </section>
      <div className="-mt-56">
        <Search />
      </div>
    </>
  );
}
