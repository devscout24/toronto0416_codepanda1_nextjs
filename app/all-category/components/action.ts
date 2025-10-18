import fetcher from "@/lib/fetcher";
import { TProduct, TProductDetails } from "@/types/product.type";

export const allProducts = async () => {
  try {
    const response = await fetcher("/products");

    if (!response?.data) {
      console.error("No products found");
      return [];
    }

    return response.data as TProduct[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


export const getProductDetails = async (id: string) => {
  try {
    const response = await fetcher(`/products/${id}`);

    if (!response?.data) {
      console.error(`Product with id ${id} not found`);
      return null;
    }

    return response.data as TProductDetails;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};