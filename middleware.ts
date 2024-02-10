import NextAuth from "next-auth"
import authConfig from "@/auth.config"

const { auth } = NextAuth(authConfig)

const publicRoutes = [
    '/',
]

const authRoutes = [
    '/sign-in',
    '/sign-up',
]


export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname)
    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")

    if (isApiAuthRoute) return null

    if (isAuthRoutes) {
        if (isLoggedIn) {
            return Response.redirect(new URL('/settings', nextUrl))
        }
        return null
    }

    if (!isLoggedIn && !isPublicRoutes) {
        return Response.redirect(new URL('/sign-in', nextUrl))
    }

    return null
})


export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}