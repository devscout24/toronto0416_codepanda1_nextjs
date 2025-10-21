import fetcher from "@/lib/fetcher";
import { TCartAddress, TCartProduct } from "@/types/cart.type";

export async function addAddress(values: TCartAddress) {
    try {
        await fetcher<{ message: string }>("/addresses", {
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
        const response = await fetcher<{ cartProducts: TCartProduct[] }>("/cart", {
            method: "GET",
        });
        return response.cartProducts;
    } catch (error) {
        console.error("Error fetching Cart:", error);
        return [];
    }
}