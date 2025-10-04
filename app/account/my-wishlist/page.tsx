import ProductCart from "@/app/cart/components/productCart";

export default function MyWishlistPage() {
  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold">My Wishlist</h2>

      <div className="mt-5">
        <ProductCart />
      </div>
    </section>
  );
}
