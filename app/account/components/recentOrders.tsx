"use client";

import { DataTable } from "@/components/data-table";
import { cn } from "@/lib/utils";
import { TOrder } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";

export default function RecentOrders({ payload }: { payload: TOrder[] }) {
  const orderColumns: ColumnDef<TOrder>[] = [
    {
      accessorKey: "orderId",
      header: "Order #",
    },
    {
      accessorKey: "placedOn",
      header: "Placed on",
    },
    {
      accessorKey: "item",
      header: "Item",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <span
            className={cn(
              row.original.status === "In Shipping" && "text-secondary",
              row.original.status === "Completed" && "text-primary",
              row.original.status === "Canceled" && "text-red-500",
            )}
          >
            {row.original.status}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable
        columns={orderColumns}
        data={payload}
        enableColumnVisibility={false}
        enableFiltering={false}
        enablePagination={false}
        getRowLink={(row) => `/account/my-orders/${row.orderId}`}
      />
    </div>
  );
}
