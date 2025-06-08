
import { getServerSession } from "next-auth";
import { ProfileCard } from "../components/ProfileCard";
import { prisma } from "@/app/db"
import { authConfig } from "@/lib/auth"

async function getUserWallet() {
    const session =  await getServerSession(authConfig);
    const userWallet = await prisma.solWallet.findFirst({
        where: {
            userId: session?.user?.uid
        },
        select:{
            publicKey: true
        }
    })
    if (!userWallet){
        return {
            error: "No solana wallet found associated with this account"
        }
    }

    return userWallet
}

export default async function() {
    const userWallet = await getUserWallet();

    if (userWallet.error || !userWallet.publicKey){
        return <>No Solana wallet found</>
    }
    return <div>
        <ProfileCard publicKey={userWallet.publicKey}/>
    </div>
}
