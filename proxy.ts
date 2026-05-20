import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const guestSessionId = request.cookies.get("guest_session_id")?.value;

  if (pathname.startsWith("/account") && !accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/cart") && !accessToken && !guestSessionId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/account", "/cart/:path*", "/cart"],
};