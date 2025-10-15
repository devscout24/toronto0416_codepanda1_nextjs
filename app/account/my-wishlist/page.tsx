import ProductCart from "@/app/cart/components/productCart";
import Header from "../components/header";

export default function MyWishlistPage() {
  return (
    <section className="w-full">
      {/* <h2 className="text-xl font-semibold">My Wishlist</h2> */}
      <Header><h1 className="text-xl font-semibold">My Wishlist</h1></Header>

      <div className="mt-5">
        <ProductCart />
      </div>
    </section>
  );
}
