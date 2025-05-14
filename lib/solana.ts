import { PublicKey, Connection } from "@solana/web3.js";
import { AnchorProvider, Program, BN, Idl } from "@coral-xyz/anchor";
import { SOLANA_RPC_ENDPOINT } from "./chain";
import idlRaw from "@/target/idl/escrow.json";

// Define interface for IDL
interface BetezenIDL {
  version: string;
  name: string;
  instructions: any[];
  accounts: any[];
  errors?: any[];
  // add other required properties
}

// Import and cast IDL to the correct interface
export const idl = idlRaw as Idl;

// Program ID from IDL
export const PROGRAM_ID = new PublicKey(
  "coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF"
);

// Setup connection
export const connection = new Connection(SOLANA_RPC_ENDPOINT, "confirmed");

// Helper for position direction
export const PositionDirection = {
  Long: { long: {} },
  Short: { short: {} },
};

// Helper for PDA escrow account
export function getEscrowPDA(userPubkey: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("escrow"), userPubkey.toBuffer()],
    PROGRAM_ID
  )[0];
}

// Conversion between SOL and lamports
export function solToLamports(sol: string | number): BN {
  if (!sol) {
    return new BN(0); // Return zero if input is empty.
  }
  return new BN(Math.floor(parseFloat(sol.toString()) * 1_000_000_000));
}

export function lamportsToSol(lamports: number | BN): number {
  const value = typeof lamports === "number" ? lamports : lamports.toNumber();
  return value / 1_000_000_000;
}
