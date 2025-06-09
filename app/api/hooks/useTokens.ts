import { useState } from "react";

interface TokenWithbalance extends TokenDetails {
    balance: string;
    usdBalance: string;
}

export function useTokens(address: string){
    const {tokenBalances, setTokenBalances} = useState<{
        tokenBalance: Number,
        tokens: TokenWithbalance[]
    } | null >(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch(`/api/tokens?address=${address}`)
    .then(res => {
        setTokenBalances(res.data);
        setLoading(false)
        })
    }, [])    
    return{
        loading, tokenBalances
    }
}    