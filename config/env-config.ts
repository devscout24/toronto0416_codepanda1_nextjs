function getEnvVar(key: string, fallback: string): string {
  const value = process.env[key];
  if (!value) {
    console.error(
      `[env-config] Missing environment variable: ${key}. Using fallback: ${fallback}`
    );
    return fallback;
  }
  return value;
}

export const SITE_URL = getEnvVar(
  "NEXT_PUBLIC_SITE_URL",
  "http://localhost:3000"
);

export const API_URL = getEnvVar(
  "NEXT_PUBLIC_API_URL",
  "http://localhost:8000"
);
