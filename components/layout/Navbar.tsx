"use client";

import Link from "next/link";
import WalletMultiButton from "@/components/ui/connect-wallet-button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Navbar() {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { connection } = useConnection();
  const [walletBalance, setWalletBalance] = useState<number>(0);

  const fetchBalance = async () => {
    if (publicKey) {
      try {
        const balance = await connection.getBalance(publicKey);
        setWalletBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    }
  };

  useEffect(() => {
    fetchBalance();
    const interval = setInterval(() => {
      if (publicKey) {
        fetchBalance();
      }
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [publicKey, connection]);

  return (
    <nav className="bg-[#111213]">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl font-medium text-white flex items-center"
          >
            <img
              src="/logo.png"
              alt="Logo"
              width="32"
              height="32"
              className="mr-2 rounded"
            />
            Betezen.fun
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          {publicKey && (
            <div className="text-white px-4 py-2 bg-[#1d1f22] rounded-xl flex items-center gap-2">
              <span className="text-[#70e000] font-medium">
                {walletBalance.toFixed(4)} SOL
              </span>
            </div>
          )}
          <WalletMultiButton />
        </div>
      </div>
    </nav>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function NavLink({
  href,
  active,
  children,
  text,
}: {
  href: string;
  active: boolean;
  children?: React.ReactNode;
  text?: string;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors hover:text-white ${
        active ? "text-white" : "text-gray-400"
      }`}
    >
      {children || text}
    </Link>
  );
}
