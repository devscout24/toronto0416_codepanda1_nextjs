"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { ChevronRight } from "lucide-react";
import ShippingIcon from "@/assets/icons/free-shipping.svg";
import Link from "next/link";
import Modal from "@/components/modal/Modal";
import ShippingAddress from "../modals/shippingAddress";
import { Dispatch, SetStateAction, Suspense, useState } from "react";
import { TCartAddress } from "@/types/cart.type";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import DeliveryOptionPage from "./deliveryOption";
import AddressOptionPage from "./addressOption";

export default function Shipping({
  address,
  setAddress,
}: {
  address: TCartAddress | null;
  setAddress: Dispatch<SetStateAction<TCartAddress | null>>;
}) {
  const [deliveryOption, setDeliveryOption] = useState<string>("standard");
  const [btnClose, setBtnClose] = useState<boolean>(false);
  const [addressBtnOpen, setAddressBtnOpen] = useState<boolean>(false);

  // console.log("address", address);

  return (
    <section>
      <div className="w-full rounded-2xl bg-white p-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <Drawer
            open={addressBtnOpen}
            onOpenChange={setAddressBtnOpen}
            direction="right"
          >
            <DrawerTrigger>
              <Button
                variant="ghost"
                className="text-secondary-500 hover:text-secondary-500"
              >
                Select Address <ChevronRight />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="!max-w-[500px] bg-white">
              <AddressOptionPage
                setAddressBtnOpen={setAddressBtnOpen}
                setAddress={setAddress}
              />
            </DrawerContent>
          </Drawer>
        </div>

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
                  onClick={() => setAddress(null)}
                  variant="ghost"
                  className="text-red-500 hover:text-red-500"
                >
                  Remove
                </Button>
                {/* <Separator orientation="vertical" /> */}
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
          href="?shipping=shipping"
          className="border-primary bg-primary-50 text-primary mt-5 flex h-24 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed text-lg font-semibold"
        >
          +Add Address
        </Link>
        <Suspense fallback={null}>
          <Modal
            title="Add new shipping address"
            modalId="shipping"
            openId="shipping"
          >
            <ShippingAddress setAddress={setAddress} />
          </Modal>
        </Suspense>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Delivery option</h3>

          <Drawer open={btnClose} onOpenChange={setBtnClose} direction="right">
            <DrawerTrigger>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary"
              >
                View options <ChevronRight />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="!max-w-[500px] bg-white">
              <DeliveryOptionPage
                setBtnClose={setBtnClose}
                setDeliveryOption={setDeliveryOption}
              />
            </DrawerContent>
          </Drawer>
        </div>

        <div className="mt-5 flex w-full items-center justify-between rounded-lg bg-white p-5">
          <div className="flex items-center gap-5">
            <ShippingIcon />
            <div>
              <h3 className="text-lg font-semibold">
                {deliveryOption === "premium"
                  ? "Premium Delivery"
                  : "Standard Delivery"}
              </h3>
              <p className="text-neutral-500">Guaranteed by 18-19 Aug</p>
            </div>
          </div>
          <p className="text-lg font-semibold">
            {deliveryOption === "premium" ? "$30" : "$20"}
          </p>
        </div>
      </div>
    </section>
  );
}
