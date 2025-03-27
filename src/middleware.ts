import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLogged =
    request.cookies.get("admin")?.value === process.env.ADMIN_PASSWORD;
  if (request.nextUrl.pathname.startsWith("/admin") && !isLogged) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"],
};
