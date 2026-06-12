import { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(
  request: NextRequest,
) {
  const token =
    request.cookies.get(
      "accessToken",
    )?.value;

  const isLoginPage =
    request.nextUrl.pathname ===
    "/login";

  if (
    !token &&
    !isLoginPage
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url,
      ),
    );
  }

  if (
    token &&
    isLoginPage
  ) {
    return NextResponse.redirect(
      new URL(
        "/dashboard",
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
  ],
};