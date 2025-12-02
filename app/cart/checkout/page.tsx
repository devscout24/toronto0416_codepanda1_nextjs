"use client";

import { useEffect, useState } from "react";
import Checkout from "../components/checkout";
import Shipping from "../components/shipping";
import { TCartAddress } from "@/types/cart.type";
import { addAddress } from "../components/action";

export default function CheckoutPage() {
  const [address, setAddress] = useState<TCartAddress | null>(null);

  useEffect(() => {
    if (address) {
      const saveAddress = async () => {
        try {
          const response = await addAddress(address);
          if (response && response.error) {
            console.error("Error adding address:", response.error);
          } else {
            console.log("Address added successfully");
          }
        } catch (error) {
          console.error("An error occurred while adding the address:", error);
        }
      };

      saveAddress();
    }
  }, [address]);

  return (
    <section className="section-container w-full space-y-28 pt-10 pb-28">
      <div className="flex flex-col items-start gap-5 lg:gap-10 md:flex-row">
        <div className="w-full md:w-[60%] lg:w-[70%]">
          <Shipping/>
          {/* <Shipping address={address} setAddress={setAddress} /> */}
        </div>
        <div className="w-full md:w-[40%] lg:w-[30%]">
          <Checkout
            isDisabled={!address || address === null ? true : false}
            title="Proceed to Pay"
            redirectTo="/cart/checkout/payment"
          />
        </div>
      </div>
    </section>
  );
}
