"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SolanaWalletProvider from "@/lib/wallet";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SolanaWalletProvider>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </QueryClientProvider>
  );
}
