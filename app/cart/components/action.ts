"use server";

import fetcher from "@/lib/fetcher";
import {
  TCartAddress,
  TCartAPIResponse,
  TDeliveryResponse,
} from "@/types/cart.type";
import { OrderResponse } from "@/types/orders.type";
import { revalidatePath } from "next/cache";

export interface DeliveryAvailabilityResponse {
  status: "success" | "error";
  status_code: number;
  message: string;
  data: DeliveryAvailabilityData;
}

export interface DeliveryAvailabilityData {
  delivery_available: boolean;
  available_areas: string[];
}

export async function addAddress(values: {
  address: string;
  is_default: string;
}) {
  try {
    const res = await fetcher<DeliveryAvailabilityResponse>("/add-address/", {
      method: "POST",
      body: JSON.stringify(values),
    });
    // console.log(res, "response from addAddress in action");
    revalidatePath("/account/address-book");
    revalidatePath("/cart/checkout");
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function removeAddress({ address_id }: { address_id: number }) {
  try {
    await fetcher<{ message: string }>(`/update-address/${address_id}/`, {
      method: "DELETE",
    });
    revalidatePath("/account/address-book");
    revalidatePath("/cart/checkout");
  } catch (error) {
    console.error(error);
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Deleting address failed. Please try again." };
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
    revalidatePath("/cart/checkout");
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
    const response = await fetcher<TDeliveryResponse>("/delivery-charge-list/");
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
}

export async function setDefaultOptions({
  select_id,
  order_id,
}: {
  select_id: number;
  order_id: string;
}) {
  try {
    const response = await fetcher<{ status: string; message: string }>(
      "/select-delivery-option/",
      {
        method: "POST",
        body: JSON.stringify({ select_id, order_id }),
      },
    );
    revalidatePath("/cart");
    return response.message;
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
}

export async function createCheckout() {
  try {
    const res = await fetcher<OrderResponse>("/proceed-to-checkout/", {
      method: "POST",
    });
    revalidatePath("/cart");
    return res.status;
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
}

export async function processPay({
  address_id,
  order_id,
}: {
  address_id: number;
  order_id: string;
}) {
  try {
    const res = await fetcher<{ order_id: string }>("/proceed-to-pay/", {
      method: "POST",
      body: JSON.stringify({ address_id, order_id }),
    });
    revalidatePath("/cart");
    return res?.order_id;
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
}

export async function createPayment({
  address_id,
  guest_email,
}: {
  address_id: number;
  guest_email?: string;
}) {
  try {
    const res = await fetcher<{ checkout_url: string }>("/place-order/", {
      method: "POST",
      body: JSON.stringify({ address_id, guest_email }),
    });
    revalidatePath("/cart");
    return res.checkout_url;
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
}