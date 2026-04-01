import { getOrderDetails } from "../../components/action";
import OrderDetails from "@/components/MyOrders/OrderDetails";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderDetails = await getOrderDetails(id);

  return (
    <div>
      <OrderDetails orderDetails={orderDetails} />
    </div>
  );
}
