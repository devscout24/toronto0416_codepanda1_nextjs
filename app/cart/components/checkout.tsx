import { Button } from "@/components/animate-ui/components/buttons/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TCheckoutCart } from "@/types/cart.type";
import Link from "next/link";

export default function Checkout({
  title,
  redirectTo,
}: {
  title: string;
  redirectTo: string;
}) {
  const checkoutData: TCheckoutCart = {
    product: 3,
    subtotal: 180.0,
    shipping_fee: 0.0,
    vat: 10.0,
    total: 190.0,
    coupon: {
      code: "",
      is_valid: false,
    },
  };

  return (
    <section className="rounded-2xl bg-white p-5">
      <div>Checkout</div>
      <Separator className="mt-2.5 mb-5" />

      <div className="space-y-5">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between font-semibold">
            <p>Subtotal({checkoutData.product} product)</p>
            <span className="float-right">${checkoutData.subtotal}</span>
          </div>

          <div className="flex items-center justify-between">
            <p>Shipping Fee</p>
            <span className="float-right">${checkoutData.shipping_fee}</span>
          </div>

          <div className="flex items-center justify-between">
            <p>VAT(15%)</p>
            <span className="float-right">${checkoutData.vat}</span>
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
          <span className="float-right">${checkoutData.total}</span>
        </div>

        <Link href={redirectTo}>
          <Button className="w-full">{title}</Button>
        </Link>
      </div>
    </section>
  );
}
