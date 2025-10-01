"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { DataTable } from "@/components/data-table";
import { cn } from "@/lib/utils";
import { TInvoice } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";

const invoices: TInvoice[] = [
  {
    id: "Invoice #001",
    status: "Paid",
    amount: "USD $20.00",
    downloadUrl: "#", // Assuming this would be an actual URL
  },
  {
    id: "Invoice #001",
    status: "Pending",
    amount: "USD $20.00",
    downloadUrl: "#",
  },
  {
    id: "Invoice #001",
    status: "Failed",
    amount: "USD $20.00",
    downloadUrl: "#",
  },
  {
    id: "Invoice #001",
    status: "Paid",
    amount: "USD $20.00",
    downloadUrl: "#",
  },
];

export default function PaymentsBillingsPage() {
  const columns: ColumnDef<TInvoice>[] = [
    {
      accessorKey: "id",
      header: "Invoices Id",
    },
    {
      accessorKey: "status",
      header: "status",
      cell: ({ row }) => {
        return (
          <span
            className={cn(
              row.original.status === "Paid" && "text-primary",
              row.original.status === "Pending" && "text-secondary",
              row.original.status === "Failed" && "text-red-500",
            )}
          >
            {row.original.status}
          </span>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "downloadUrl",
      header: "",
      cell: ({ row }) => {
        return (
          <a href={row.original.downloadUrl} target="_blank" rel="noreferrer">
            <Button variant="link">Download</Button>
          </a>
        );
      },
    },
  ];

  return (
    <section className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Billing history and invoices
          </h2>
          <p className="text-sm text-neutral-400">
            Manage Your billing and payment details
          </p>
        </div>
        <Button
          variant="accent"
          className="bg-neutral-200 text-white hover:bg-neutral-300"
        >
          Download
        </Button>
      </div>

      <div className="col-span-2 mt-5 rounded-xl bg-white p-5">
        <DataTable
          columns={columns}
          data={invoices}
          enableColumnVisibility={false}
          enablePagination={false}
        />
      </div>
    </section>
  );
}
