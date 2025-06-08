import { NextRequest } from "next/server";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import { connection, getSupportedTokens } from "@/lib/constants";
import { PublicKey } from "@solana/web3.js";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address') as unknown as string;
    const balances = await Promise.all(SUPPORTED_TOKENS.map(tokens => getAccountBalance(tokens, address))

)}

function getAccountBalance(token: {
    name: string;
    mint: string;

}, address: string) {
    const ata = await getAssociatedTokenAddress(new PublicKey(token.mint), new PublicKey(address));
    const account = await getAccount(connection, ata);
}

function getPrice(){

}