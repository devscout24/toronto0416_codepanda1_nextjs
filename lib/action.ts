"use server";

import { cookies } from "next/headers";
import fetcher from "./fetcher";
import { ApiResponse, LoginData } from "@/types/user.type";

export async function loginUser(values: { email: string; password: string }) {
    try {
        const response = await fetcher<ApiResponse<LoginData>>("/login", {
            method: "POST",
            body: JSON.stringify(values),
        });
        console.log("Login response:", response);
        
        if (!response?.data?.access || !response?.data?.refresh) {
            return { error: "Login failed - no tokens received" };
        }

        const cookieStore = await cookies();
        const isProduction = process.env.NODE_ENV === "production";
        
        cookieStore.set("access_token", response.data.access, {
            httpOnly: true,
            secure: isProduction, // Only secure in production
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        });
        
        cookieStore.set("refresh_token", response.data.refresh, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        });

        return { message: "Logged in successfully!" };
    } catch (error) {
        console.log(error);
        if (error && typeof error === "object" && "message" in error) {
            return { error: (error as { message: string }).message };
        }
        return { error: "Login failed. Please try again." };
    }
}

export async function getUserSession() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("access_token")?.value;
        return accessToken;
    } catch (error) {
        console.error("Error fetching user session:", error);
        return null;
    }
}

export async function logoutUser() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("access_token");
        cookieStore.delete("refresh_token");
    } catch (error) {
        console.error("Error logging out user:", error);
    }
}