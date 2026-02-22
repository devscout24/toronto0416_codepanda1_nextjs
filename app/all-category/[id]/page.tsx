import RecentlyViewed from "@/components/recently-viewed";
import DetailsTab from "./components/detailsTab";
import DetailsView from "./components/detailsView";
import { TProduct } from "@/types/product.type";
import { getProductDetails } from "../components/action";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  let productDetails: TProduct | null = null;

  if (!resolvedParams?.id || resolvedParams.id === "undefined") {
    return <p className="mt-10 text-center">Invalid product ID.</p>;
  }

  try {
    productDetails = await getProductDetails(resolvedParams.id);
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    productDetails = null;
  }

  if (!productDetails) {
    return <p className="mt-10 text-center">Product not found.</p>;
  }

  return (
    <section className="section-container w-full pt-10">
      <div>
        <DetailsView payload={productDetails} />
      </div>

      <div className="my-10">
        <DetailsTab payload={productDetails} />
      </div>

      <div className="mb-28">
        <RecentlyViewed />
      </div>
    </section>
  );
}
