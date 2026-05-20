import Header from "@/app/account/components/header";
import OrderCancel from "./OrderCancel";
import LeftSide from "./leftSide";
import RightSide from "./rightSide";
import { Order } from "@/types/order";

export default function OrderDetails({
  orderDetails,
}: {
  orderDetails: Order | null;
}) {
  return (
    <section>
      <Header>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Order Details</h2>
          {orderDetails?.status !== "cancelled" && (
            <OrderCancel order={orderDetails} />
          )}
        </div>
      </Header>
      <div className="mt-5 flex flex-col items-start gap-5 md:flex-row">
        <div className="w-full space-y-5 md:w-[60%] lg:w-[65%]">
          <LeftSide order={orderDetails} />
        </div>

        <div className="w-full space-y-5 md:w-[40%] lg:w-[35%]">
          <RightSide order={orderDetails} />
        </div>
      </div>
    </section>
  );
}
