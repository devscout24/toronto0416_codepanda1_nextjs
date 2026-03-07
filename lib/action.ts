"use server";

import { cookies } from "next/headers";
import fetcher from "./fetcher";
import { ApiResponse, LoginData } from "@/types/user.type";

export async function signUpUser(values: { 
  email: string; 
  password: string; 
  confirm_password: string 
}) {
    try {
        const response = await fetcher<ApiResponse<LoginData>>("/register", {
            method: "POST",
            body: JSON.stringify(values), // Now sends all three values
        });
        
        if (!response?.data?.access || !response?.data?.refresh) {
            return { error: "Signup failed - no tokens received" };
        }

        const cookieStore = await cookies();
        const isProduction = process.env.NODE_ENV === "production";
        
        cookieStore.set("access_token", response.data.access, {
            httpOnly: true,
            secure: isProduction,
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

        return { message: "Account created successfully!" };
    } catch (error) {
        console.error(error);
        if (error && typeof error === "object" && "message" in error) {
            return { error: (error as { message: string }).message };
        }
        return { error: "Signup failed. Please try again." };
    }
}

export async function loginUser(values: { email: string; password: string }) {
    try {
      const response = await fetcher<ApiResponse<LoginData>>("/login", {
        method: "POST",
        body: JSON.stringify(values),
      });

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

      return response;
    } catch (error) {
        console.error(error);
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

export async function sendResetEmail(email: string): Promise<{ 
  message?: string; 
  error?: string; 
}> {
  try {
    const response = await fetcher<ApiResponse<{ message: string }>>("/forgot-password-request/", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    
    return { message: "Reset email sent successfully!" };
  } catch (error) {
    console.error(error);
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Failed to send reset email. Please try again." };
  }
}

export async function verifyResetCode(email: string, otp: string): Promise<{ 
  message?: string; 
  error?: string; 
  token?: string;
}> {
  try {
    const response = await fetcher<ApiResponse<{ token: string }>>("/verify-reset-code/", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
    
    if (!response?.token) {
      return { error: "Invalid verification code" };
    }

    return { 
      message: "Verification successful!",
      token: response.token 
    };
  } catch (error) {
    console.error(error);
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Verification failed. Please try again." };
  }
}

export async function resetPassword(
  new_password: string, 
  confirm_password: string, 
  token: string
): Promise<{ 
  message?: string; 
  error?: string; 
}> {
  try {
    const response = await fetcher<ApiResponse<{ message: string }>>("/reset-password/", {
      method: "POST",
      body: JSON.stringify({ 
        new_password, 
        confirm_password,
        token 
      }),
    });
    
    return { message: "Password reset successfully!" };
  } catch (error) {
    console.error(error);
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Failed to reset password. Please try again." };
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