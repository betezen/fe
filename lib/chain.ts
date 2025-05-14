import { defineChain } from "viem";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

// export const pharos = defineChain({
//   id: 50002,
//   name: "Pharos",
//   nativeCurrency: {
//     decimals: 18,
//     name: "Ether",
//     symbol: "PHA",
//   },
//   rpcUrls: {
//     default: {
//       http: ["https://devnet.dplabs-internal.com"],
//       webSocket: ["wss://devnet.dplabs-internal.com"],
//     },
//   },
//   blockExplorers: {
//     default: { name: "Explorer", url: "https://pharosscan.xyz" },
//   },
// });

// Default config
export const SOLANA_NETWORK = WalletAdapterNetwork.Devnet;
export const SOLANA_RPC_ENDPOINT = clusterApiUrl(SOLANA_NETWORK);

// if you want to use custom RPC (example from Helius)
// export const SOLANA_RPC_ENDPOINT = 'https://api.devnet.helius-rpc.com/?api-key=YOUR_API_KEY';
