import Image from "next/image";
import Search from "./search";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <>
      <section className="flex h-full w-full items-center bg-[url('/images/BGHome.png')] bg-cover bg-center pb-36 md:h-[60vh] md:pb-16 lg:h-[80vh]">
        <div className="section-container flex w-full flex-col-reverse items-center md:flex-row md:justify-between">
          <div className="text-white">
            <Badge variant={"accent"}>100% HMA Halal product</Badge>
            <h1 className="md:4xl mt-3 text-3xl font-bold lg:text-5xl">
              South Asian & Middle
              <br /> Eastern grocery focus
            </h1>
            <p className="mt-3 text-xs md:w-[70%] md:text-base lg:mt-5">
              Service coverage across Durham Region and Scarborough
            </p>

            <Link href="/all-category">
              <RippleButton
                variant="secondary"
                className="mt-6 md:px-8 md:py-6 lg:mt-10"
              >
                Shop Now
              </RippleButton>
            </Link>
          </div>

          <div>
            <Image
              alt="hero-image"
              src="/images/hero-image.png"
              width={500}
              height={500}
              className="w-64 md:w-96 lg:w-110"
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
