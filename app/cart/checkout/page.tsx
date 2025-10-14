"use client";

import { useState } from "react";
import Checkout from "../components/checkout";
import Shipping from "../components/shipping";
import { TCartAddress } from "@/types/cart.type";

export default function CheckoutPage() {
  const [address, setAddress] = useState<TCartAddress | null>(null);

  return (
    <section className="section-container w-full space-y-28 pt-10 pb-28">
      <div className="flex flex-col items-start gap-10 md:flex-row">
        <div className="w-full md:w-[70%]">
          <Shipping address={address} setAddress={setAddress} />
        </div>
        <div className="w-full md:w-[30%]">
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
