export type TProduct = {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  badge?: string;
  rating: number;
  oldPrice: string;
  price: string;
  unit: string;
  stockStatus: "out-of-stock" | "in-stock";
  isFavorite: boolean;
};

export type TProductReviews = {
  id: number;
  rating: number;
  reviewer: string;
  date: string;
  comment: string;
};

export type TProductDetails = {
  product: TProduct;
  aboutProduct: string; // HTML string for rich text rendering;
  reviews: TProductReviews[];
};
