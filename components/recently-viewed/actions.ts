"use server"

import fetcher from "@/lib/fetcher";
import { SpecialResponse } from "@/types/product.type";

export const getRecentlyViews = async () => {
  try {
    const response = await fetcher<SpecialResponse>(`/recently-viewed-products`);

    if (!response?.data) {
      console.error(`Product not found`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching product`, error);
    return null;
  }
};