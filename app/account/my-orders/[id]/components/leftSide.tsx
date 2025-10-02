"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderDetails } from "@/consts/order";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LeftSide() {
  const router = useRouter();

  return (
    <>
      <div className="flex w-full items-center justify-between rounded-xl bg-white p-5">
        <div>
          <h3 className="text-sm text-neutral-300">Order ID</h3>
          <p className="mt-1 font-semibold">{orderDetails.orderId}</p>
        </div>

        <div className="text-right">
          <h3 className="text-sm text-neutral-300">Tracking ID</h3>
          <p className="mt-1 font-semibold">{orderDetails.trackingId}</p>
        </div>
      </div>

      <div className="w-full rounded-xl bg-white p-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Details</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead className="text-right">Net Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderDetails.items.map((item) => (
              <TableRow
                key={item.id}
                className="cursor-pointer"
                onClick={() => router.push(`/all-category/${item.id}`)}
              >
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={item.image}
                    height={50}
                    width={50}
                    alt="product-image"
                    className="size-10 rounded-md"
                  />
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                    <p>{item.sku}</p>
                  </div>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-right">${item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
