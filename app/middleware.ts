import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Middleware to check for access token
export async function middleware(req: Request) {
  // Get cookies from the request (await cookies() to resolve promise)
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  // Log the cookies and URL for debugging
  console.log("Cookies:", cookieStore);
  console.log("Access Token:", accessToken);

  // If there's no access token, redirect to the login page
  if (!accessToken) {
    const url = new URL(req.url);
    url.pathname = "/account";  // Redirect to /account page
    url.searchParams.set("login-modal", "login");  // Add query parameter for login modal
    return NextResponse.redirect(url);  // Redirect to login modal
  }

  // If access token exists, continue with the request
  return NextResponse.next();
}

// Specify the paths where the middleware should apply
export const config = {
  matcher: ["/all-category"],  // Apply the middleware only to /all-category route
};
