"use client"
import { signIn, signOut, useSession} from "next-auth/react";
import { PrimaryButton } from "./Button";
export const Appbar = () => {
    const session = useSession();
    return <div className = "border-b px-2 flex justify-between">
        <div>
            DCEX
        </div>
        <div>
            {session.data?.user ? <PrimaryButton onClick={() => {
                signOut()
            }}>Logout</PrimaryButton>: <PrimaryButton onClick={() => {
                signIn()
            }}>SignIn</PrimaryButton>}
        </div>
    </div>

}