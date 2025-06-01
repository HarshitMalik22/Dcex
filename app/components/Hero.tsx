"use client"
import { signIn, useSession } from "next-auth/react"
import { SecondaryButton } from "./Button"
import { useRouter } from "next/navigation";

export const Hero = () => {
    const session = useSession();
    const router = useRouter();
    return <div>
        <div className = "text-5xl font-medium">
            <span>
            The Indian Decentralized
            </span> 
            <span className = "text-blue-500 pl-4">
            Exchange
            </span>
        </div>
        <div className ="text-2xl flex justify-center pt-4 items-center text-slate-500">
            Create a frictionless wallet with just a Google Account.
        </div>
        <div className ="text-2xl flex justify-center pt-2 items-center text-slate-500">
            Convert your INR into Cryptocurrency
        </div>
         <div className="flex justify-center pt-8">
            {session.data?.user ? <SecondaryButton onClick={() => {
                router.push("/dashboard");
                }}>Go to Dashboard</SecondaryButton> : <SecondaryButton onClick={() => {
                    signIn("google");
                }}>Login with Google </SecondaryButton>}
        </div>
    </div>
}