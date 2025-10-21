import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  console.log("is here any token : ",accessToken)

  if (accessToken) {
  // if (!accessToken) {
    if (
      pathname.startsWith("/account") ||
      pathname.startsWith("/cart")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/cart/:path*"],
};
