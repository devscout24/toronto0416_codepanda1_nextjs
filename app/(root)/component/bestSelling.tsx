import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import ProductCard from "@/components/card";
import { TProduct } from "@/types/product.type";
import Link from "next/link";
import { getBestSelling } from "./actions";

export default async function BestSelling() {
  let productData: TProduct[] = [];
  
  try {
    const data = await getBestSelling();
    productData = data ?? [];
  } catch (error) {
    console.error("Failed to fetch weekly special products:", error);
    productData = [];
  }
  return (
    <section className="section-container">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Best Selling</h2>
        <Link href="/all-category">
          <RippleButton variant="link">Browse All</RippleButton>
        </Link>
      </div>

      <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {productData.map((product, idx) => (
          <ProductCard
            key={product.id}
            payload={product}
            priority={idx === 0}
          />
        ))}
      </div>
    </section>
  );
}
