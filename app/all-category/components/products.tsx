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
import { TProduct, TProductData } from "@/types/product.type";

export default async function AllProducts({
  productData,
  products,
}: {
  productData?: TProductData | [];
  products?: TProduct[];
}) {
  return (
    <>
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
        <div className="">
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

      <div className="grid min-h-[300px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products && products.length > 0 ? (
          products.map((product, idx) => (
            <ProductCard key={product?.id || idx} payload={product} />
          ))
        ) : (
          <div className="col-span-full flex h-full w-full items-center justify-center py-20">
            <p className="text-center text-lg text-gray-500">
              No products found.
            </p>
          </div>
        )}
      </div>

      {!Array.isArray(productData) &&
        productData?.total_pages &&
        productData?.total_pages > 1 && (
          <div className="mt-10">
            <AppPagination
              page={productData.current_page}
              total={productData.total_pages}
            />
          </div>
        )}
    </>
  );
}
