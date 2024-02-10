"use server"

import { z } from 'zod'
import { SignUpSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { db } from '@/prisma/db'
import { getUserByEmail } from '@/prisma/util'
import { generateVerificationToken } from '@/utils'


export async function signUpAction(data: z.infer<typeof SignUpSchema>) {

    //server-side validation
    const validatedFields = SignUpSchema.safeParse(data)

    if (!validatedFields.success) {
        return { error: 'email or password is invalid' }
    }

    const { name, email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    //check unique email
    const isUserInDB = await getUserByEmail(email)
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
    const verificationToken = await generateVerificationToken(email)

    return { success: 'verification email sent' }
}