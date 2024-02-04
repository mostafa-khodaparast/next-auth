"use server"

import { z } from 'zod'
import { SignInSchema } from '@/schemas'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'


export async function signInAction(data: z.infer<typeof SignInSchema>) {

    //server-side validation
    const validatedFields = SignInSchema.safeParse(data)

    if (!validatedFields.success) {
        return { error: 'email or password is invalid' }
    }

    //return { success: 'sign in successful' }
    const { email, password } = validatedFields.data

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