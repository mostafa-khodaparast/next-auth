import { auth, signOut } from "@/auth"


async function SettingsPage() {
    const session = await auth()
    return (
        <div>
            {JSON.stringify(session)}
            <h1>settings page</h1>
            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <button type="submit">sign out</button>
            </form>
        </div>
    )
}

export default SettingsPage