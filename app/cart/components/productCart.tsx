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
import { useEffect, useState } from "react";
import { removeCartItem } from "./action";
import { toast } from "sonner";
import defaultImg from "@/assets/images/default.png";
import { Spinner } from "@/components/ui/spinner";
import debounce from "lodash/debounce";
import { useRef } from "react";
import { updateCartValue } from "@/app/all-category/components/action";

export default function ProductCart({
  cartData,
}: {
  cartData: TCartProduct[];
}) {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [imageError, setImageError] = useState(false);
  const [removingIds, setRemovingIds] = useState<number[]>([]);

  const handleImageError = () => setImageError(true);
  const debouncedUpdateRef = useRef(
    debounce((value: { productId: number; quantity: number }) => {
      handleOnChangeQuantity(value);
    }, 500),
  );

  useEffect(() => {
    return () => {
      debouncedUpdateRef.current.cancel();
    };
  }, []);

  const handleProductSelect = (productId: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedProducts(cartData.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  // ✅ Remove multiple selected products
  const handleRemoveSelected = async () => {
    if (selectedProducts.length === 0) return;

    try {
      setRemovingIds(selectedProducts); // Show loading for selected
      await removeCartItem(selectedProducts);
      toast.success("Selected products removed successfully!");
      setSelectedProducts([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove selected products.");
    } finally {
      setRemovingIds([]);
    }
  };

  // ✅ Remove a single product
  const handleSingleRemove = async (productId: number) => {
    try {
      setRemovingIds((prev) => [...prev, productId]); // Add loading for this product
      await removeCartItem([productId]);
      toast.success("Product removed successfully!");
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product.");
    } finally {
      setRemovingIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleOnChangeQuantity = async (newValue: {
    productId: number;
    quantity: number;
  }) => {
    if (newValue.quantity < 1) return;

    try {
      await updateCartValue(newValue.productId, newValue.quantity);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const columns: ColumnDef<TCartProduct>[] = [
    {
      header: "Product",
      accessorKey: "product_name",
      cell: ({ row }) => (
        <div className="flex items-center gap-5">
          <Checkbox
            id={String(row.original.id)}
            checked={selectedProducts.includes(row.original.id)}
            onCheckedChange={(checked) =>
              handleProductSelect(row.original.id, checked as boolean)
            }
          />
          <div className="flex items-center gap-5">
            <Image
              src={
                imageError ||
                !row.original.image ||
                row.original.image.length === 0
                  ? defaultImg
                  : row.original.image
              }
              alt={row.original.product_name || "Product Image"}
              width={100}
              height={100}
              className="hidden size-16 rounded-xl border object-cover md:block"
              onError={handleImageError}
            />
            <div>
              <Label
                htmlFor={String(row.original.id)}
                className="text-sm md:text-base"
              >
                {row.original.product_name}
              </Label>
              <p className="text-xs md:text-sm">{row.original.sku}</p>
              <div className="mt-2">
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-600"
                  onClick={() => handleSingleRemove(row.original.id)}
                  disabled={removingIds.includes(row.original.id)}
                >
                  {removingIds.includes(row.original.id) ? (
                    <div className="flex items-center gap-2">
                      <Spinner className="size-4" />
                      <span>Removing...</span>
                    </div>
                  ) : (
                    "Remove"
                  )}
                </Button>
              </div>
            </div>
          </div>
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
      header: "Quantity",
      accessorKey: "quantity",
      cell: ({ row }) => (
        <div className="mx-auto w-fit text-sm md:text-base">
          <Counter
            value={row.original.quantity}
            onChange={(newValue) => {
              // // UI update first
              // setQuantity(newValue as number);

              // API update debounced
              debouncedUpdateRef.current({
                productId: row.original.product_id,
                quantity: newValue as number,
              });
            }}
          />
        </div>
      ),
    },
    {
      header: "Total",
      accessorKey: "total",
      cell: ({ row }) => (
        <div className="text-sm font-semibold md:text-base">
          $
          {(Number(row.original.price) * Number(row.original.quantity)).toFixed(
            3,
          )}
        </div>
      ),
    },
  ];

  return (
    <section className="rounded-2xl bg-white py-5">
      <div className="flex items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="all-selected"
            checked={
              selectedProducts.length === cartData.length && cartData.length > 0
            }
            onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
          />
          <Label htmlFor="all-selected" className="text-base">
            Select all Product
          </Label>
        </div>
        <Button
          variant="ghost"
          className="text-red-600 hover:text-red-600"
          onClick={handleRemoveSelected}
          disabled={
            selectedProducts.length === 0 ||
            selectedProducts.some((id) => removingIds.includes(id))
          }
        >
          {selectedProducts.some((id) => removingIds.includes(id)) ? (
            <div className="flex items-center gap-2">
              <Spinner className="size-4" />
              <span>Removing...</span>
            </div>
          ) : (
            "Remove"
          )}
        </Button>
      </div>
      <Separator className="mt-5" />

      <div className="overflow-x-auto">
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
