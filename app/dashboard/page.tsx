"use client";
import {useSession} from "next-auth/react"
export default function Dashboard() {
    const session = useSession();
    return <div className="pt-8 flex justify-center">
        <div className="max-w-xl bg-white rounded shadow">
            hi there
        </div>
        
    </div>
}
