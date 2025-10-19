import ProductCard from "@/components/card";
import AppPagination from "@/components/pagination/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productData } from "@/consts/product";
import { SlidersHorizontal } from "lucide-react";
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

export default function AllProducts() {
  return (
    <section>
      <div className="relative z-50 mb-7 flex items-center justify-between rounded-2xl bg-white p-4">
        <div className="flex items-center gap-4">
          <div className="block lg:hidden">
            <Drawer direction="left">
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="!max-w-[275px] rounded-2xl border bg-white">
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
          <p className="hidden md:block">Showing 1-12 of 156 products</p>
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[120px] bg-neutral-50 py-5 text-black md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {productData.map((product) => (
          <div key={product.id}>
            <ProductCard payload={product} />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <AppPagination page={1} total={2} />
      </div>
    </section>
  );
}
