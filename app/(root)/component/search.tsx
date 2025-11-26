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
      console.log("Please enter a postal code");
      setAvailability(null);
      return;
    }

    setLoading(true);
    try {
      const available = await isPostalCodeAvailable(postalCode);
      setAvailability(available);

      if (available) {
        console.log("Available");
      } else {
        console.log("Not available");
      }
      
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error checking postal code:", error);
      setAvailability(false);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <div className="relative flex h-16 items-center overflow-hidden rounded-lg bg-white">
              <LocationIcon className="absolute left-3 text-neutral-200" />
              <input
                type="text"
                placeholder="Enter your postal code"
                className="h-16 w-full pl-10 md:w-100 md:pl-12"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />

              <RippleButton
                variant="secondary"
                className="-mr-0.5 h-24 rounded-none md:w-24"
                onClick={handleCheckAvailability}
                disabled={loading}
              >
                {loading ? "Checking..." : "Find"}
              </RippleButton>
            </div>

            <p className="mt-2.5 text-sm text-white lg:text-base">
              We currently deliver to most areas in the city
            </p>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {availability ? "✅ Delivery Available" : "❌ Delivery Not Available"}
            </DialogTitle>
            <DialogDescription asChild> 
              {availability ? (
                <div className="space-y-3">
                  <p className="text-green-600 font-medium">
                    Great news! We deliver to postal code <strong>{postalCode}</strong>.
                  </p>
                  <p>
                   You can now place your order and we&apos;ll deliver it right to your doorstep!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-red-600 font-medium">
                    Sorry, we currently don&apos;t deliver to postal code <strong>{postalCode}</strong>.
                  </p>
                  <p>
                    We&apos;re constantly expanding our delivery areas. Please check back soon or contact us for more information.
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