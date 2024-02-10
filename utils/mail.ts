
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY)


export const sendVerificationEmail = async (email: string, token: string) => {

    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Auth Verify-confirm your email",
            html: `<a href=${confirmLink}>confirm email</a>`
        })
        console.log(data)
        
    } catch (error) {
        console.log('errrrrrror:', error)
        
    }
}