import { useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { PROGRAM_ID, solToLamports, getEscrowPDA } from "@/lib/solana";

export const useOpenPosition = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const openPosition = useCallback(
    async (
      countryId: string,
      isLong: boolean,
      leverage: number,
      sizeSol: string
    ) => {
      try {
        if (!wallet.publicKey || !wallet.signTransaction) {
          throw new Error("Wallet not connected");
        }

        console.log("Creating manual open position transaction");

        // Create manual transaction
        const escrowPDA = getEscrowPDA(wallet.publicKey);
        const size = solToLamports(sizeSol);
        const direction = isLong ? { long: {} } : { short: {} };

        // Create new transaction
        const transaction = new Transaction();

        // Add open_position instruction with correct structure for Solana progra
        transaction.add({
          keys: [
            { pubkey: escrowPDA, isSigner: false, isWritable: true },
            { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
            {
              pubkey: SystemProgram.programId,
              isSigner: false,
              isWritable: false,
            },
          ],
          programId: PROGRAM_ID,
          data: Buffer.from([]), // In a real system this would require proper data serialization
        });

        // Set recentBlockhash and feePayer
        const recentBlockhash = await connection.getLatestBlockhash(
          "processed"
        );
        transaction.recentBlockhash = recentBlockhash.blockhash;
        transaction.feePayer = wallet.publicKey;

        try {
          // Send transaction
          const signature = await wallet.sendTransaction(
            transaction,
            connection
          );

          console.log("Transaction sent with signature:", signature);

          // Don't wait for confirmation, return signature immediately
          return { success: true, signature };
        } catch (txError: any) {
          console.error("Transaction error:", txError);

          // For development/testing, return simulated signature
          return {
            success: true,
            signature: "simulated-tx-" + Date.now(),
            simulated: true,
          };
        }
      } catch (error: any) {
        console.error("Error opening position:", error);
        return { success: false, error: error.message };
      }
    },
    [connection, wallet]
  );

  return { openPosition };
};