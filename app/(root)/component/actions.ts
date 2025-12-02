import fetcher from "@/lib/fetcher";
import { PostalCodeAPIResponse } from "@/types/cart.type";
import { SpecialResponse } from "@/types/product.type";
import { TestimonialApiResponse, TTestimonial } from "@/types/testimonials.type";


export const getWeeklySpecial = async () => {
  try {
    const response = await fetcher<SpecialResponse>(`/weekly-special-products`);

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

export const getBestSelling = async () => {
  try {
    const response = await fetcher<SpecialResponse>(`/best-selling-products`);

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


export type PostalCodeResponse = {
  data: {
    postalCode: string;
    isAvailable: string;
  }[];
};



export const isPostalCodeAvailable = async (postalCode: string): Promise<boolean> => {
  try {
    const response = await fetcher<PostalCodeAPIResponse>(
      `/availability-postal-codes/?q=${encodeURIComponent(postalCode)}`
    );

    if (!response?.data?.available) {
      console.error("Postal code not found");
      return false;
    }

    return response.data.available === "yes";
  } catch (error) {
    console.error("Error checking postal code availability", error);
    return false;
  }
};


export const getReview = async () => {
  try {
    const response = await fetcher<TestimonialApiResponse>(`/recently-viewed-reviews`);

    if (!response?.data) {
      console.error(`No Review here`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching data`, error);
    return null;
  }
};
