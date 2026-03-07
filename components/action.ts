import fetcher from "@/lib/fetcher";

export async function addCart({ product_id, quantity }: { product_id: number; quantity: number }) {
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