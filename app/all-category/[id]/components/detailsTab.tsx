import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "@/components/animate-ui/components/base/tabs";
import { TProduct, TProductReviews } from "@/types/product.type";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { Separator } from "@/components/ui/separator";
import Rating from "@/components/shared/Rating";

export default function DetailsTab({ payload }: { payload: TProduct }) {
  const sanitizedHtml = DOMPurify.sanitize(payload?.about_product || "");
  const reactElements = parse(sanitizedHtml);

  return (
    <Tabs defaultValue="about">
      <TabsList className="w-full bg-transparent">
        <TabsTab value="about">About this product</TabsTab>
        <TabsTab value="review">Product Review</TabsTab>
      </TabsList>

      <TabsPanels className="pt-10">
        {/* <TabsPanel value="about">{reactElements}</TabsPanel> */}
        <TabsPanel value="about">
          {payload.about_product ? (
            reactElements
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-muted-foreground">No information available</p>
            </div>
          )}
        </TabsPanel>

        <TabsPanel value="review">
          {(payload.reviews ?? []).length > 0 ? (
            (payload.reviews ?? []).map(
              (review: TProductReviews, idx: number) => (
                <div key={review.id} className="w-full">
                  <div className="space-y-5">
                    <Rating rating={review.rating} readOnly />
                    <p>{review.comment}</p>
                    <div>
                      <p className="font-semibold">{review.reviewer}</p>
                      <p>{review.date}</p>
                    </div>
                  </div>

                  {idx !== (payload.reviews ?? []).length - 1 && (
                    <Separator className="my-10 bg-neutral-100" />
                  )}
                </div>
              ),
            )
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-muted-foreground">No review yet</p>
            </div>
          )}
        </TabsPanel>
      </TabsPanels>
    </Tabs>
  );
}
