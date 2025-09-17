import LocationIcon from "@/assets/icons/location2.svg";
import { RippleButton } from "../animate-ui/components/buttons/ripple";

export default function Search() {
  return (
    <section className="section-container">
      <div className="bg-primary-500 flex flex-col items-center justify-between gap-8 rounded-2xl p-5 md:-mt-32 md:p-10 lg:flex-row">
        <div className="text-white md:w-1/2">
          <h2 className="text-xl md:text-2xl lg:text-3xl">
            Check if we deliver to your area
          </h2>
          <p className="text-sm lg:text-base">
            Enter your postal code to see if Sufi&apos;s delivery service is
            available in your location.
          </p>
        </div>

        <div>
          <div className="relative flex h-[4rem] items-center overflow-hidden rounded-lg bg-white">
            <LocationIcon className="absolute left-3 text-neutral-200" />
            <input
              type="text"
              placeholder="Enter your postal code"
              className="h-[4rem] w-full pl-10 md:w-[25rem] md:pl-12"
            />
            <RippleButton
              variant="secondary"
              className="-mr-0.5 h-[6rem] rounded-none md:w-[6rem]"
            >
              Find
            </RippleButton>
          </div>
          <p className="mt-2.5 text-sm text-white lg:text-base">
            We currently deliver to most areas in the city
          </p>
        </div>
      </div>
    </section>
  );
}
