import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const pathname=req.nextUrl.pathname

    const publicPaths = ["/", "/home", "/login"]
    const isPublic = publicPaths.some(path => pathname.startsWith(path))

    if (!isLoggedIn && !isPublic) {
            return NextResponse.redirect(new URL("/home", req.url))
    }

    if (isLoggedIn && (pathname === "/home" || pathname === "/login")) {
    return NextResponse.redirect(new URL("/", req.url))
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}