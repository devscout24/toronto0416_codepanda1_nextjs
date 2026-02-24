"use client";

import { TOrder } from "@/types/user.type";
import Header from "../components/header";
import RecentOrders from "../components/recentOrders";
import { getAccountInfo, getOrderList } from "../components/action";
import { Order, PaginatedOrders } from "@/types/order";
import AppPagination from "@/components/pagination/pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<PaginatedOrders | null>(null);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrderList(page);
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };
    fetchOrders();
  }, [page]);

  return (
    <section>
      <Header>
        <h1 className="text-xl font-semibold">My Orders</h1>
      </Header>

      <div className="col-span-2 mt-5 rounded-xl bg-white p-5">
        <div>
          <RecentOrders payload={orders?.results || []} />
          {orders?.total_pages && orders?.total_pages > 1 && (
            <div className="mt-10">
              <AppPagination
                page={orders.current_page}
                total={orders.total_pages}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
