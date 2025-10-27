import fetcher from "@/lib/fetcher";
import {
  TProduct,
  TProductDetails,
  TProductResponse,
} from "@/types/product.type";

// Fetch all products
export const allProducts = async (): Promise<TProduct[]> => {
  try {
    const response = await fetcher<TProductResponse>("/products");
    console.log(response);

    if (!response?.data?.results) {
      console.error("No products found");
      return [];
    }
    return Array.isArray(response?.data?.results) ? response?.data?.results : [response?.data?.results];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch product details by ID
export const getProductDetails = async (
  id: string,
): Promise<TProductDetails | null> => {
  try {
    const response = await fetcher<TProductResponse>(`/products/${id}`);

    if (!response?.data?.product) {
      console.error(`Product with id ${id} not found`);
      return null;
    }

    return {
      product: response.data.product,
      recently_viewed_products: response.data.recently_viewed_products ?? [],
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

export const addOrRemoveWishList = async (
  productId: string,
): Promise<boolean> => {
  try {
    const response = await fetcher<{ message: boolean }>("/favorites", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });

    return response.message;
  } catch (error) {
    console.error(`Error toggling product ${productId} in wishlist:`, error);
    return false;
  }
};
