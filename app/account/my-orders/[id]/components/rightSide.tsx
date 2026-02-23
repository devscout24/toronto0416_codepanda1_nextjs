import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Order } from "@/types/order";

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
        </div>

        <Separator className="my-2.5" />

        <div className="flex items-center justify-between font-semibold">
          <p>Total</p>
          <p>${order?.total_price.toFixed(2)}</p>
        </div>
      </div>

      <div className="w-full rounded-xl bg-white p-5">
        <h3 className="font-semibold">Order Status</h3>

        <Separator className="my-2.5" />

        {/* <div className="space-y-8 pt-3.5">
          {order.statusTimeline.map((item, index) => (
            <div key={index} className="relative flex items-start gap-4">
              <div
                className={cn(
                  "mt-1.5 size-5 rounded-full",
                  item.completed ? "bg-primary" : "bg-neutral-50",
                )}
              ></div>
              {index !== 0 && (
                <div
                  className={cn(
                    "absolute bottom-5 left-2 h-[4.6rem] w-1",
                    item.completed ? "bg-primary" : "bg-neutral-50",
                  )}
                ></div>
              )}
              <div>
                <p>{item.status}</p>
                <p className="text-sm text-neutral-300">{item.date}</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
}
