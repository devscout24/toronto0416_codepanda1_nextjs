export type TProduct = {
  id: number;
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
  reviews?: TProductReviews[];
  discountPercentage?: number;
  isFavorite: boolean;
  about_product?: string;
};

export type TProductReviews = {
  id: number;
  rating: number;
  reviewer: string;
  date: string;
  comment: string;
};

export type TProductDetailsPayload = {
  product: TProduct;
  aboutProduct?: string;
  reviews?: TProductReviews[];
};

export type TProductDetails = {
  status: string;
  status_code: number;
  message: string;
  data: TProductDetailsPayload;
};

export type TProductData = {
  count: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  results: TProduct[];
};

export type TProductResponse = {
  status: string;
  status_code: number;
  message: string;
  data: TProductData;
};



export type TFavoriteItem = {
  id: number;
  product: TProduct;
  created_at: string;
};

export type TFavoriteResponse = {
  status: string;
  status_code: number;
  message: string;
  data: TFavoriteItem[];
};