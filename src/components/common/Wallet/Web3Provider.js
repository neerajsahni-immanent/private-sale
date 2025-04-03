'use client'
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, haqqTestedge2 } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(),
      [haqqTestedge2.id]:http(),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_PROJECT_ID,

    // Required App Info
    appName: "Launhcpad",

    // Optional App Info
    appDescription: "Launhcpad",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

