import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import React, { FC, ReactNode, useMemo } from "react";

export const SOLANA_NETWORK = WalletAdapterNetwork.Devnet;
export const SOLANA_RPC_ENDPOINT = clusterApiUrl(SOLANA_NETWORK);

// Define the type of props for our component
interface SolanaWalletProviderProps {
  children: ReactNode;
}

// Create a functional component with correct typing
export const SolanaWalletProvider: FC<SolanaWalletProviderProps> = ({
  children,
}) => {
  // Use devnet for development
  const network = SOLANA_NETWORK;

  // Solana RPC endpoint
  const endpoint = useMemo(() => SOLANA_RPC_ENDPOINT, []);

  // Initialize only the Phantom adapter
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  // Fix the use of React.createElement
  return React.createElement(ConnectionProvider, {
    endpoint,
    children: React.createElement(WalletProvider, {
      wallets,
      autoConnect: true,
      children,
    }),
  });
};

export default SolanaWalletProvider;
