"use server";

import fetcher from "@/lib/fetcher";
import { TCartAddress, TCartAPIResponse } from "@/types/cart.type";
import { revalidatePath } from "next/cache";

export async function addAddress(values: TCartAddress) {
  try {
    await fetcher<{ message: string }>("/add-address/", {
      method: "POST",
      body: JSON.stringify(values),
    });
  } catch (error) {
    console.log(error);
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Adding address failed. Please try again." };
  }
}

export async function getCart() {
  try {
    const response = await fetcher<TCartAPIResponse>("/get-cart-items/", {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error fetching Cart:", error);
    return null;
  }
}

export async function removeCartItem(productIds: number[]) {
  try {
    const response = await fetcher<{ success: string; message: string }>(
      "/remove-from-cart/",
      {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list_of_item_ids: productIds,
        }),
      },
    );
    revalidatePath("/cart");
    return response;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return { success: false, message: "Failed to remove item from cart" };
  }
}

