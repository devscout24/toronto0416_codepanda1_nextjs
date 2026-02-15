"use client";

import { DataTable } from "@/components/data-table";
import { cn } from "@/lib/utils";
import { TOrder } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export default function RecentOrders({ payload }: { payload: TOrder[] }) {
  const orderColumns: ColumnDef<TOrder>[] = [
    {
      accessorKey: "order_id",
      header: "Order #",
      cell: ({ row }) => {
        return (
          <span>
            {row?.original?.order_id?.slice(0, 5)}***
            {row?.original?.order_id?.slice(-4)}
          </span>
        );
      },
    },
    {
      accessorKey: "placed_on",
      header: "Placed on",
      cell: ({ row }) => {
        return (
          <span>
            {moment(row?.original?.placed_on).format("MMM DD, YYYY hh:mm")}
          </span>
        );
      },
    },
    {
      accessorKey: "items.length",
      header: "Item",
    },
    {
      accessorKey: "total_price",
      header: "Total",
      cell: ({ row }) => {
        return (
          <span className="font-medium">
            $ {Number(row?.original?.total_price || 0).toFixed(2)}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <span
            className={cn(
              "font-medium capitalize",
              row?.original?.status === "In Shipping" && "text-secondary",
              row?.original?.status === "processing" && "text-blue-500",
              row?.original?.status === "Completed" && "text-primary",
              row?.original?.status === "Canceled" && "text-red-500",
            )}
          >
            {row?.original?.status}
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
        getRowLink={(row) => `/account/my-orders/${row?.order_id}`}
      />
    </div>
  );
}
