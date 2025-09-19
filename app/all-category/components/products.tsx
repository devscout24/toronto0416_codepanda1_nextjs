import ProductCard from "@/components/card";
import AppPagination from "@/components/pagination/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productData } from "@/consts/product";

export default function AllProducts() {
  return (
    <section>
      <div className="mb-7 flex items-center justify-between rounded-2xl bg-white p-4">
        <p>Showing 1-12 of 156 products</p>

        <div>
          <Select>
            <SelectTrigger className="w-[180px] bg-neutral-50 py-5 text-black">
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
