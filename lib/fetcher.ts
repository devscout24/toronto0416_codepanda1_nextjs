"use server";

import { getUserSession } from "./action";

/**
 * Fetcher function for making API requests with minimal error handling.
 * Returns raw response or throws raw error.
 * @param endpoint - API endpoint (without the base URL)
 * @param options - Fetch options
 * @returns Promise with the response data
 */
export async function fetcher<T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  if (!endpoint) {
    throw new Error("Endpoint is required for fetcher");
  }

  // ...existing code...
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;

  // Normalize base URL: ensure it includes a protocol and no trailing slash
  const rawBase = process.env.NEXT_PUBLIC_BASE_API ?? "";
  let base = rawBase.trim();
  if (!base) {
    throw new Error("NEXT_PUBLIC_BASE_API is not set");
  }
  if (!/^https?:\/\//i.test(base)) {
    base = `http://${base}`; // assume http for local IPs; change to https if needed
  }
  base = base.replace(/\/+$/, ""); // remove trailing slashes
  const url = `${base}/${cleanEndpoint}`;

  // Don't add auth header for auth endpoints (normalize comparison)
  const authEndpoints = ["/login", "/register", "/products"];
  const isAuthEndpoint = authEndpoints.includes(cleanEndpoint);
  const accessToken = !isAuthEndpoint ? await getUserSession() : null;

  const defaultOptions: RequestInit = {
    headers: {
      // Only set Content-Type for non-FormData requests
      ...(!(options?.body instanceof FormData) && {
        "Content-Type": "application/json",
      }),
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    cache: "no-store", // ✅ disable all caching by default
    // next: {
    //   revalidate: 60,
    // },
  };

  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options?.headers,
    },
  };

  const response = await fetch(url, fetchOptions);

  // Check if response has content
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  const text = await response.text();

  if (!text) {
    return null as T;
  }

  // If not ok, throw a rich error so frontend can handle it
  if (!response.ok) {
    type ErrorResponse = {
      message?: string;
      detail?: string;
      error?: string;
      code?: string | number;
      [key: string]: unknown;
    };

    let errorData: unknown;
    if (isJson) {
      try {
        errorData = JSON.parse(text);
      } catch {
        errorData = text;
      }
    } else {
      errorData = text;
    }

    // Determine the best error message to surface
    let errorMessage = `Request failed with status ${response.status}`;
    if (errorData && typeof errorData === "object") {
      const err = errorData as ErrorResponse;
      if (err.message) errorMessage = String(err.message);
      else if (err.detail) errorMessage = String(err.detail);
      else if (err.error) errorMessage = String(err.error);
      else if (err.code) errorMessage = `Error code: ${String(err.code)}`;
    } else if (typeof errorData === "string" && errorData.length) {
      errorMessage = errorData;
    }

    // Debug: Log the error details
    console.error("API Error:", errorMessage, errorData);

    class FetcherError extends Error {
      status: number;
      data: unknown;
      constructor(message: string, status: number, data: unknown) {
        super(message);
        this.status = status;
        this.data = data;
      }
    }

    // If the status is 401, you might want to prompt for re-login or token refresh
    if (response.status === 401) {
      // Handle re-login, token refresh, or show a specific message to the user
      console.log("Authentication error - please log in again.");
      // You can redirect to login page or handle token refresh here
    }

    throw new FetcherError(errorMessage, response.status, errorData);
  }

  if (isJson) {
    try {
      return JSON.parse(text) as T;
    } catch {
      return text as T;
    }
  }

  return (text || null) as T;
}

export default fetcher;
