import { signIn } from "next-auth/react"   //this function is in client side

export const handleLoginProviders = (provider: "google" | "github") => {
    signIn(provider, {
        callbackUrl: '/settings'
    })
}