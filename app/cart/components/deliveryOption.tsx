import { Button } from "@/components/ui/button";
import {
  DrawerHeader,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import React, { useState } from "react";
import ShippingIcon from "@/assets/icons/free-shipping.svg";
import LeftIcon from "@/assets/icons/chevron-down.svg";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";

export default function DeliveryOptionPage({
  setDeliveryOption,
  setBtnClose,
}: {
  setDeliveryOption: (option: string) => void;
  setBtnClose: (value: boolean) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSave = () => {
    setDeliveryOption(selectedOption || "standard");
    setBtnClose(false);
  };

  return (
    <div className="p-3">
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
          {/* Standard delivery */}
          <div
            className="flex cursor-pointer items-center gap-5 rounded-xl border border-neutral-100 p-5"
            onClick={() => handleSelect("standard")} // click anywhere on card
          >
            <Checkbox
              className="size-6 rounded-full"
              checked={selectedOption === "standard"}
              onCheckedChange={() => handleSelect("standard")}
            />
            <div className="flex items-center gap-5">
              <ShippingIcon className="hidden md:block" />
              <div>
                <h3 className="text-lg font-semibold">Standard delivery</h3>
                <p className="text-neutral-500">Guaranteed by 18-19 Aug</p>
              </div>
            </div>
          </div>

          {/* Premium delivery */}
          <div
            className="flex cursor-pointer items-center gap-5 rounded-xl border border-neutral-100 p-5"
            onClick={() => handleSelect("premium")} // click anywhere on card
          >
            <Checkbox
              className="size-6 rounded-full"
              checked={selectedOption === "premium"}
              onCheckedChange={() => handleSelect("premium")}
            />
            <div className="flex items-center gap-5">
              <ShippingIcon className="hidden md:block" />
              <div>
                <h3 className="text-lg font-semibold">Premium delivery</h3>
                <p className="text-neutral-500">Guaranteed by 18-19 Aug</p>
              </div>
            </div>
          </div>
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
