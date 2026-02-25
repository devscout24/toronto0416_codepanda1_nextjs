// =========================
// Product Types
// =========================

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

// =========================
// Review Types
// =========================

export type TProductReviews = {
  id: number;
  rating: number;
  reviewer_name: string;
  reviewer_image: string;
  date: string;
  comment: string;
};

// =========================
// Product Details Types
// =========================

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

// =========================
// Paginated Product Response
// =========================

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

// =========================
// Weekly Special Products
// =========================


export type SpecialResponse = {
  status: string;
  status_code: number;
  message: string;
  data: TProduct[];
};


// search type
export type TSearchData = {
  count: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  results: TProduct[];
};

export type TSearchResponse = {
  status: string;
  status_code: number;
  message: string;
  data: TSearchData;
};