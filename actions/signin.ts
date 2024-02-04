"use server"

import { z } from 'zod'
import { SignInSchema } from '@/schemas'


export async function signInAction(data: z.infer<typeof SignInSchema>) {
    
    //server-side validation
    const validatedFields = SignInSchema.safeParse(data)

     if (!validatedFields.success) {
        return { error: 'email or password is invalid' }
     }

    return { success: 'sign in successful' }
}