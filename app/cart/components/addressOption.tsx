import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DrawerHeader,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import LeftIcon from "@/assets/icons/chevron-down.svg";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TCartAddress } from "@/types/cart.type";
import { TAddressBook } from "@/types/user.type";

export default function AddressOptionPage({
  addressBook,
  setAddressBtnOpen,
}: {
  addressBook: TAddressBook[];
  // setAddress: Dispatch<SetStateAction<TCartAddress | null>>;
  setAddressBtnOpen: (value: boolean) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (addressBook?.length > 0) {
      const defaultAddress = addressBook.find(address => address.is_default === true);
      if (defaultAddress) {
        setSelectedIndex(defaultAddress.id);
      } else if (addressBook.length > 0) {
        // If no default address, select the first one
        setSelectedIndex(addressBook[0].id);
      }
    }
  }, [addressBook]);


  // const handleSave = () => {
  //   if (selectedIndex !== null) {
  //     setAddress(addresses[selectedIndex] as TCartAddress);
  //     setAddressBtnOpen(false);
  //   } else {
  //     console.log("No address selected");
  //   }
  // }

  return (
    <div className="p-3">
      <DrawerHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <DrawerClose className="mt-0.5">
            <LeftIcon className="rotate-90 hover:cursor-pointer" />
          </DrawerClose>
          <DrawerTitle className="text-lg font-medium">
            Shipping Address
          </DrawerTitle>
        </div>
        <DrawerDescription>
          Choose an address for this order or add a new one below.
        </DrawerDescription>

        <div className="my-3 space-y-2 md:my-8 md:space-y-5">
          {addressBook?.map((address) => (
            <div
              key={address?.id}
              className="cursor-pointer gap-5 rounded-xl border p-5"
              onClick={() => setSelectedIndex(address?.id)}
            >
              <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 md:flex-row">
                <div className="flex items-start gap-3 md:gap-5">
                  <Checkbox
                    className="mt-1 size-5 rounded-full md:size-6"
                    checked={selectedIndex === address?.id}
                    onCheckedChange={() => setSelectedIndex(address?.id)}
                  />
                  <span>
                    <h1 className="text-lg font-medium md:text-xl">
                      {address?.name}
                    </h1>
                    <p className="">{address?.phone}</p>
                  </span>
                </div>
                <Badge className="mt-1 rounded-full bg-black/90 px-3 py-1 text-xs capitalize md:text-sm">
                  {address?.address_type}
                </Badge>
              </div>
              <p className="mt-5">
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
          ))}
        </div>
      </DrawerHeader>

      <div className="grid grid-cols-1 gap-3 px-5 md:grid-cols-2 md:gap-5">
        <DrawerClose className="h-10 rounded-lg border border-neutral-200 font-medium hover:cursor-pointer">
          Close
        </DrawerClose>
        <Button className="h-10" 
        // onClick={handleSave}
        >
          Save
        </Button>
      </div>

      <div className="mx-5 mt-10">
        <Link
          href="?shipping-address=shipping-modal"
          className="border-primary bg-primary-50 text-primary mt-5 flex h-24 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed text-lg font-semibold"
        >
          +Add Address
        </Link>
      </div>
    </div>
  );
}

const addresses = [
  {
    city: "Dhaka",
    area: "Gulshan",
    blockSector: "B",
    streetRoad: "Road 12",
    houseNo: "10",
    flatNo: "5A",
    floorNo: "3",
    name: "John Doe",
    phone: "01712345678",
    deliveryNote: "Leave at door",
    addressType: "office",
  },
  {
    city: "Chittagong",
    area: "Pahartali",
    blockSector: "C",
    streetRoad: "Road 7",
    houseNo: "22",
    flatNo: "2B",
    floorNo: "1",
    name: "Jane Doe",
    phone: "01887654321",
    deliveryNote: "",
    addressType: "home",
  },
];
