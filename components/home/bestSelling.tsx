import { productData } from "@/consts/product";
import { RippleButton } from "../animate-ui/components/buttons/ripple";
import ProductCard from "../card";
import Link from "next/link";

export default function BestSelling() {
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
