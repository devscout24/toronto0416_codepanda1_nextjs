import RecentlyViewed from "@/components/recently-viewed";
import DetailsTab from "./components/detailsTab";
import DetailsView from "./components/detailsView";
import { TProductDetails } from "@/types/product.type";
import { getProductDetails } from "../components/action";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  let productDetails: TProductDetails | null = null;

  try {
    productDetails = await getProductDetails(params.id);
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    productDetails = null;
  }

  if (!productDetails) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  return (
    <section className="section-container w-full pt-10">
      <div>
        <DetailsView payload={productDetails.product} />
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
