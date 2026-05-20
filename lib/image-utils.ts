/**
 * Constructs a valid image URL from a base URL and image path
 * Handles double slashes and ensures proper URL formatting
 */
export function getImageUrl(
  imagePath?: string | null | FormDataEntryValue,
): string | undefined {
  if (!imagePath || typeof imagePath !== "string") return undefined;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim() ?? "";

  if (!baseUrl) return undefined;

  // Remove trailing slash from base URL
  const cleanBase = baseUrl.replace(/\/+$/, "");

  // Remove leading slash from image path if exists
  const cleanPath = imagePath.replace(/^\/+/, "");

  // If the path looks like a full URL (contains http), return as-is
  if (cleanPath.startsWith("http")) {
    return cleanPath;
  }

  // Construct the final URL
  return `${cleanBase}/${cleanPath}`;
}
