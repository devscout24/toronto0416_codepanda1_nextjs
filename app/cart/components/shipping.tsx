import { Button } from "@/components/animate-ui/components/buttons/button";
import { ChevronRight } from "lucide-react";
import ShippingIcon from "@/assets/icons/free-shipping.svg";
import Link from "next/link";

export default function Shipping() {
  return (
    <section>
      <div className="w-full rounded-2xl bg-white p-5">
        <h3 className="text-lg font-semibold">Shipping Address</h3>

        <Link
          href="?shipping-address=shipping-modal"
          className="border-primary bg-primary-50 text-primary mt-5 flex h-24 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed text-lg font-semibold"
        >
          +Add Address
        </Link>
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
