import Order from "@/components/MyOrders/Order";
import React from "react";

export default function OrdersPage() {
  return (
    <section className="mx-4 min-h-screen pt-10 pb-28 lg:mx-6">
      <div className="mx-auto max-w-[1200px]">
        <Order url="/orders" />
      </div>
    </section>
  );
}
