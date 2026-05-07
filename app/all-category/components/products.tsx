import ProductCard from "@/components/card";
import AppPagination from "@/components/pagination/pagination";
import { TProduct, TProductData } from "@/types/product.type";
import Sort from "./sort";
import { checkIsAddress } from "@/components/action";

export default async function AllProducts({
  productData,
  products,
}: {
  productData?: TProductData | [];
  products?: TProduct[];
}) {
  

  return (
    <>
      <Sort productData={productData} products={products} />

      <div className="grid min-h-75 grid-cols-2 gap-2 md:gap-5 lg:grid-cols-3">
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
