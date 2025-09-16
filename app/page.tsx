import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import ProductCard from "@/components/card";
import { TProductCard } from "@/types/product.type";
import Link from "next/link";

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

export default function Home() {
  return (
    <section className="section-container">
      <div className="my-4">
        <Link href={"?modal=test-modal"}>
          <RippleButton>Ripple Button</RippleButton>
        </Link>

        <Link href={"?modal2=test-modal2"}>
          <RippleButton variant="secondary">Ripple Button</RippleButton>
        </Link>
      </div>

      <div className="bg-primary my-4 h-2 w-full"></div>

      <div className="flex flex-col gap-4 md:flex-row">
        {/* <SkeletonProductCard /> */}

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
