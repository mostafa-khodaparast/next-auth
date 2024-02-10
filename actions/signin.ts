"use server"

import { z } from 'zod'
import { SignInSchema } from '@/schemas'
import { signIn } from '@/auth'                  //this function is used only in server  side
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/prisma/util'
import { generateVerificationToken } from '@/utils'


export async function signInAction(data: z.infer<typeof SignInSchema>) {

    //server-side validation
    const validatedFields = SignInSchema.safeParse(data)

    if (!validatedFields.success) {
        return { error: 'email or password is invalid' }
    }

    //return { success: 'sign in successful' }
    const { email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        return { success: "verification email sent" }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: '/settings'
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" }
                default:
                    return { error: "something went wrong.Try later" }
            }
        }
        throw error
    }
}