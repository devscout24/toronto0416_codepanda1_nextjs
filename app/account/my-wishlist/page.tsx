import { getFavoriteList } from "../components/action";
import Header from "../components/header";
import AllProducts from "@/app/all-category/components/products";

export default async function MyWishlistPage() {

  try {
    const productData = await getFavoriteList();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
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
