import fetcher from "@/lib/fetcher";
import { TCartAddress, TCartAPIResponse } from "@/types/cart.type";

export async function addAddress(values: TCartAddress) {
    try {
        await fetcher<{ message: string }>("/add-address/", {
            method: "POST",
            body: JSON.stringify(values),
        });
    } catch (error) {
        console.log(error)
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