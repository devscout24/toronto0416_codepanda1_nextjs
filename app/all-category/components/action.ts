"use server";

import fetcher from "@/lib/fetcher";
import {
  TProductData,
  TProductDetails,
  TProductResponse,
} from "@/types/product.type";
import { revalidatePath } from "next/cache";

// Fetch all products
export const allProducts = async (
  queryString?: string,
): Promise<TProductData | []> => {
  try {
    const response = await fetcher<TProductResponse>(
      `/products?${queryString ?? ""}&per_page=12`,
      {
        cache: "no-store",
      },
    );

    if (!response?.data) {
      console.error("No products found");
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch product details by ID
export const getProductDetails = async (id: string) => {
  try {
    const response = await fetcher<TProductDetails>(`/products/${id}/`);

    if (!response?.data?.product) {
      console.error(`Product with id ${id} not found`);
      return null;
    }

    // Return the raw product as received from the API
    return response.data.product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

export const addOrRemoveWishList = async (product_id: number) => {
  try {
    await fetcher("/favorites/", {
      method: "POST",
      body: JSON.stringify({ product_id }),
    });

    revalidatePath("/all-category");
    return true;
  } catch (error) {
    console.error(`Error toggling product ${product_id} in wishlist:`, error);
    return false;
  }
};

export const addToCart = async (product_id: number, quantity: number) => {
  try {
    const res = await fetcher<{ message: string }>("/add-to-cart/", {
      method: "POST",
      body: JSON.stringify({ product_id, quantity }),
    });

    // Revalidate pages AFTER successful add
    revalidatePath("/all-category");
    revalidatePath("/cart");
    revalidatePath("/", "layout");
    return res;
  } catch (error) {
    console.error(`Error adding product ${product_id} to cart:`, error);
  }
};

// Add this to your ./action file
export async function updateCartQuantity(productId: number, quantity: number) {
  // Implement your API call to update cart quantity here
  // This should be similar to your addToCart function
  const response = await fetch('/api/cart/update-quantity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update quantity');
  }
  
  return response.json();
}