"use server";

import fetcher from "@/lib/fetcher";
import { TCartAPIResponse } from "@/types/cart.type";
import { SpecialResponse } from "@/types/product.type";

export const getSearchProducts = async (query: string) => {
  try {
    if (!query || query.trim() === "") {
      console.error("Search query is empty");
      return null;
    }

    const response = await fetcher<SpecialResponse>(
      `/search-by-name/?q=${encodeURIComponent(query)}`,
    );

    if (!response?.data) {
      console.error(`No products found for query: ${query}`);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching search products for query: ${query}`, error);
    return null;
  }
};

export async function getCartLength() {
  try {
    const response = await fetcher<TCartAPIResponse>("/get-cart-items", {
      method: "GET",
    });

    const cartLength = response?.data?.length;

    return cartLength;
  } catch (error) {
    console.error("Error fetching cart length:", error);
    return 0;
  }
}
