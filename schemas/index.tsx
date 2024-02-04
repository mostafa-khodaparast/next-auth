import { z } from 'zod'

export const SignInSchema = z.object({
    email: z.string().email({
        message: 'email is required.'
    }),
    password: z.string().min(1, {
        message: 'password is required'
    })
})

export const SignUpSchema = z.object({
    email: z.string().email({
        message: 'email is required.'
    }),
    password: z.string().min(8, {
        message: 'Minimum 8 characters required'
    }),
    name: z.string().min(1, {
        message: 'name is required'
    })
})