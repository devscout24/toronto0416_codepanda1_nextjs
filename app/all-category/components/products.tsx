import ProductCard from "@/components/card";
import AppPagination from "@/components/pagination/pagination";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productData } from "@/consts/product";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import Filters from "./filters";
import { Suspense } from "react";
import FiltersSkeleton from "./filtersSkeleton";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AllProducts() {
  return (
    <section>
      <div className="mb-7 flex items-center justify-between rounded-2xl bg-white p-4 relative z-50">
        <div className="flex items-center gap-4">
          <div className="block lg:hidden">
            <Drawer
              direction="left"
            >
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="!max-w-[275px] bg-white rounded-2xl border">
                <DrawerClose className='hover:cursor-pointer mt-5 flex justify-end mr-5'>
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
            <SelectTrigger className="w-[120px] md:w-[180px] bg-neutral-50 py-5 text-black">
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
