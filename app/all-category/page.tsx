import ProductCard from "@/components/card";
import AppPagination from "@/components/pagination/pagination";
import RecentlyViewed from "@/components/recently-viewed";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProductCard } from "@/types/product.type";

export default function AllCategory() {
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
    {
      id: "7",
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
      id: "8",
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
      id: "9",
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
    <section className="section-container w-full pt-10">
      <div className="mb-7 flex items-center justify-between rounded-2xl bg-white p-4">
        <p>Showing 1-12 of 156 products</p>

        <div>
          <Select>
            <SelectTrigger className="w-[180px] bg-neutral-50 py-5 text-black">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {productData.map((product) => (
          <div key={product.id}>
            <ProductCard payload={product} />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <AppPagination page={1} total={9} />
      </div>

      <div className="my-28">
        <RecentlyViewed />
      </div>
    </section>
  );
}
