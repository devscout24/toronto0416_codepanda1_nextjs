import { TOrder } from "@/types/user.type";
import Header from "../components/header";
import RecentOrders from "../components/recentOrders";
import { getAccountInfo, getOrderList } from "../components/action";
import { Order } from "@/types/order";

export default async function MyOrdersPage() {
  let orders: Order[] = [];

  try {
    const response = await getOrderList();
    orders = response?.results || [];
  } catch (error) {
    console.error("Error fetching account info:", error);
  }

  return (
    <section>
      <Header>
        <h1 className="text-xl font-semibold">My Orders</h1>
      </Header>

      <div className="col-span-2 mt-5 rounded-xl bg-white p-5">
        <div>
          <RecentOrders payload={orders} />
        </div>
      </div>
    </section>
  );
}