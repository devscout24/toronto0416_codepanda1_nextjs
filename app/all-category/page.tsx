import RecentlyViewed from "@/components/recently-viewed";
import AllProducts from "./components/products";
import Filters from "./components/filters";
import { Suspense } from "react";
import FiltersSkeleton from "./components/filtersSkeleton";
import { TProductData } from "@/types/product.type";
import { allProducts } from "./components/action";

export default async function AllCategoryPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const page = Number(searchParams.page) || 1;
  let productData: TProductData | [] = [];
  try {
    productData = await allProducts({ page });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    productData = [];
  }

  const products = Array.isArray(productData) ? [] : productData.results || [];

  return (
    <section className="section-container w-full pt-10">
      <div className="flex gap-7">
        <div className="hidden w-1/5 lg:block">
          <Suspense fallback={<FiltersSkeleton />}>
            <Filters />
          </Suspense>
        </div>
        <div className="w-full lg:w-4/5">
          <AllProducts products={products} productData={productData} />
        </div>
      </div>

      <div className="my-28">
        <RecentlyViewed />
      </div>
    </section>
  );
}
