"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

// Import WalletMultiButton dynamically to avoid SSR errors
const WalletMultiButtonBase = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export function ConnectWalletButton() {
  const router = useRouter();
  const { connected: isConnected } = useWallet();
  const [wasConnected, setWasConnected] = useState(false);

  // Track connection state changes
  useEffect(() => {
    if (isConnected && !wasConnected) {
      // User just connected their wallet
      router.push("/dashboard");
    } else if (!isConnected && wasConnected) {
      // User just disconnected their wallet
      router.push("/");
    }
    setWasConnected(isConnected);
  }, [isConnected, wasConnected, router]);

  return (
    <div className="wallet-adapter-button-wrapper">
      <WalletMultiButtonBase className="custom-wallet-button" />

      <style jsx global>{`
        .wallet-adapter-button-wrapper .wallet-adapter-button:not([disabled]) {
          background: linear-gradient(to bottom right, #111214, #22242a);
          padding: 13px 20px;
          border-radius: 80px;
          box-shadow: -9.6px -9.6px 19.2px 0px rgba(21, 94, 239, 0.24),
            9.6px 9.6px 19.2px 0px rgba(255, 175, 41, 0.24);
          outline: 2.4px solid #155dee;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          overflow: hidden;
          color: white;
          transition: all 0.2s ease;
        }

        .wallet-adapter-button:hover:not([disabled]) {
          background: linear-gradient(to bottom right, #1a1c20, #2d303a);
        }

        .wallet-adapter-button-trigger {
          background: none !important;
        }
      `}</style>
    </div>
  );
}

export default ConnectWalletButton;
