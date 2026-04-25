"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { ChevronRight } from "lucide-react";
import ShippingIcon from "@/assets/icons/free-shipping.svg";
import Link from "next/link";
import Modal from "@/components/modal/Modal";
import ShippingAddress from "../modals/shippingAddress";
import { Suspense, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import DeliveryOptionPage from "./deliveryOption";
import AddressOptionPage from "./addressOption";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TAddressBook, TDeliveryOption } from "@/types/user.type";
import {
  getDefaultAddress,
  getDefaultDeliveryOption,
} from "@/app/account/components/action";
import { useRouter, useSearchParams } from "next/navigation";

export default function Shipping() {
  const [btnClose, setBtnClose] = useState<boolean>(false);
  const [addressBtnOpen, setAddressBtnOpen] = useState<boolean>(false);
  const [defaultAddress, setDefaultAddress] = useState<TAddressBook | null>(
    null,
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (defaultAddress?.id) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("address_id", String(defaultAddress.id));

      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [defaultAddress]);

  const [defaultDeliveryOption, setDefaultDeliveryOption] =
    useState<TDeliveryOption | null>(null);

  const fetchDefaultAddress = async () => {
    try {
      const response = await getDefaultAddress();
      setDefaultAddress(response);
    } catch (error) {
      console.error("Error fetching address book:", error);
    }
  };

  useEffect(() => {
    fetchDefaultAddress();
  }, []);

  const fetchDefaultDeliveryOption = async () => {
    try {
      const response = await getDefaultDeliveryOption();
      setDefaultDeliveryOption(response);
    } catch (error) {
      console.error("Error fetching delivery option", error);
    }
  };

  useEffect(() => {
    fetchDefaultDeliveryOption();
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
                  defaultAddressId={defaultAddress?.id}
                  setAddressBtnOpen={setAddressBtnOpen}
                  fetchDefaultAddress={fetchDefaultAddress}
                />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>

        {defaultAddress ? (
          <div key={defaultAddress?.id} className="rounded-lg border p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <p className="text-xl font-semibold">
                  {defaultAddress.address}
                </p>
                <Badge className="rounded-full bg-black">Default</Badge>
              </div>
            </div>
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
            title="Find the location for delivery"
            modalId="shipping"
            openId="shipping"
          >
            <ShippingAddress />
          </Modal>
        </Suspense>
      </div>

      {/* <div className="mt-10">
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
                fetchDefaultDeliveryOption={fetchDefaultDeliveryOption}
                defaultDeliveryOptionId={defaultDeliveryOption?.id}
                setBtnClose={setBtnClose}
              />
            </DrawerContent>
          </Drawer>
        </div>

        <div className="mt-5 flex w-full items-center justify-between rounded-lg bg-white p-5">
          <div className="flex items-center gap-5">
            <ShippingIcon className="hidden md:block" />
            <div>
              <h3 className="text-lg font-semibold">
                {defaultDeliveryOption?.name}
              </h3>
              <p className="text-neutral-500">
                {defaultDeliveryOption?.description}
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold">
            ${defaultDeliveryOption?.shipping_charge}
          </p>
        </div>
      </div> */}
    </section>
  );
}
