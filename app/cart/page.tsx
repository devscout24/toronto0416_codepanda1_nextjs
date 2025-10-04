import RecentlyViewed from "@/components/recently-viewed";
import ProductCart from "./components/productCart";
import Checkout from "./components/checkout";

export default function CartPage() {
  // const cartData: TCart = {
  //   checkout: {
  //     product: 3,
  //     subtotal: 180.0,
  //     shipping_fee: 0.0,
  //     vat: 10.0,
  //     total: 190.0,
  //     coupon: {
  //       code: "",
  //       is_valid: false,
  //     },
  //   },
  //   cart: [
  //     {
  //       id: "1",
  //       image: "/images/card-img.jpg",
  //       product_name: "Superior Halal Beef Burgers",
  //       sku: "SPHE •XCCZ",
  //       price: 49.99,
  //       quantity: 2,
  //     },
  //     {
  //       id: "2",
  //       image: "/images/card-img.jpg",
  //       product_name: "Superior Halal Beef Burgers",
  //       sku: "SPHE •XCCZ",
  //       price: 49.99,
  //       quantity: 1,
  //     },
  //     {
  //       id: "3",
  //       image: "/images/card-img.jpg",
  //       product_name: "Superior Halal Beef Burgers",
  //       sku: "SPHE •XCCZ",
  //       price: 49.99,
  //       quantity: 3,
  //     },
  //   ],
  // };

  return (
    <section className="section-container space-y-28 pt-10 pb-28">
      <div className="flex w-full flex-col items-start gap-10 lg:flex-row">
        <div className="w-full lg:w-[70%]">
          <ProductCart />
        </div>
        <div className="w-full lg:w-[30%]">
          <Checkout title="Proceed to Checkout" redirectTo="/cart/checkout" />
        </div>
      </div>
      <RecentlyViewed title="Need Anything Else?" />
    </section>
  );
}
