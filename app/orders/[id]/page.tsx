import { getOrderDetails } from "@/app/account/components/action";
import OrderDetails from "@/components/MyOrders/OrderDetails";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderDetails = await getOrderDetails(id);

  return (
    <section className="mx-4 min-h-screen pt-10 pb-28 lg:mx-6">
      <div className="mx-auto max-w-[1200px]">
        <OrderDetails orderDetails={orderDetails} />
      </div>
    </section>
  );
}
