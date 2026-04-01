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
import { Order } from "@/types/order";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LeftSide({ order }: { order: Order | null }) {
  const router = useRouter();

  return (
    <>
      <div className="flex w-full items-center justify-between rounded-xl bg-white p-5 text-sm">
        <div>
          <h3 className="text-neutral-300">Order ID</h3>
          <p className="mt-1 font-medium">{order?.order_id}</p>
        </div>

        <div className="text-right">
          <h3 className="text-neutral-300">Tracking ID</h3>
          <p className="mt-1 font-medium">{order?.tracking_id}</p>
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
            {order?.items.map((item) => (
              <TableRow
                key={item.id}
                className="cursor-pointer"
                onClick={() => router.push(`/all-category/${item.id}`)}
              >
                <TableCell className="flex items-center gap-2">
                  {/* <Image
                    src={item.image}
                    height={50}
                    width={50}
                    alt="product-image"
                    className="size-10 rounded-md"
                  /> */}
                  <div>
                    <p className="font-semibold">{item.product_name}</p>
                    {/* <p>{item.sku}</p> */}
                  </div>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ${item.product_price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
