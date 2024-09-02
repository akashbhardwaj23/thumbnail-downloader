"use client";
import { SessionProvider } from "next-auth/react";
import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { CONNECTION_URL } from "./config";

export function Provider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet;

  const wallets = useMemo(
    () => [],

    [network]
  );

  return (
    <SessionProvider>
      <ConnectionProvider endpoint={CONNECTION_URL}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            {children}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SessionProvider>
  );
}
