"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "@/components/animate-ui/components/base/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { cancelOrder } from "./action";
import { Order } from "@/types/order";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function OrderCancel({ order }: { order: Order | null }) {
  const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleCancelOrder = async () => {
    if (!order?.order_id) return;
    try {
      setIsLoading(true);
      const res = await cancelOrder(order.order_id);
      if (res?.status === "success") {
        setIsAlertOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary mr-2 py-5 text-white">
          Manage Order <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setIsAlertOpen(true);
          }}
        >
          Cancel Order
        </DropdownMenuItem>

        {order?.status === "delivered" && (
          <Link href={`?ratings-modal=ratings&id=${order?.id}`}>
            <DropdownMenuItem>Give Review</DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogPopup className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to cancel this
              order?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer border border-neutral-200">
              Cancel
            </AlertDialogCancel>
            <Button
              disabled={isLoading}
              onClick={handleCancelOrder}
              className="cursor-pointer bg-red-500 text-white hover:bg-red-600"
            >
              Continue {isLoading && "..."}
            </Button>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </DropdownMenu>
  );
}
