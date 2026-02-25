"use server";

import fetcher from "@/lib/fetcher";

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
