import { Connection } from "@solana/web3.js";

export const SUPPORTED_TOKENS: {
    name: string;
    mint: string;
}  = [{
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    symbol: "USDC",
    // decimals: 6,
    // icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
},
{
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    symbol: "USDT",
    decimals: 6,
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
},
{
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
    decimals: 9,
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
}]

export const connection = new Connection("https://api.mainnet-beta.solana.com");