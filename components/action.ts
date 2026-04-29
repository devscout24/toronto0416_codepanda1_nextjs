"use server";

import fetcher from "@/lib/fetcher";

export interface AddressExistenceResponse {
  status: string;
  status_code: number;
  message: string;
  data: AddressExistenceData;
}

export interface AddressExistenceData {
  have_address: "yes" | "no";
}

export async function addCart({
  product_id,
  quantity,
}: {
  product_id: number;
  quantity: number;
}) {
  try {
    const response = await fetcher<{ message: string }>("/cart", {
      method: "POST",
      body: JSON.stringify({ product_id, quantity }),
    });
    return response.message;
  } catch (error) {
    console.error(error);
  }
}

export async function checkIsAddress() {
  try {
    const res = await fetcher<AddressExistenceResponse>("/have-address/");
    return res?.data?.have_address;
  } catch (error) {
    console.error(error);
  }
}
