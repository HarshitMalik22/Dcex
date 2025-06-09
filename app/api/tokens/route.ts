import { NextRequest, NextResponse } from "next/server";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import { connection, getSupportedTokens } from "@/lib/constants";
import { PublicKey } from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address') as unknown as string;
    const supportedTokens = await getSupportedTokens();
    const balances = await Promise.all(supportedTokens.map(token => getAccountBalance(token, address)));
    
    const tokens = supportedTokens.map((token, index) => ({
        ...token,
        totalBalance: balances[index],
        usdBalance: balances[index]*token.price
    }))


    return NextResponse.json({
            tokens,
            totalBalance: tokens.reduce((acc, val) => acc + val.usdBalance, 0)
    })
}

function getAccountBalance(token: {
    name: string;
    mint: string;
    native: boolean;
}, address: string) {
    if (token.native){
        let balance = await connection.getBalance(new PublicKey(address));
        return balance / LAMPORTS_PER_SOL;
    }
    const ata = await getAssociatedTokenAddress(new PublicKey(token.mint), new PublicKey(address));
    const account = await getAccount(connection, ata);
}

function getPrice(){

}