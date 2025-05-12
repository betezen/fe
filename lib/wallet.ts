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

// Define el tipo de props para nuestro componente
interface SolanaWalletProviderProps {
  children: ReactNode;
}

// Crea un componente funcional con tipado correcto
export const SolanaWalletProvider: FC<SolanaWalletProviderProps> = ({
  children,
}) => {
  // Usar devnet para desarrollo
  const network = SOLANA_NETWORK;

  // RPC endpoint para Solana
  const endpoint = useMemo(() => SOLANA_RPC_ENDPOINT, []);

  // Inicializar sólo el adaptador para Phantom
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  // Perbaikan penggunaan React.createElement
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
