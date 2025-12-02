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

export default function OrderDetailsPage() {
  return (
    <section>
      <Header>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Order Details</h2>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-primary py-5 text-white mr-2">
                Manage Order <ChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <Link href="?confirm-cancel-order-modal=confirm-cancel-order">
                <DropdownMenuItem>Cancel Order</DropdownMenuItem>
              </Link>

              <Link href="?ratings-modal=ratings">
                <DropdownMenuItem>Give Review</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu> </div></Header>
      <div className="flex flex-col md:flex-row items-start gap-5 mt-5">
        <div className="w-full md:w-[60%] lg:w-[65%] space-y-5">
          <LeftSide />
        </div>

        <div className="w-full md:w-[40%] lg:w-[35%] space-y-5">
          <RightSide />
        </div>
      </div>
    </section>
  );
}
