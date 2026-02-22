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
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;

  const params = new URLSearchParams();

  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value) {
      params.set(key, value);
    }
  });

  const queryString = params.toString();

  let productData: TProductData | [] = [];

  try {
    productData = await allProducts(queryString);
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
