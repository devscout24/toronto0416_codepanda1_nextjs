import { TCartItems } from "@/types/cart.type";
import Checkout from "../components/checkout";
import Shipping from "../components/shipping";
import { getCart } from "../components/action";
import { isUser } from "@/components/main-nav/actions";

export default async function CheckoutPage() {
  let cartData: TCartItems | null = null;
  const isUserLoggedIn = await isUser();

  try {
    cartData = await getCart();
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
  return (
    <section className="section-container w-full space-y-28 pt-10 pb-28">
      <div className="flex flex-col items-start gap-5 md:flex-row lg:gap-10">
        <div className="w-full md:w-[60%] lg:w-[70%]">
          <Shipping />
        </div>
        <div className="w-full md:w-[40%] lg:w-[30%]">
          <Checkout
            title="Proceed to Pay"
            isUserLoggedIn={isUserLoggedIn}
            // redirectTo="/cart/checkout/payment"
            metadata={{
              sub_total: cartData?.sub_total ?? 0.0,
              shipping_fee: cartData?.shipping_fee ?? 0.0,
              vat: cartData?.vat ?? 0.0,
              discount: cartData?.discount ?? 0.0,
              total_price: cartData?.total_price ?? 0.0,
            }}
          />
        </div>
      </div>
    </section>
  );
}
