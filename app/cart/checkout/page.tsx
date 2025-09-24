import Checkout from "../components/checkout";
import Shipping from "../components/shipping";

export default function CheckoutPage() {
  return (
    <section className="section-container w-full space-y-28 pt-10 pb-28">
      <div className="flex flex-col items-start gap-10 md:flex-row">
        <div className="w-full md:w-[70%]">
          <Shipping />
        </div>
        <div className="w-full md:w-[30%]">
          <Checkout
            title="Proceed to Pay"
            redirectTo="/cart/checkout/payment"
          />
        </div>
      </div>
    </section>
  );
}
