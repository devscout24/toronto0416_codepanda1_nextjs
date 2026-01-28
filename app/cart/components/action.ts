"use server";

import fetcher from "@/lib/fetcher";
import {
  TCartAddress,
  TCartAPIResponse,
  TDeliveryResponse,
} from "@/types/cart.type";
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
    return response?.data;
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

export async function quantityUpdate({
  product_id,
  quantity,
}: {
  product_id: number;
  quantity: number;
}) {
  try {
    const response = await fetcher<{ status: string }>("/update-quantity/", {
      method: "POST",
      body: JSON.stringify({ product_id, quantity }),
    });
    revalidatePath("/cart");
    return response;
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
}

export async function applyCoupon({ coupon_code }: { coupon_code: string }) {
  try {
    const response = await fetcher<{ status: string; message: string }>(
      "/apply-coupon/",
      {
        method: "POST",
        body: JSON.stringify({ coupon_code }),
      },
    );
    revalidatePath("/cart");
    return response;
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
}

// to do
export async function setAddressDefault(address_id: number) {
  try {
    const response = await fetcher<{ status: string; message: string }>(
      "/set-default-address/",
      {
        method: "POST",
        body: JSON.stringify({ address_id }),
      },
    );
    revalidatePath("/cart");
    return response;
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
}

export async function getDeliveryOptions() {
  try {
    const response = await fetcher<TDeliveryResponse>(
      "/delivery-options-list/",
    );
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
}

export async function setDefaultOptions(select_id: number) {
  try {
    const response = await fetcher<{ status: string; message: string }>(
      "/select-delivery-option/",
      {
        method: "POST",
        body: JSON.stringify({ select_id }),
      },
    );
    revalidatePath("/cart");
    return response.message;
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
}