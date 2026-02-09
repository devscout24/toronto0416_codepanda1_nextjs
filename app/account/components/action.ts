"use server";

import fetcher from "@/lib/fetcher";
import { SpecialResponse } from "@/types/product.type";
import {
  TAddressBook,
  TAddressBookResponse,
  TDeliveryOptionResponse,
  TUserAccount,
  TUserProfileResponse,
  TUserResponse,
} from "@/types/user.type";
import { revalidatePath } from "next/cache";

export const getFavoriteList = async () => {
  try {
    const response = await fetcher<SpecialResponse>(`/favorites/`);

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

export const getAccountInfo = async () => {
  try {
    const response = await fetcher<TUserProfileResponse>("/my-account/");
    if (!response?.data) {
      console.error(`Account Info not found`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching Account Info`, error);
    return null;
  }
};

export const getProfileInfo = async () => {
  try {
    const response = await fetcher<TUserResponse>("/my-profile/");
    if (!response?.data) {
      console.error(`Account Info not found`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching Account Info`, error);
    return null;
  }
};

export const updateProfileInfo = async (
  updatedData: Omit<TUserAccount, "profile_image">,
  profileImage?: File | null,
) => {
  try {
    const formData = new FormData();

    formData.append("name", updatedData.name);
    formData.append("phone", updatedData.phone);
    formData.append("country", updatedData.country);
    if (updatedData.email) {
      formData.append("email", updatedData.email);
    }

    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    const response = await fetcher<TUserResponse>("/my-profile/", {
      method: "PUT",
      body: formData,
    });

    if (!response?.data) {
      console.error("Account Info not updated");
      return null;
    }
    revalidatePath("/account");

    return response.data;
  } catch (error) {
    console.error("Error updating Account Info", error);
    return null;
  }
};

export const getAddressBook = async () => {
  try {
    const response = await fetcher<TAddressBookResponse>("/address-list/");
    if (!response?.data) {
      console.error(`Account Info not found`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching Account Info`, error);
    return null;
  }
};

export const getDefaultAddress = async () => {
  try {
    const response = await fetcher<TAddressBookResponse>(
      "/get-default-address/",
    );
    if (!response?.data) {
      console.error(`default address not found`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching Account Info`, error);
    return null;
  }
};

export const getDefaultDeliveryOption = async () => {
  try {
    const response = await fetcher<TDeliveryOptionResponse>( // Fix: use TDeliveryOptionResponse, not TDeliveryResponse
      "/get-selected-delivery-option/",
    );
    if (!response?.data) {
      console.error(`default delivery option not found`);
      return null;
    }
    return response.data; // This is already a single TDeliveryOption
  } catch (error) {
    console.error(`Error fetching Account Info`, error);
    return null;
  }
};

export const setDefaultAddress = async (addressId: number) => {
  try {
    const response = await fetcher<{ status: string; message: string }>(
      `/address/${addressId}/set-default/`,
      { method: "PUT" }, // Explicitly specify PUT method
    );
    revalidatePath("/cart/checkout");
    return response.message;
  } catch (error) {
    console.error("Error setting default address:", error);
    return null;
  }
};

export const addAddress = async ({ body }: { body: TAddressBook }) => {
  try {
    const res = await fetcher<TAddressBookResponse>("/add-address/", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSingleAddress = async (addressId: number) => {
  try {
    const response = await fetcher<TAddressBookResponse>(
      `/get-address-by-id/${addressId}/`,
    );
    if (!response?.data) {
      console.error(`default address not found`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching Account Info`, error);
    return null;
  }
};

export const updateAddress = async ({
  addressId,
  body,
}: {
  addressId: number;
  body: Partial<TAddressBook>;
}) => {
  try {
    const res = await fetcher<TAddressBookResponse>(
      `/update-address/${addressId}/`,
      {
        method: "PUT",
        body: JSON.stringify(body),
      },
    );
    revalidatePath("/account/address-book");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};