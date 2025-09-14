import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { Counter } from "../animate-ui/components/animate/counter";
// import LikeIcon from "@/assets/svgs/love.svg";

type TProductCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  badge?: string;
  rating: number;
  oldPrice: string;
  price: string;
  unit: string;
  stockStatus: string;
  isFavorite: boolean;
};

export function SkeletonProductCard() {
  return (
    <section>
      <Skeleton className="h-[428px] w-[287px]" />
    </section>
  );
}

export default function ProductCard({ payload }: { payload: TProductCard }) {
  console.log("payload", payload);

  return (
    <section>
      <Card className="h-[428px] w-[287px] overflow-hidden p-0">
        <CardHeader className="relative p-0">
          <Image
            src="/images/card-img.jpg"
            alt={payload.title}
            width={287}
            height={428}
          />
          <div className="absolute top-4 w-full px-4">
            {/* <LikeIcon /> */}
            <div>{payload.badge && <Badge>{payload.badge}</Badge>}</div>
            <div></div>
          </div>
        </CardHeader>
        <CardContent className="mt-1.5">
          <div>
            {payload?.tags.length > 0 && (
              <div className="flex gap-2">
                {payload.tags.map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="mt-2.5">
            <h2 className="text-lg font-semibold">{payload.title}</h2>
            <p className="line-clamp-1">{payload.description}</p>
          </div>

          <div>
            <Counter className="w-fit" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
