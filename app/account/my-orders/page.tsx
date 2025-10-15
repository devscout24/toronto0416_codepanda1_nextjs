import Header from "../components/header";
import RecentOrders from "../components/recentOrders";
import { userData } from "@/consts/user";

export default function MyOrdersPage() {
  return (
    <section>
      {/* <h2 className="text-xl font-semibold">My Orders</h2> */}
      <Header><h1 className="text-xl font-semibold">My Orders</h1></Header>

      <div className="col-span-2 mt-5 rounded-xl bg-white p-5">
        <div>
          <RecentOrders payload={userData.recentOrders} />
        </div>
      </div>
    </section>
  );
}
