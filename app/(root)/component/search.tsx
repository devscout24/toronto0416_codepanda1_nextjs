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

export default function Search() {
  const [postalCode, setPostalCode] = useState("");
  const [availability, setAvailability] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckAvailability = async () => {
    if (postalCode.trim() === "") {
      // console.log("Please enter a postal code");
      setAvailability(null);
      return;
    }

    setLoading(true);
    try {
      const available = await isPostalCodeAvailable(postalCode);
      setAvailability(available);

      if (available) {
        // console.log("Available");
      } else {
        // console.log("Not available");
      }

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
      <section className="section-container">
        <div className="bg-primary-500 flex flex-col items-center justify-between gap-3 rounded-2xl p-5 md:gap-8 md:p-10 lg:flex-row">
          <div className="text-white lg:w-1/2">
            <h2 className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">
              Check if we deliver to your area
            </h2>
            <p className="text-xs opacity-90 md:mt-1 lg:text-base">
              Enter your postal code to see if Sufi&apos;s delivery service is
              available in your location.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative flex h-11 items-center overflow-hidden rounded-lg bg-white md:h-14">
              <LocationIcon className="absolute left-3 shrink-0 text-neutral-200" />
              <input
                type="text"
                placeholder="Enter your postal code"
                className="h-full w-full pr-0 pl-10 text-sm focus:outline-none sm:pl-12 sm:text-base"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <RippleButton
                variant="secondary"
                className="h-full shrink-0 rounded-none px-4 text-sm sm:px-6 sm:text-base md:px-8"
                onClick={handleCheckAvailability}
                disabled={loading}
              >
                {loading ? "Checking..." : "Find"}
              </RippleButton>
            </div>

            <p className="mt-2 text-xs text-white opacity-80 sm:text-sm lg:text-base">
              We deliver to Ajax, Pickering, Whitby, Oshawa & Scarborough
            </p>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {availability
                ? "✅ Delivery Available"
                : "❌ Delivery Not Available"}
            </DialogTitle>
            <DialogDescription asChild>
              {availability ? (
                <div className="space-y-3">
                  <p className="font-medium text-green-600">
                    Great news! We deliver to your Area
                  </p>
                  <p>
                    You can now place your order and we&apos;ll deliver it right
                    to your doorstep!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="font-medium text-red-600">
                    Sorry, we currently don&apos;t deliver to your Area
                  </p>
                  <p>
                    We&apos;re constantly expanding our delivery areas. Please
                    check back soon or contact us for more information.
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