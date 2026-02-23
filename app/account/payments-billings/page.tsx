"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { DataTable } from "@/components/data-table";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { Invoice } from "@/types/order";
import { getInvoice } from "../components/action";
import { Badge } from "@/components/ui/badge";

export default function PaymentsBillingsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await getInvoice();
        setInvoices(res || []); // Set to empty array if res is null
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices(); // ✅ Call it here, not inside the function
  }, []);

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "invoice_no",
      header: "Invoices Id",
    },
    {
      accessorKey: "status",
      header: "status",
      cell: ({ row }) => {
        return (
          <Badge
            className={cn(
              "rounded-full border capitalize",
              row?.original.status === "paid" &&
                "text-primary border-primary/50 bg-primary/10",
              row.original.status === "unpaid" &&
                "text-secondary border-secondary/50 bg-secondary/10",
              row.original.status === "refunded" &&
                "text-destructive border-destructive/50 bg-destructive/10",
            )}
          >
            {row.original.status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount (USD)",
    },
    {
      accessorKey: "downloadUrl",
      header: "Action",
      cell: ({ row }) => {
        return (
          <a
            href={row.original.invoice_download_url}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="link">Download</Button>
          </a>
        );
      },
    },
  ];

  return (
    <section className="w-full">
      <Header>
        <div className="mr-4 flex items-center justify-between lg:mr-1">
          <div>
            <h2 className="text-xl font-semibold">
              Billing history and invoices
            </h2>
            <p className="text-sm text-neutral-400">
              Manage Your billing and payment details
            </p>
          </div>
          {/* <Button
            variant="accent"
            className="bg-neutral-200 text-white hover:bg-neutral-300"
          >
            Download
          </Button> */}
        </div>
      </Header>

      <div className="col-span-2 mt-5 rounded-xl bg-white p-5">
        <DataTable
          columns={columns}
          data={invoices}
          enableColumnVisibility={false}
          enableFiltering={false}
          enablePagination={false}
        />
      </div>
    </section>
  );
}
