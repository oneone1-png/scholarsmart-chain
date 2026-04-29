import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("sb-access-token");

  const url = request.nextUrl.clone();

  // ❌ belum login → redirect ke login
  if (!token) {
    if (
      url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/scholarships") ||
      url.pathname.startsWith("/apply") ||
      url.pathname.startsWith("/admin")||
      url.pathname.startsWith("/admin/dashboard")||
      url.pathname.startsWith("/admin/applications")
    ) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();

  
}
