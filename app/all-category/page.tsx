import RecentlyViewed from "@/components/recently-viewed";
import AllProducts from "./components/products";
import Filters from "./components/filters";
import { Suspense } from "react";
import FiltersSkeleton from "./components/filtersSkeleton";

export default function AllCategoryPage() {
  return (
    <section className="section-container w-full pt-10">
      <div className="flex items-start gap-7">
        <div>
          <Suspense fallback={<FiltersSkeleton />}>
            <Filters />
          </Suspense>
        </div>
        <div>
          <AllProducts />
        </div>
      </div>

      <div className="my-28">
        <RecentlyViewed />
      </div>
    </section>
  );
}
