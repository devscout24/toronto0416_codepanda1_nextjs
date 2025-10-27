import Header from "../components/header";
import AllProducts from "@/app/all-category/components/products";

export default function MyWishlistPage() {
  return (
    <section className="w-full">
      {/* <h2 className="text-xl font-semibold">My Wishlist</h2> */}
      <Header><h1 className="text-xl font-semibold">My Wishlist</h1></Header>

      <div className="mt-5">
        <AllProducts />
      </div>
    </section>
  );
}
