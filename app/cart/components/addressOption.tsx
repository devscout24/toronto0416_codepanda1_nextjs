import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button } from '@/components/ui/button'
import { DrawerHeader, DrawerClose } from '@/components/ui/drawer'
import LeftIcon from "@/assets/icons/chevron-down.svg";
import { Checkbox } from '@/components/animate-ui/components/radix/checkbox';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { TCartAddress } from '@/types/cart.type';

export default function AddressOptionPage({
  setAddress, setAddressBtnOpen
}: {
  setAddress: Dispatch<SetStateAction<TCartAddress | null>>;
  setAddressBtnOpen: (value: boolean) => void
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSave = () => {
    if (selectedIndex !== null) {
      setAddress(addresses[selectedIndex] as TCartAddress);
      setAddressBtnOpen(false);
    } else {
      console.log("No address selected");
    }
  }

  return (
    <div className='p-3'>
      <DrawerHeader>
        <h1 className='text-lg font-medium flex gap-3 items-center'>
          <DrawerClose className='mt-0.5'>
            <LeftIcon className='rotate-90 hover:cursor-pointer' />
          </DrawerClose>
          Shipping Address
        </h1>

        <div className="space-y-5 my-10">
          {addresses?.map((address, index) => (
            <div
              key={index}
              className="border p-5 rounded-xl gap-5 cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="flex items-start justify-between border-b border-gray-200 pb-5">
                <div className='flex gap-5 items-start'>
                  <Checkbox
                    className="size-6 rounded-full mt-1"
                    checked={selectedIndex === index}
                    onCheckedChange={() => setSelectedIndex(index)}
                  />
                  <span>
                    <h1 className='text-xl font-medium'>{address?.name}</h1>
                    <p className=''>{address?.phone}</p>
                  </span>
                </div>
                <Badge className='capitalize bg-black/90 text-sm px-3 py-1 rounded-full mt-1'>{address?.addressType}</Badge>
              </div>
              <p className='mt-5'>
                Flat#{address?.flatNo}, Floor#{address?.floorNo}, House: {address?.houseNo}, {address?.streetRoad}, Block: {address?.blockSector}, {address?.area}, {address?.city}
              </p>
            </div>
          ))}
        </div>

      </DrawerHeader>

      <div className='grid grid-cols-2 gap-5 px-5'>
        <DrawerClose className='border border-neutral-200 rounded-lg font-medium hover:cursor-pointer'>
          Edit Address
        </DrawerClose>
        <Button className='h-10' onClick={handleSave}>
          Add
        </Button>
      </div>

      <div className='mt-10 mx-5'>
        <Link
          href="?shipping-address=shipping-modal"
          className="border-primary bg-primary-50 text-primary mt-5 flex h-24 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed text-lg font-semibold"
        >
          +Add Address
        </Link>
      </div>
    </div>
  )
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
    addressType: "office"
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
    addressType: "home"
  }
];
