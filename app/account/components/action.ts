import fetcher from "@/lib/fetcher";
import { TFavoriteResponse } from "@/types/product.type";

export const getFavoriteList = async () => {
  try {
    const response = await fetcher<TFavoriteResponse>(`/favorites`);

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
