import RecentlyViewed from "@/components/recently-viewed";
import DetailsTab from "./components/detailsTab";
import DetailsView from "./components/detailsView";

import { productDetails } from "@/consts/product";

export default function ProductDetailsPage() {
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
