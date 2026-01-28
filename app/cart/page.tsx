import RecentlyViewed from "@/components/recently-viewed";
import ProductCart from "./components/productCart";
import Checkout from "./components/checkout";
import { getCart } from "./components/action";
import { TCartItems } from "@/types/cart.type";

export default async function CartPage() {
  let cartData: TCartItems | null = null;

  try {
    cartData = await getCart();
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }

  return (
    <section className="mx-4 pt-10 pb-28 lg:mx-6">
      <div className="mx-auto max-w-[1200px] space-y-28">
        <div className="flex w-full flex-col items-start gap-10 lg:flex-row">
          <div className="w-full lg:w-[70%]">
            <ProductCart cartData={cartData?.items ?? []} />
          </div>

          <div className="w-full lg:w-[30%]">
            <Checkout
              title="Proceed to Checkout"
              redirectTo="/cart/checkout"
              metadata={cartData ?? null}
            />
          </div>
        </div>

        <RecentlyViewed title="Need Anything Else?" />
      </div>
    </section>
  );
}
