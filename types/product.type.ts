export type TProductCard = {
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
  stockStatus: "out-of-stock" | "in-stock";
  isFavorite: boolean;
};
