import React from 'react';
import ReactDOM from 'react-dom/client';
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider} from "wagmi";
import { mainnet, bsc, bscTestnet, optimism, avalanche, manta, fantom, base, polygon, arbitrum, arbitrumNova } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

// 2. Create wagmiConfig
const metadata = {
  name: 'Cryptomesh.io',
  description: 'Cryptomesh.io',
  url: 'https://arclaim.com/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const config = defaultWagmiConfig({
  chains: [mainnet, bsc, bscTestnet, optimism, avalanche, manta, fantom, base, polygon, arbitrum, arbitrumNova],
  projectId: 'af2ae927fd014b46837ee1a8d46e9c69',
  metadata,
})

const queryClient = new QueryClient();

AOS.init();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// 3. Create modal
createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId: 'af2ae927fd014b46837ee1a8d46e9c69',
  enableAnalytics: true
})
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
