import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const pathname = request.nextUrl.pathname;

  const isCategoryPage = pathname === "/category";
  const isItemPage = pathname === "/item";
  const isNewsPage = pathname === "/news";
  const isCarouselPage = pathname === "/carousel";
  const isHomePage = pathname === "/";
  const isLoginPage = pathname === "/login";

  // Kalau akses "/" tapi belum login
  if (isHomePage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isHomePage && role !== "super_user") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kalau akses "/category" tapi belum login
  if (isCategoryPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isCategoryPage && role !== "super_user") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kalau akses "/item" tapi belum login
  if (isItemPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isItemPage && role !== "super_user") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kalau akses "/news" tapi belum login
  if (isNewsPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isNewsPage && role !== "super_user") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kalau akses "/carousel" tapi belum login
  if (isCarouselPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isCarouselPage && role !== "super_user") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kalau sudah login dan buka login lagi
  if (isLoginPage && token && role == "super_user") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
