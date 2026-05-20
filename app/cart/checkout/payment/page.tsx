import React from 'react'
import Checkout from '../../components/checkout';
import Credit from '@/assets/icons/credit.svg';
import Stripe from "@/assets/icons/stripe.svg";
import Paypal from "@/assets/icons/paypal.svg";
import Cash from "@/assets/icons/cash.svg";
import Visa from "@/assets/icons/visa.svg";
import Master from "@/assets/icons/master.svg";
import { TCartItems } from "@/types/cart.type";
import { getCart } from "../../components/action";

const cards = [
  { id: 2, name: "Stripe", icon: Stripe },
  // { id: 3, name: "PayPal", icon: Paypal },
  // { id: 4, name: "Cash on Delivery", icon: Cash },
];

export default async function PaymentPage() {
  let cartData: TCartItems | null = null;

  try {
    cartData = await getCart();
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
  return (
    <section className="section-container w-full space-y-28 pt-10 pb-28">
      <div className="flex flex-col items-start gap-5 md:flex-row lg:gap-10">
        <div className="w-full md:w-[60%] lg:w-[70%]">
          <section className="rounded-2xl bg-white p-5 text-xl font-medium">
            <h1 className="border-b pb-5 text-xl">Your Payment Method</h1>
            <div className="mt-5">
              {/* <h1 className="text-xl">Recommended methods</h1>
              <div className="border-primary/0 hover:border-primary bg-primary/10 mt-2.5 cursor-pointer gap-5 rounded-xl border p-5">
                <div className="flex flex-col justify-between gap-3 md:flex-row">
                  <div className="flex items-center gap-5">
                    <Credit />
                    <span>
                      <p className="text-lg">Credit/Debit Card</p>
                      <p className="text-sm text-neutral-300">
                        Visa / Mastercard
                      </p>
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Master />
                    <Visa />
                  </div>
                </div>
              </div> */}

              <div className="mt-5">
                {/* <h1 className="text-xl">Other payment methods</h1> */}
                <div>
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      // className="bg-accent hover:bg-primary/10 border-accent hover:border-primary mt-2.5 flex cursor-pointer items-center gap-5 rounded-xl border p-5"
                      className="bg-primary/10 border-primary mt-2.5 flex items-center gap-5 rounded-xl border p-5"
                    >
                      <div className="flex items-center gap-5">
                        <card.icon />
                        <div>
                          <p className="text-lg">{card.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="w-full md:w-[40%] lg:w-[30%]">
          <Checkout
            title="Place Order"
            // redirectTo="?place-order-modal=place-order"
            metadata={{
              sub_total: cartData?.sub_total ?? 0.0,
              shipping_fee: cartData?.shipping_fee ?? 0.0,
              vat: cartData?.vat ?? 0.0,
              discount: cartData?.discount ?? 0.0,
              total_price: cartData?.total_price ?? 0.0,
            }}
          />
        </div>
      </div>
    </section>
  );
}
