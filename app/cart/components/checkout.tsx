import { Button } from "@/components/animate-ui/components/buttons/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CartMetaData} from "@/types/cart.type";
import Link from "next/link";

export default function Checkout({
  title,
  redirectTo,
  isDisabled = false,
  metadata
}: {
  title: string;
  redirectTo: string;
  isDisabled?: boolean;
  metadata? : CartMetaData
}) {

  return (
    <section className="rounded-2xl bg-white p-5">
      <div>Checkout</div>
      <Separator className="mt-2.5 mb-5" />

      <div className="space-y-5">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between font-semibold">
            <p>Subtotal</p>
            <span className="float-right">${metadata?.sub_total}</span>
          </div>

          <div className="flex items-center justify-between">
            <p>Shipping Fee</p>
            <span className="float-right">${metadata?.shipping_fee}</span>
          </div>

          <div className="flex items-center justify-between">
            <p>VAT(15%)</p>
            <span className="float-right">${metadata?.vat}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Add Coupon</Label>

          <div className="flex h-[3rem] items-center overflow-hidden rounded-lg border">
            <input
              type="text"
              placeholder="Enter the Coupon"
              className="h-[3rem] w-full px-4"
            />
            <Button
              variant="secondary"
              className="h-[4rem] rounded-none bg-black text-white hover:bg-black"
            >
              Verify
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between font-semibold">
          <p>Total</p>
          <span className="float-right">${metadata?.sub_total}</span>
        </div>

        {!isDisabled ? (
          <Link href={redirectTo}>
            <Button disabled={isDisabled} className="w-full">
              {title}
            </Button>
          </Link>
        ) : (
          <Button className="w-full" disabled>
            Need to Add Address
          </Button>
        )}
      </div>
    </section>
  );
}
