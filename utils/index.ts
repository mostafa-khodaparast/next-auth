import { db } from "@/prisma/db"
import { getVerificationTokenByEmail } from "@/prisma/util"
import { signIn } from "next-auth/react"   //this function is in client side
import { v4 as uuid } from "uuid"


export const handleLoginProviders = (provider: "google" | "github") => {
    signIn(provider, {
        callbackUrl: '/settings'
    })
}


export const generateVerificationToken = async (email: string) => {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 3600 * 1000)    //expires in 1 hour

    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken
}