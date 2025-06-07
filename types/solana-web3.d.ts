declare module '@solana/web3.js' {
  export class Keypair {
    static generate(): Keypair;
    publicKey: {
      toBase58(): string;
    };
    secretKey: Uint8Array;
  }
} 