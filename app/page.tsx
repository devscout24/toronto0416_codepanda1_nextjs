import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import ProductCard, { SkeletonProductCard } from "@/components/Card";
import Link from "next/link";

const productData = [
  {
    id: "1",
    title: "Fresh Atlantic Salmon",
    description: "Wild-caught sustainable salmon fillet",
    image: "/images/salmon.png",
    tags: ["Halal", "Gluten-Free"],
    badge: "Buy 1 Get 1",
    rating: 5,
    oldPrice: "$14.99",
    price: "$11.49",
    unit: "/kg",
    stockStatus: "In Stock",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Fresh Atlantic Salmon",
    description: "Wild-caught sustainable salmon fillet",
    image: "/images/salmon.png",
    tags: ["Halal", "Vegan"],
    rating: 5,
    oldPrice: "$14.99",
    price: "$11.49",
    unit: "/kg",
    stockStatus: "In Stock",
    isFavorite: true,
  },
  {
    id: "3",
    title: "Fresh Atlantic Salmon",
    description: "Wild-caught sustainable salmon fillet",
    image: "/images/salmon.png",
    tags: ["Sugar-Free", "Halal"],
    badge: "Buy 1 Get 1",
    rating: 5,
    oldPrice: "$14.99",
    price: "$11.49",
    unit: "/kg",
    stockStatus: "In Stock",
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

      <div className="flex gap-4">
        <ProductCard payload={productData[0]} />
        <SkeletonProductCard />
      </div>
    </section>
  );
}
