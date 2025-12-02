"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { ChevronRight } from "lucide-react";
import ShippingIcon from "@/assets/icons/free-shipping.svg";
import Link from "next/link";
import Modal from "@/components/modal/Modal";
import ShippingAddress from "../modals/shippingAddress";
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import { TCartAddress } from "@/types/cart.type";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import DeliveryOptionPage from "./deliveryOption";
import AddressOptionPage from "./addressOption";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TAddressBook } from "@/types/user.type";
import { getAddressBook } from "@/app/account/components/action";

export default function Shipping() {
  //   {
  //   address,
  //   setAddress,
  // }: {
  //   address: TCartAddress | null;
  //   setAddress: Dispatch<SetStateAction<TCartAddress | null>>;
  // }
  const [deliveryOption, setDeliveryOption] = useState<string>("standard");
  const [btnClose, setBtnClose] = useState<boolean>(false);
  const [addressBtnOpen, setAddressBtnOpen] = useState<boolean>(false);
  const [addressBook, setAddressBook] = useState<TAddressBook[]>([]);
  const [address, setAddress] = useState<TCartAddress | null>(null); // Added this since you're using it

  useEffect(() => {
    async function fetchAddressBook() {
      try {
        const response = await getAddressBook();

        // ✅ getAddressBook already returns the array
        if (Array.isArray(response)) {
          setAddressBook(response);
        } else {
          console.error("Invalid address book response:", response);
        }
      } catch (error) {
        console.error("Error fetching address book:", error);
      }
    }

    fetchAddressBook();
  }, []);

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
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                className="text-secondary-500 hover:text-secondary-500"
              >
                Select Address <ChevronRight />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-[500px]! bg-white">
              <ScrollArea className="h-full">
                <AddressOptionPage
                  addressBook={addressBook}
                  setAddressBtnOpen={setAddressBtnOpen}
                />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>

        {addressBook?.length > 0 ? (
          addressBook
            .filter((address) => address?.is_default === true)
            .map((address) => (
              <div key={address?.id} className="rounded-lg border p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <p className="text-xl font-semibold">{address.name}</p>
                    <Badge className="rounded-full bg-black">
                      {address.address_type === "home" ? "Home" : "Office"}
                    </Badge>
                  </div>

                  {/* <div className="flex items-center gap-5">
                    <Button
                      onClick={() => setAddress(null)}
                      variant="ghost"
                      className="text-red-500 hover:text-red-500"
                    >
                      Remove
                    </Button>
                  </div> */}
                </div>
                <p>{address.phone}</p>

                <Separator className="my-2.5" />

                <p>
                  {address?.flat_no ? `Flat ${address.flat_no}, ` : ""}
                  {address?.floor_no ? `Floor ${address.floor_no}, ` : ""}
                  {address?.house_no ? `House ${address.house_no}, ` : ""}
                  {address?.street_road ? `${address.street_road}, ` : ""}
                  {address?.block_sector ? `${address.block_sector}, ` : ""}
                  {address?.area ? `${address.area}, ` : ""}
                  {address?.city ? `${address.city}, ` : ""}
                  {address?.postal_code ? `${address.postal_code}` : ""}
                </p>
              </div>
            ))
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
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary"
              >
                View options <ChevronRight />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-[500px]! bg-white">
              <DeliveryOptionPage
                setBtnClose={setBtnClose}
                setDeliveryOption={setDeliveryOption}
              />
            </DrawerContent>
          </Drawer>
        </div>

        <div className="mt-5 flex w-full items-center justify-between rounded-lg bg-white p-5">
          <div className="flex items-center gap-5">
            <ShippingIcon className="hidden md:block" />
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
