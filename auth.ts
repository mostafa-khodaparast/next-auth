import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/prisma/db"
import { getUserById } from "@/prisma/util"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    events: {
        async linkAccount({ user }) {           //verify email for users who sign-in with OAuth
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role
            }
            console.log('session:::', session)
            console.log('token::::', token)
            return session
        },

        async jwt({ token }) {
            if (!token.sub) return token
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token
            token.role = existingUser.role
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
})