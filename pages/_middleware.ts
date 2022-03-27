import { NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/library"];

export default function middleware(req) {
  if (signedInPages.includes(req.nextUrl.pathname)) {
    const { token } = req.cookies;

    if (!token) {
      return NextResponse.redirect("/auth/signin");
    }
  }
}
