"use server"

import { z } from 'zod'
import { SignUpSchema } from '@/schemas'
import bcrypt from 'bcrypt'
import { db } from '@/prisma/db'


export async function signUpAction(data: z.infer<typeof SignUpSchema>) {

    //server-side validation
    const validatedFields = SignUpSchema.safeParse(data)

    if (!validatedFields.success) {
        return { error: 'email or password is invalid' }
    }

    const { name, email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    //check unique email
    const isUserInDB = await db.user.findUnique({
        where: {
            email
        }
    })
    if (isUserInDB) return { error: 'This email already exists' }

    //create user in db
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    //todo: send verification token email

    return { success: 'sign up successful' }
}