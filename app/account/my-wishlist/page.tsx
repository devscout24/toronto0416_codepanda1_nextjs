import { TProduct } from "@/types/product.type";
import { getFavoriteList } from "../components/action";
import Header from "../components/header";
import FavoriteList from "./component/favoriteList";

export default async function MyWishlistPage() {
  let productData: TProduct[] = [];

  try {
    const data = await getFavoriteList();
    productData = data ?? [];
  } catch (error) {
    console.error("Failed to fetch weekly special products:", error);
    productData = [];
  }

  return (
    <section className="w-full">
      {/* <h2 className="text-xl font-semibold">My Wishlist</h2> */}
      <Header>
        <h1 className="text-xl font-semibold">My Wishlist</h1>
      </Header>

      <div className="mt-5">
        <FavoriteList products={productData} />
      </div>
    </section>
  );
}
