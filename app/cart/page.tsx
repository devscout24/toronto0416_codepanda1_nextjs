import RecentlyViewed from "@/components/recently-viewed";
import ProductCart from "./components/productCart";
import Checkout from "./components/checkout";
import { getCart } from "./components/action";
import { TCartAPIResponse } from "@/types/cart.type";

export default async function CartPage() {
  let cartData: TCartAPIResponse | null = null;

  try {
    cartData = await getCart();
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }

  return (
    <section className="pt-10 pb-28 mx-4 lg:mx-6">
      <div className="max-w-[1200px] mx-auto space-y-28">
        <div className="flex w-full flex-col items-start gap-10 lg:flex-row">
          <div className="w-full lg:w-[70%]">
            <ProductCart cartData={cartData?.data ?? []} />
          </div>

          <div className="w-full lg:w-[30%]">
            <Checkout
              title="Proceed to Checkout"
              redirectTo="/cart/checkout"
            metadata={cartData?.metadata}
            />
          </div>
        </div>

        <RecentlyViewed title="Need Anything Else?" />
      </div>
    </section>
  );
}
