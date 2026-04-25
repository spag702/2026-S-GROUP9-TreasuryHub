"use client"

import { useState } from "react"
import { signIn } from "./actions";

type SkeletonPulseProps = { className?: string }
function SkeletonPulse({ className = "" }: SkeletonPulseProps) {
    return (
        <div className={`animate-pulse rounded bg-white/[0.15] ${className}`} />
    )
}

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
    setLoading(true);
        try {
            const result = await signIn(email, password);
            if (result?.error) {
                setError(result.error);
            }
        } finally {
            setLoading(false);
        }
    }

        if (loading) {
        return (
            <div>
                {/* row 1 - email, password, login button */}
                <div className="mt-5 flex items-center justify-center mb-3 gap-2">
                    <SkeletonPulse className="h-10 w-44" />
                    <SkeletonPulse className="h-10 w-44" />
                    <SkeletonPulse className="h-10 w-20" />
                </div>
                {/* row 2 - "Don't have an account? Register" link */}
                <div className="flex items-center justify-center mb-3 mt-5">
                    <SkeletonPulse className="h-4 w-52" />
                </div>
            </div>
        );
    }
 
    return (
        <div>
            <div className="mt-5 flex items-center justify-center mb-3 gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-white rounded p-2 text-white bg-black-600"
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-white rounded p-2 text-white bg-black-600"
                    placeholder="Password"
                />
                <button
                    onClick={handleSubmit}
                    className="border border-white rounded p-2 text-white hover:bg-white/[0.1]"
                >
                    Login
                </button>
            </div>
            <div className="flex items-center justify-center mb-3 mt-5">
                <a href="/register" className="text-sm text-blue-500 hover:underline">
                    Don&apos;t have an account? Register
                </a>
            </div>
            <div className="flex items-center justify-center mb-3">
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
}
