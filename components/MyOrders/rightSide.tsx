import { Separator } from "@/components/ui/separator";
import { Order } from "@/types/order";
import OrderTracker from "./OrderTracker";

export default function RightSide({ order }: { order: Order | null }) {
  return (
    <>
      <div className="w-full rounded-xl bg-white p-5">
        <h3 className="font-semibold">Summery</h3>

        <Separator className="my-2.5" />

        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-sm">
            <p>Subtotal ({order?.items?.length} product)</p>
            <p>${order?.sub_total.toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <p>Shipping Fee</p>
            <p>${order?.shipping_charge.toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <p>VAT</p>
            <p>${order?.vat_amount.toFixed(2)}</p>
          </div>
          <div className="text-primary flex items-center justify-between text-sm">
            <p>Discount</p>
            <p>- ${order?.discount.toFixed(2)}</p>
          </div>
        </div>

        <Separator className="my-2.5" />

        <div className="flex items-center justify-between font-semibold">
          <p>Total</p>
          <p>${order?.total_price.toFixed(2)}</p>
        </div>
      </div>

      <OrderTracker order={order || { status: "pending" }} />
    </>
  );
}
