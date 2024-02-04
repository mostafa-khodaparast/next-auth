import { signOut } from "@/auth"


async function SettingsPage() {
    return (
        <div>
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