"use server"

import fetcher from "@/lib/fetcher";
import { SpecialResponse } from "@/types/product.type";
import { TAddressBook, TAddressBookResponse, TUserProfileResponse, TUserResponse } from "@/types/user.type";

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
    const response = await fetcher<TUserResponse>("/address")
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


export const addAddress = async ({body}: {body : TAddressBook }) => {
  try{
    const res = await fetcher<TAddressBookResponse>("/address", {
      method : "POST",
      body: JSON.stringify(body)
    })
    return res.data

  }
  catch(error){
    console.error(error)
  }
}


