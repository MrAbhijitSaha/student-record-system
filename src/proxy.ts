import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  // Not logged in
  if (!session) {
    const loginUrl = new URL("/auth/login", request.url);

    loginUrl.searchParams.set(
      "returnTo",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );

    return NextResponse.redirect(loginUrl);
  }

  // Admin routes
  if (pathname.startsWith("/admin") && session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Student routes
  if (pathname.startsWith("/student") && session.user.role !== "student") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Teacher routes
  if (pathname.startsWith("/teacher") && session.user.role !== "teacher") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/teacher/:path*"],
};
