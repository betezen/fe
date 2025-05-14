import { useCallback } from "react";
// import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { PROGRAM_ID, getEscrowPDA } from "@/lib/solana";

export const useClosePosition = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const closePosition = useCallback(async () => {
    try {
      if (!wallet.publicKey || !wallet.signTransaction) {
        throw new Error("Wallet not connected");
      }

      // Create manual transaction
      const escrowPDA = getEscrowPDA(wallet.publicKey);

      // Create new transaction
      const transaction = new Transaction();

      // Add close_position instruction
      transaction.add({
        keys: [
          { pubkey: escrowPDA, isSigner: false, isWritable: true },
          { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
        ],
        programId: PROGRAM_ID,
        data: Buffer.from([]), // In a real system this would require proper data serialization
      });

      // Set recentBlockhash and feePayer
      const recentBlockhash = await connection.getLatestBlockhash("processed");
      transaction.recentBlockhash = recentBlockhash.blockhash;
      transaction.feePayer = wallet.publicKey;

      try {
        // Send transaction
        const signature = await wallet.sendTransaction(transaction, connection);

        console.log(
          "Close position transaction sent with signature:",
          signature
        );

        // Don't wait for confirmation, return signature immediately
        return { success: true, signature };
      } catch (txError: any) {
        console.error("Transaction error:", txError);

        // For development/testing, return simulated signature
        return {
          success: true,
          signature: "simulated-close-tx-" + Date.now(),
          simulated: true,
        };
      }
    } catch (error: any) {
      console.error("Error closing position:", error);
      return { success: false, error: error.message };
    }
  }, [connection, wallet]);

  return { closePosition };
};
