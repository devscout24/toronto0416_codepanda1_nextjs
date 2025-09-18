import { TProductCard } from "@/types/product.type";
import ProductCard from "../card";

export default function RecentlyViewed() {
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
  ];

  return (
    <section className="space-y-7">
      <h1 className="text-3xl font-bold">Recently Viewed</h1>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {productData.map((product) => (
          <div key={product.id}>
            <ProductCard payload={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
