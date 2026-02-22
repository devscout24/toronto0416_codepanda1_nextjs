"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerHeader,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import React, { useEffect, useState } from "react";
import ShippingIcon from "@/assets/icons/free-shipping.svg";
import LeftIcon from "@/assets/icons/chevron-down.svg";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { getDeliveryOptions, setDefaultOptions } from "./action";
import { TDeliveryOption } from "@/types/cart.type";
import { toast } from "sonner";

export default function DeliveryOptionPage({
  setBtnClose,
  fetchDefaultDeliveryOption,
  defaultDeliveryOptionId,
}: {
  setBtnClose: (value: boolean) => void;
  fetchDefaultDeliveryOption: () => void;
  defaultDeliveryOptionId?: number;
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(
    defaultDeliveryOptionId || null,
  );

  const [deliveryOptions, setDeliveryOptions] = useState<TDeliveryOption[]>([]);

  useEffect(() => {
    async function fetchDeliveryOptions() {
      try {
        const response = await getDeliveryOptions();
        setDeliveryOptions(response || []);
      } catch (error) {
        console.error("Error fetching address book:", error);
      }
    }

    fetchDeliveryOptions();
  }, []);
  const handleSelect = (option: number) => {
    setSelectedOption(option);
  };

  const handleSave = async () => {
    if (selectedOption === null) return;
    try {
      const res = await setDefaultOptions(selectedOption);
      toast.success(res);
      fetchDefaultDeliveryOption();
      setBtnClose(false);
    } catch (error: unknown) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to set delivery option.",
      );
    }
  };

  return (
    <div className="p-1 md:p-3">
      <DrawerHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <DrawerClose className="mt-0.5">
            <LeftIcon className="rotate-90 hover:cursor-pointer" />
          </DrawerClose>
          <DrawerTitle className="text-lg font-medium">
            Delivery Option
          </DrawerTitle>
        </div>
        <DrawerDescription>
          Pick how you would like us to ship your items.
        </DrawerDescription>

        <div className="my-10 space-y-5">
          {deliveryOptions.length > 0 ? (
            deliveryOptions.map((option) => (
              <div
                key={option.id}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-100 p-3 md:gap-5 md:p-5"
                onClick={() => handleSelect(option.id)} // click anywhere on card
              >
                <Checkbox
                  className="size-5 rounded-full md:size-6"
                  checked={selectedOption === option.id}
                  onCheckedChange={() => handleSelect(option.id)}
                />
                <div className="flex items-center gap-5">
                  <ShippingIcon className="hidden md:block" />
                  <div>
                    <h3 className="text-base font-semibold md:text-lg">
                      {option.name}
                    </h3>
                    <p className="text-sm text-neutral-500 md:text-base">
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-neutral-500">
              No delivery options available...
            </p>
          )}
        </div>
      </DrawerHeader>

      <div className="grid grid-cols-2 gap-5 px-5">
        <DrawerClose className="rounded-lg border border-neutral-200 font-medium hover:cursor-pointer">
          Close
        </DrawerClose>
        <Button className="h-10" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
