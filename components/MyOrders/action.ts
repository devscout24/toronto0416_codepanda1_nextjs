"use server";

import fetcher from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  try {
    const res = await fetcher<{ message: string }>(
      `/create-reviews/${formData.get("id")}/`,
      {
        method: "POST",
        body: formData,
      },
    );
    return res.message;
  } catch (error) {
    console.error(error);
  }
}

export async function cancelOrder(id: string) {
  try {
    const res = await fetcher<{ status: string }>(`/cancel-order/${id}/`, {
      method: "PATCH",
    });
    revalidatePath("/account/my-orders/[id]");
    revalidatePath("/account/my-orders");
    revalidatePath("/account");
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}