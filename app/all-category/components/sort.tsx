"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeftRight,
  ArrowRightLeft,
  SlidersHorizontal,
} from "lucide-react";
import Filters from "./filters";
import { Suspense } from "react";
import FiltersSkeleton from "./filtersSkeleton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TProduct, TProductData } from "@/types/product.type";
import { useRouter, useSearchParams } from "next/navigation";

export default function Sort({
  productData,
  products,
}: {
  productData?: TProductData | [];
  products?: TProduct[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "default";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-7 flex justify-between rounded-2xl bg-white p-4">
      <div className="flex items-center gap-4">
        <div className="block lg:hidden">
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-[275px]! rounded-2xl border bg-white">
              <DrawerClose className="mt-5 mr-5 flex justify-end hover:cursor-pointer">
                X
              </DrawerClose>
              <ScrollArea className="h-full pb-10">
                <Suspense fallback={<FiltersSkeleton />}>
                  <Filters />
                </Suspense>
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>

        <p className="hidden md:block">
          Showing {products?.length} of{" "}
          {Array.isArray(productData) ? 0 : productData?.count} products
        </p>
      </div>

      <div>
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[120px] bg-neutral-50 py-5 text-black md:w-[180px]">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="low_to_high">
              Low <ArrowRightLeft className="ml-2 inline h-4 w-4" /> High
            </SelectItem>
            <SelectItem value="high_to_low">
              High <ArrowLeftRight className="ml-2 inline h-4 w-4" /> Low
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
