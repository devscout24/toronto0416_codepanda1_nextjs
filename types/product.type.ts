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
  reviews?: TProductReviews[]; 
  discountPercentage?: number;
  isFavorite: boolean;
  aboutProduct?: string; 
};

export type TProductReviews = {
  id: number;
  rating: number;
  reviewer: string;
  date: string;
  comment: string;
};

export type TProductDetails = {
  status: string;
  status_code: number;
  message: string;
  data: {
    product: TProduct ;
    aboutProduct?: string; 
    reviews?: TProductReviews[];
  }; // Changed from TProduct to TProductDetails
};

export type TProductResponse = {
  status: string;
  status_code: number;
  message: string;
  data: {
    results: TProduct | TProduct[];
  }
};
