"use client";

import { useState } from "react";
import LocationIcon from "@/assets/icons/location2.svg";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { isPostalCodeAvailable } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";
import { LocateIcon, Map, MapPin, MapPlus } from "lucide-react";

export default function Search() {
  const [postalCode, setPostalCode] = useState("");
  const [availability, setAvailability] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckAvailability = async () => {
    if (postalCode.trim() === "") {
      setAvailability(null);
      return;
    }

    setLoading(true);
    try {
      const available = await isPostalCodeAvailable(postalCode);
      setAvailability(available);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error checking postal code:", error);
      setAvailability(false);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
      setPostalCode("");
    }
  };

  return (
    <>
      <section className="section-container px-4 sm:px-6">
        <div className="bg-primary-500 flex flex-col gap-4 rounded-2xl p-4 sm:p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-10">
          {/* Text block */}
          <div className="text-white lg:w-1/2">
            <h2 className="text-sm leading-snug font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              Check if we deliver to your area
            </h2>
            <p className="mt-0.5 text-xs leading-relaxed opacity-85 sm:mt-1 lg:text-base">
              Enter your postal code to see if Sufi&apos;s delivery service is
              available in your location.
            </p>
          </div>

          {/* Input + chips block */}
          <div className="w-full lg:w-1/2">
            {/* Search bar */}
            <div className="relative flex h-10 items-center overflow-hidden rounded-xl bg-white shadow-sm sm:h-13 md:h-14">
              {/* <LocationIcon className="absolute left-2.5 shrink-0 text-neutral-300 sm:left-4" /> */}
              <MapPin className="absolute left-2 size-4 shrink-0 text-neutral-300 sm:left-4 md:size-6" />
              <input
                type="text"
                placeholder="Enter your postal code"
                className="h-full w-full pr-0 pl-8 text-xs focus:outline-none sm:pl-11 sm:text-base"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleCheckAvailability()
                }
              />
              <RippleButton
                variant="secondary"
                className="h-full shrink-0 rounded-none rounded-r-xl px-3 text-xs font-semibold sm:px-6 sm:text-base md:px-8"
                onClick={handleCheckAvailability}
                disabled={loading}
              >
                {loading ? "Checking..." : "Find"}
              </RippleButton>
            </div>

            {/* Delivery area chips */}
            <div className="mt-2 flex flex-wrap gap-1 sm:mt-3 sm:gap-2">
              {["Ajax", "Pickering", "Whitby", "Oshawa", "Scarborough"].map(
                (area) => (
                  <span
                    key={area}
                    className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm sm:px-3 sm:py-1 sm:text-sm"
                  >
                    {area}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="mx-4 max-w-sm rounded-2xl sm:mx-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">
              {availability
                ? "✅ Delivery Available"
                : "❌ Delivery Not Available"}
            </DialogTitle>
            <DialogDescription asChild>
              {availability ? (
                <div className="space-y-2 pt-1">
                  <p className="text-sm font-medium text-green-600 sm:text-base">
                    Great news! We deliver to your area.
                  </p>
                  <p className="text-sm text-neutral-600">
                    You can now place your order and we&apos;ll deliver it right
                    to your doorstep!
                  </p>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  <p className="text-sm font-medium text-red-600 sm:text-base">
                    Sorry, we don&apos;t deliver to your area yet.
                  </p>
                  <p className="text-sm text-neutral-600">
                    We&apos;re constantly expanding. Please check back soon or
                    contact us for more information.
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}