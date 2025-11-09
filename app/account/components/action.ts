import fetcher from "@/lib/fetcher";
import { SpecialResponse } from "@/types/product.type";
import { TAddressBookResponse, TUserProfileResponse, TUserResponse } from "@/types/user.type";

export const getFavoriteList = async () => {
  try {
    const response = await fetcher<SpecialResponse>(`/favorites`);

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
    const response = await fetcher<TUserProfileResponse>("/my-account")
    if (!response?.data) {
      console.error(`Account Info not found`);
      return null;
    }
    return response.data;
  }catch (error) {
    console.error(`Error fetching Account Info`, error);
    return null;
  }
}

export const getProfileInfo = async () => {
  try {
    const response = await fetcher<TUserResponse>("/my-profile")
    if (!response?.data) {
      console.error(`Account Info not found`);
      return null;
    }
    return response.data;
  }catch (error) {
    console.error(`Error fetching Account Info`, error);
    return null;
  }
}

export const getAddressBook = async () => {
  try {
    const response = await fetcher<TAddressBookResponse>("/address")
    if (!response?.data) {
      console.error(`Account Info not found`);
      return null;
    }
    return response.data;
  }catch (error) {
    console.error(`Error fetching Account Info`, error);
    return null;
  }
}