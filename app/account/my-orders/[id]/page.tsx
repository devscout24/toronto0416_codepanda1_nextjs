import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import LeftSide from "./components/leftSide";
import RightSide from "./components/rightSide";
import Link from "next/link";
import Header from "../../components/header";
import { getOrderDetails } from "../../components/action";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const orderId = await params;

  const orderDetails = await getOrderDetails(orderId?.id);

  return (
    <section>
      <Header>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-primary mr-2 py-5 text-white">
                Manage Order <ChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <Link href="?confirm-cancel-order-modal=confirm-cancel-order">
                <DropdownMenuItem>Cancel Order</DropdownMenuItem>
              </Link>

              {orderDetails?.status === "delivered" && (
                <Link href={`?ratings-modal=ratings&id=${orderDetails?.id}`}>
                  <DropdownMenuItem>Give Review</DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuContent>
          </DropdownMenu>{" "}
        </div>
      </Header>
      <div className="mt-5 flex flex-col items-start gap-5 md:flex-row">
        <div className="w-full space-y-5 md:w-[60%] lg:w-[65%]">
          <LeftSide order={orderDetails} />
        </div>

        <div className="w-full space-y-5 md:w-[40%] lg:w-[35%]">
          <RightSide order={orderDetails} />
        </div>
      </div>
    </section>
  );
}
