"use server";

import fetcher from "@/lib/fetcher";
import { TProduct } from "@/types/product.type";

export const getSearchProducts = async (query: string): Promise<TProduct[] | null> => {
  try {
    if (!query || query.trim() === "") return null;

    const response = await fetcher<{ data: TProduct[] }>(
      `/search-by-name/?q=${encodeURIComponent(query)}`
    );

    return response?.data ?? [];
  } catch (error) {
    console.error("Error fetching search products:", error);
    return null;
  }
};
