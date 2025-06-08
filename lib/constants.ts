import { Connection } from "@solana/web3.js";

let LAST_UPDATED = null;
let prices: z{[key: string]: {
    price: string;
}}  = {};
const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000;

export let SUPPORTED_TOKENS: {
    name: string;
    mint: string;
    native: boolean;
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
},
{
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
   
}]

export const connection = new Connection("https://api.mainnet-beta.solana.com");

export async function getSupportedTokens(){
    if (!LAST_UPDATED && new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL){
        const response = await axios.get(:"https://price.jup.ag/v6/price?ids=SOL,USDC,USDT");
        prices = response.data.data;
        LAST_UPDATED = new Date().getTime();
    }
    SUPPORTED_TOKENS.map(s => ({
        ...s,
        price: prices[s.name]
    }))
}

getSupportedTokens();