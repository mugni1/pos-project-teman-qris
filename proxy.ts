import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const pathname = request.nextUrl.pathname;
  const isHomePage = pathname === "/";
  const isLoginPage = pathname === "/login";

  // Kalau akses "/" tapi belum login
  if (isHomePage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Kalau akses "/" tapi bukan super_user
  if (isHomePage && role !== "super_user") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kalau sudah login dan buka login lagi
  if (isLoginPage && token && role == "super_user") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
