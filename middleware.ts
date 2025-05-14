import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes: string[] = [
  "/about",
  "/expertise",
  "/project",
  "/skillset",
  "/experiences",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authUrl = new URL("/auth/login", req.url);

  const token = req.cookies.get("access_token")?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(authUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/about", "/project", "/skillset", "/expertise", "/experiences"],
};
