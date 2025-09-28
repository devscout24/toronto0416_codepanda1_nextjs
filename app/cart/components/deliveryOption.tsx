import { Button } from '@/components/ui/button'
import { DrawerHeader, DrawerClose } from '@/components/ui/drawer'
import React, { useState } from 'react'
import ShippingIcon from "@/assets/icons/free-shipping.svg";
import LeftIcon from "@/assets/icons/chevron-down.svg";
import { Checkbox } from '@/components/animate-ui/components/radix/checkbox';

export default function DeliveryOptionPage() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleSave = () => {
        console.log("✅ Selected Delivery Option:", selectedOption);
    };

    return (
        <div className='p-3'>
            <DrawerHeader>
                <h1 className='text-lg font-medium flex gap-3 items-center'>
                    <DrawerClose className='mt-0.5'>
                        <LeftIcon className='rotate-90 hover:cursor-pointer' />
                    </DrawerClose>
                    Delivery Option
                </h1>

                <div className='space-y-5 my-10'>
                    <div className="border p-5 rounded-xl border-neutral-100 flex items-center gap-5">
                        <Checkbox
                            className='size-6 rounded-full'
                            checked={selectedOption === "standard"}
                            onCheckedChange={() => handleSelect("standard")}
                        />
                        <div className='flex items-center gap-5'>
                            <ShippingIcon />
                            <div>
                                <h3 className="text-lg font-semibold">Standard delivery</h3>
                                <p className="text-neutral-500">Guaranteed by 18-19 Aug</p>
                            </div>
                        </div>
                    </div>

                    <div className="border p-5 rounded-xl border-neutral-200 flex items-center gap-5">
                        <Checkbox
                            className='size-6 rounded-full'
                            checked={selectedOption === "premium"}
                            onCheckedChange={() => handleSelect("premium")}
                        />
                        <div className='flex items-center gap-5'>
                            <ShippingIcon />
                            <div>
                                <h3 className="text-lg font-semibold">Premium delivery</h3>
                                <p className="text-neutral-500">Guaranteed by 18-19 Aug</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerHeader>

            <div className='grid grid-cols-2 gap-5 px-5'>
                <DrawerClose className='border border-neutral-200 rounded-lg font-medium hover:cursor-pointer'>
                    Close
                </DrawerClose>
                <Button className='h-10' onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    )
}
