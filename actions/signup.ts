"use server"

import { z } from 'zod'
import { SignUpSchema } from '@/schemas'


export async function signUpAction(data: z.infer<typeof SignUpSchema>) {

    //server-side validation
    const validatedFields = SignUpSchema.safeParse(data)

    if (!validatedFields.success) {
        return { error: 'email or password is invalid' }
    }

    return { success: 'sign up successful' }
}