"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { ChevronRight } from "lucide-react";
import ShippingIcon from "@/assets/icons/free-shipping.svg";
import Link from "next/link";
import Modal from "@/components/modal/Modal";
import ShippingAddress from "../modals/shippingAddress";
import { useState } from "react";
import { TCartAddress } from "@/types/cart.type";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Shipping() {
  const [address, setAddress] = useState<TCartAddress | null>(null);

  console.log("address", address);

  return (
    <section>
      <div className="w-full rounded-2xl bg-white p-5">
        <h3 className="text-lg font-semibold">Shipping Address</h3>

        {address ? (
          <div className="rounded-lg border p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <p className="text-xl font-semibold">{address.name}</p>
                <Badge className="rounded-full bg-black">
                  {address.addressType === "home" ? "Home" : "Office"}
                </Badge>
              </div>

              <div className="flex items-center gap-5">
                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-500"
                >
                  Remove
                </Button>
                {/* <Separator orientation="vertical" /> */}
                <Button
                  variant="ghost"
                  className="text-secondary-500 hover:text-secondary-500"
                >
                  Edit Address
                </Button>
              </div>
            </div>
            <p>{address.phone}</p>

            <Separator className="my-2.5" />

            <p>
              {address.houseNo}, {address.floorNo}, {address.flatNo},{" "}
              {address.streetRoad}, {address.blockSector}, {address.area},{" "}
              {address.city}
            </p>
          </div>
        ) : (
          <></>
        )}

        <Link
          href="?shipping-address=shipping-modal"
          className="border-primary bg-primary-50 text-primary mt-5 flex h-24 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed text-lg font-semibold"
        >
          +Add Address
        </Link>

        <Modal
          title="Add new shipping address"
          modalId="shipping-address"
          openId="shipping-modal"
        >
          <ShippingAddress setAddress={setAddress} />
        </Modal>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Delivery option</h3>
          <Button variant="ghost" className="text-primary hover:text-primary">
            View options <ChevronRight />
          </Button>
        </div>

        <div className="mt-5 flex w-full items-center justify-between rounded-lg bg-white p-5">
          <div className="flex items-center gap-5">
            <ShippingIcon />
            <div>
              <h3 className="text-lg font-semibold">Standard delivery</h3>
              <p className="text-neutral-500">Guaranteed by 18-19 Aug</p>
            </div>
          </div>
          <p className="text-lg font-semibold">$20.00</p>
        </div>
      </div>
    </section>
  );
}
