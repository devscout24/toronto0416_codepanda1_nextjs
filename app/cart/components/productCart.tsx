"use client";

import { Counter } from "@/components/animate-ui/components/animate/counter";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { DataTable } from "@/components/data-table";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TCartProduct } from "@/types/cart.type";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export default function ProductCart() {
  const cartData: TCartProduct[] = [
    {
      id: "1",
      image: "/images/card-img.jpg",
      product_name: "Superior Halal Beef Burgers",
      sku: "SPHE •XCCZ",
      price: 49.99,
      quantity: 2,
    },
    {
      id: "2",
      image: "/images/card-img.jpg",
      product_name: "Superior Halal Beef Burgers",
      sku: "SPHE •XCCZ",
      price: 49.99,
      quantity: 1,
    },
    {
      id: "3",
      image: "/images/card-img.jpg",
      product_name: "Superior Halal Beef Burgers",
      sku: "SPHE •XCCZ",
      price: 49.99,
      quantity: 3,
    },
  ];

  const columns: ColumnDef<TCartProduct>[] = [
    {
      header: "Product",
      accessorKey: "product_name",
      cell: ({ row }) => (
        <div className="flex items-center gap-5">
          <Checkbox id={row.original.id} />
          <div className="flex items-center gap-5">
            <Image
              src={row.original.image}
              alt={row.original.product_name}
              width={100}
              height={100}
              className="size-16 rounded-xl object-cover"
            />
            <div>
              <Label htmlFor={row.original.id} className="text-base">
                {row.original.product_name}
              </Label>
              <p className="text-sm">{row.original.sku}</p>
              <div className="mt-4 text-red-600 hover:text-red-600">Remove</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }) => (
        <div className="font-semibold">${row.original.price}</div>
      ),
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
      cell: ({ row }) => (
        <div className="mx-auto w-fit">
          <Counter value={row.original.quantity} />
        </div>
      ),
    },
    {
      header: "Total",
      accessorKey: "total",
      cell: ({ row }) => (
        <div className="font-semibold">
          ${row.original.price * row.original.quantity}
        </div>
      ),
    },
  ];

  return (
    <section className="rounded-2xl bg-white py-5">
      <div className="flex items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <Checkbox id="all-selected" />
          <Label htmlFor="all-selected" className="text-base">
            Select all Product
          </Label>
        </div>
        <Button variant="ghost" className="text-red-600 hover:text-red-600">
          Remove
        </Button>
      </div>
      <Separator className="mt-5" />

      <div>
        <DataTable
          columns={columns}
          data={cartData}
          enableRowSelection={true}
          enableColumnVisibility={false}
          enablePagination={false}
        />
      </div>
    </section>
  );
}
