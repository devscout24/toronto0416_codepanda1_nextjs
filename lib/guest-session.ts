export const GUEST_SESSION_STORAGE_KEY = "guest_session_id";
export const GUEST_SESSION_COOKIE_KEY = "guest_session_id";
export const GUEST_SESSION_HEADER_KEY = "X-Guest-Session-ID";

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

function setGuestSessionCookie(sessionId: string) {
  if (typeof document === "undefined") {
    return;
  }

  const maxAge = 60 * 60 * 24 * 30;
  document.cookie = `${GUEST_SESSION_COOKIE_KEY}=${encodeURIComponent(sessionId)}; path=/; max-age=${maxAge}; samesite=lax`;
}

function persistGuestSession(sessionId: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(GUEST_SESSION_STORAGE_KEY, sessionId);
  setGuestSessionCookie(sessionId);
}

export async function ensureGuestSessionIdClient(): Promise<string | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const existingSession = window.localStorage.getItem(
    GUEST_SESSION_STORAGE_KEY,
  );
  if (existingSession) {
    setGuestSessionCookie(existingSession);
    return existingSession;
  }

  try {
    const base = normalizeBaseApiUrl(process.env.NEXT_PUBLIC_BASE_API ?? "");
    const response = await fetch(`${base}/init-guest-session/`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as GuestSessionInitResponse;
    const sessionId = data?.session_id ?? null;
    if (!sessionId) {
      return null;
    }

    persistGuestSession(sessionId);
    return sessionId;
  } catch {
    return null;
  }
}

export async function getGuestSessionHeadersClient(): Promise<
  Record<string, string>
> {
  const sessionId = await ensureGuestSessionIdClient();

  if (!sessionId) {
    return {};
  }

  return {
    [GUEST_SESSION_HEADER_KEY]: sessionId,
  };
}
