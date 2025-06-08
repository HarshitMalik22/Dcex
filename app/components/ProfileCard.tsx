"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./Button";
import { useState, useEffect } from "react";

export const ProfileCard = ({publicKey}: {publicKey: string}) => {
    const session = useSession();
    const router = useRouter();
    

    if (session.status === "loading"){
        return <div>
            Loading...
        </div>
    }

    if (!session.data?.user){
        router.push("/")
    }
    return <div className="pt-8 flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow w-full p-12">
            <Greeting 
            image={session.data?.user?.image ?? ""} 
            name={session.data?.user?.name ?? ""} 
            />
            <Assets publicKey={publicKey}/>
            {/* {session.data?.user && JSON.stringify(session.data.user)} */}
        </div>
        
    </div>
}

function Assets({publicKey}: {publicKey: string}){
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (copied){
            const timeout = setTimeout(() =>{
                setCopied(false)
            }, 3000)
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [copied])

    return <div className="text-slate-500 mt-4">
        Account assets
        <br />

        <div className="flex justify-between">
            <div>
                
            </div>

            <div>
                <PrimaryButton onClick={() => {
                    navigator.clipboard.writeText(publicKey);
                    setCopied(true);
                }}> {copied ? "Copied" : "Your Wallet Address"}</PrimaryButton>
            </div>
        </div>
    </div>
}
function Greeting({image, name}: {image: string, name: string})
{
    return <div className="flex">
        <img src={image} className="rounded-full w-16 h-16 mr-4" alt={`${name}'s profile picture`}/>
        <div className="text-2xl font-bold ml-4 flex flex-col justify-center">
            Welcome Back, {name}
        </div>
    </div>

}
