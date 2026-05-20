"use client";

import { DataTable } from "@/components/data-table";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import LikeButton from "@/components/card/components/LikeButton";
import { TProduct } from "@/types/product.type";
import Rating from "@/components/shared/Rating";
import { cn } from "@/lib/utils";
import defaultImg from "@/assets/images/default.png";
import { useState } from "react";

type FavoriteListProps = {
  products: TProduct[];
};

export default function FavoriteList({ products }: FavoriteListProps) {
  const [imageError, setImageError] = useState(false);

  // Function to handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };
  const columns: ColumnDef<TProduct>[] = [
    {
      header: "Product",
      accessorKey: "product_name",
      cell: ({ row }) => (
        <div className="flex items-center gap-5">
          {/* <Checkbox id={String(row?.original?.id)} /> */}
          <div className="flex items-center gap-5">
            <Image
              src={
                imageError ||
                !row?.original?.images ||
                row?.original?.images.length === 0
                  ? defaultImg
                  : row?.original?.images[0]
              }
              alt={row?.original?.title || "Product Image"}
              width={100}
              height={100}
              className="hidden size-16 rounded-xl border object-cover md:block"
              onError={handleImageError}
            />

            <div>
              <Label
                htmlFor={String(row?.original?.id)}
                className="line-clamp-1 text-sm md:text-base"
              >
                {row?.original?.title}
              </Label>
              {/* <p className="text-xs md:text-sm">{row.sku}</p> */}
              <Rating rating={row?.original?.rating} readOnly />
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "stockStatus",
      cell: ({ row }) => (
        <div
          className={cn(
            row?.original?.stockStatus === "out-of-stock"
              ? "text-red-600"
              : "text-primary-700",
          )}
        >
          {row?.original?.stockStatus === "out-of-stock"
            ? "Out of Stock"
            : "In Stock"}
        </div>
      ),
    },

    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }) => (
        <div className="text-sm font-semibold md:text-base">
          ${row.original.price}
        </div>
      ),
    },
    {
      header: "Action",
      accessorKey: "isFavorite",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <LikeButton payload={row?.original} />
        </div>
      ),
    },
  ];

  return (
    <section className="rounded-2xl bg-white py-5">
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={products}
          enableRowSelection={true}
          enableColumnVisibility={false}
          enablePagination={false}
        />
      </div>
    </section>
  );
}
