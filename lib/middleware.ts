import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "./auth";

export async function updateSession(request: NextRequest) {
  // Define public paths that don't require authentication
  const publicPaths = ["/auth/login", "/api/auth/login", "/api/auth/logout"];

  // Define admin-only paths
  const adminPaths = ["/admin"];
  const isAdminPath = adminPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Get current user
  const user = await getCurrentUser();

  // If user is not authenticated and trying to access a protected route
  if (!user && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // If user is authenticated and trying to access auth pages, redirect to home
  if (user && isPublicPath && request.nextUrl.pathname !== "/api/auth/logout") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Check admin access for admin routes
  if (user && isAdminPath && user.role !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
