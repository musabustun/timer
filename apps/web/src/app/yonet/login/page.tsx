import { adminLogin } from '@/actions/auth'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
            <form action={adminLogin} className="w-full max-w-sm space-y-4 p-8 border border-zinc-800 rounded-xl bg-zinc-900">
                <h1 className="text-2xl font-bold text-center">Admin Access</h1>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-zinc-400">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="bg-zinc-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <button className="w-full bg-blue-600 p-2 rounded font-medium hover:bg-blue-500">
                    Login
                </button>
            </form>
        </div>
    )
}
