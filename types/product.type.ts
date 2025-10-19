export type TProduct = {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  badge?: string;
  oldPrice: string;
  price: string;
  unit: string;
  stockStatus: "out-of-stock" | "in-stock";
  rating: number;
  reviews: TProductReviews[];
  discountPercentage?: number;
  isFavorite: boolean;
  aboutProduct: string;
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
  aboutProduct: string;
  reviews: TProductReviews[];
};

export type TProductResponse = {
  status: string;
  status_code: number;
  message: string;
  data: TProduct;
};
