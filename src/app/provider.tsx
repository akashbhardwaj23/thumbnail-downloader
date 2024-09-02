"use client";
import { SessionProvider } from "next-auth/react";
import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
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
