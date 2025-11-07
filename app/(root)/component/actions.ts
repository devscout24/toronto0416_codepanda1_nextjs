import fetcher from "@/lib/fetcher";
import { SpecialResponse } from "@/types/product.type";


export const getWeeklySpecial = async () => {
  try {
    const response = await fetcher<SpecialResponse>(`/weekly-special-products`);

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

export const getBestSelling = async () => {
  try {
    const response = await fetcher<SpecialResponse>(`/best-selling-products`);

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
