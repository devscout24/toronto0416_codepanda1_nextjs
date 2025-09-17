import { TProductCard } from "@/types/product.type";
import { RippleButton } from "../animate-ui/components/buttons/ripple";
import ProductCard from "../card";

export default function WeeklySpecials() {
  const productData: TProductCard[] = [
    {
      id: "1",
      title: "Fresh Atlantic Salmon",
      description: "Wild-caught sustainable salmon fillet",
      image: "/images/salmon.png",
      tags: ["Halal", "Gluten-Free"],
      badge: "Buy 1 Get 1",
      rating: 4,
      oldPrice: "14.99",
      price: "11.49",
      unit: "kg",
      stockStatus: "out-of-stock",
      isFavorite: true,
    },
    {
      id: "2",
      title: "Fresh Atlantic Salmon",
      description: "Wild-caught sustainable salmon fillet",
      image: "/images/salmon.png",
      tags: ["Halal", "Vegan"],
      rating: 5,
      oldPrice: "14.99",
      price: "11.49",
      unit: "kg",
      stockStatus: "in-stock",
      isFavorite: true,
    },
    {
      id: "3",
      title: "Fresh Atlantic Salmon",
      description: "Wild-caught sustainable salmon fillet",
      image: "/images/salmon.png",
      tags: ["Sugar-Free", "Halal"],
      badge: "Buy 1 Get 1",
      rating: 3,
      oldPrice: "14.99",
      price: "11.49",
      unit: "kg",
      stockStatus: "in-stock",
      isFavorite: true,
    },
  ];

  return (
    <section className="section-container">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Weekly Specials</h2>
        <RippleButton variant="link">Browse All</RippleButton>
      </div>

      <div className="mt-8 flex w-full flex-col flex-nowrap gap-4 md:flex-row">
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
