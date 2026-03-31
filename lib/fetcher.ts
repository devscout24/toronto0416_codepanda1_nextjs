"use server";

import { cookies } from "next/headers";

const GUEST_SESSION_COOKIE_KEY = "guest_session_id";
const GUEST_SESSION_HEADER_KEY = "X-Guest-Session-ID";

type GuestSessionInitResponse = {
  status?: string;
  status_code?: number;
  session_id?: string;
  message?: string;
};

function normalizeBaseApiUrl(rawBase: string): string {
  let base = rawBase.trim();

  if (!base) {
    throw new Error("NEXT_PUBLIC_BASE_API is not set");
  }

  if (!/^https?:\/\//i.test(base)) {
    base = `http://${base}`;
  }

  return base.replace(/\/+$/, "");
}

async function initGuestSession(baseUrl: string): Promise<string | null> {
  try {
    const response = await fetch(`${baseUrl}/init-guest-session/`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as GuestSessionInitResponse;
    return data?.session_id ?? null;
  } catch {
    return null;
  }
}

async function getServerGuestSessionId(
  baseUrl: string,
): Promise<string | null> {
  const cookieStore = await cookies();

  const existingGuestSession =
    cookieStore.get(GUEST_SESSION_COOKIE_KEY)?.value ?? null;
  if (existingGuestSession) {
    return existingGuestSession;
  }

  const accessToken = cookieStore.get("access_token")?.value;
  if (accessToken) {
    return null;
  }

  const createdGuestSession = await initGuestSession(baseUrl);
  if (!createdGuestSession) {
    return null;
  }

  try {
    cookieStore.set(GUEST_SESSION_COOKIE_KEY, createdGuestSession, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch {
    // cookies can be read-only in some server rendering paths; header still works for this request
  }

  return createdGuestSession;
}

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
  const base = normalizeBaseApiUrl(process.env.NEXT_PUBLIC_BASE_API ?? "");
  const url = `${base}/${cleanEndpoint}`;

  // Don't add auth header for auth endpoints (normalize comparison)
  const authEndpoints = ["login", "register", "products"];
  const normalizedEndpoint = cleanEndpoint.replace(/\/+$/, "");
  const isAuthEndpoint = authEndpoints.includes(normalizedEndpoint);

  const cookieStore = await cookies();
  const accessToken = !isAuthEndpoint
    ? (cookieStore.get("access_token")?.value ?? null)
    : null;
  const guestSessionId = !accessToken
    ? await getServerGuestSessionId(base)
    : null;

  const defaultOptions: RequestInit = {
    headers: {
      // Only set Content-Type for non-FormData requests
      ...(!(options?.body instanceof FormData) && {
        "Content-Type": "application/json",
      }),
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...(guestSessionId && {
        [GUEST_SESSION_HEADER_KEY]: guestSessionId,
      }),
    },
    cache: "no-cache", // ✅ disable all caching by default
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
      console.log("Authentication error - please log in again.");
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
