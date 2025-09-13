"use server";

import { API_URL } from "@/config/env-config";

export default async function fetcher(endPoint: string, options?: RequestInit) {
  console.log(`Fetching data from API: ${API_URL}/${endPoint}`);
  if (!endPoint) {
    throw new Error("End point is required for fetcher");
  }

  // Ensure the endPoint does not start with a slash
  if (endPoint.startsWith("/")) {
    endPoint = endPoint.slice(1);
  }

  try {
    const response = await fetch(`${API_URL}/${endPoint}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API error: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error(`[fetcher] Failed to fetch: ${error}`);
    throw error;
  }
}
