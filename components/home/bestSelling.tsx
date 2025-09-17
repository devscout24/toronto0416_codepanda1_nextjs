import { TProductCard } from "@/types/product.type";
import { RippleButton } from "../animate-ui/components/buttons/ripple";
import ProductCard from "../card";

export default function BestSelling() {
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
    {
      id: "4",
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
      id: "5",
      title: "Fresh Atlantic Salmon",
      description: "Wild-caught sustainable salmon fillet",
      image: "/images/salmon.png",
      tags: ["Halal", "Vegan"],
      rating: 5,
      oldPrice: "14.99",
      price: "11.49",
      unit: "kg",
      stockStatus: "out-of-stock",
      isFavorite: true,
    },
    {
      id: "6",
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
        <h2 className="text-3xl font-semibold">Best Selling</h2>
        <RippleButton variant="link">Browse All</RippleButton>
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
