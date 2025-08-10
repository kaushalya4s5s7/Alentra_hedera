import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';

const hederaTestnet = {
  id: 296,
  name: "Hedera Testnet",
  iconUrl: "https://avatars.githubusercontent.com/u/31002956?s=200&v=4",
  nativeCurrency: {
    name: "HBAR",
    symbol: "HBAR",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: [
        process.env.NEXT_PUBLIC_HEDERA_RPC_URL || '/api/hashioProxy'
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "HashScan",
      url: "https://hashscan.io/testnet"
    }
  }
} as const satisfies Chain;

const config = getDefaultConfig({
    appName: 'Alentra',
    projectId: '23c5e43972b3775ee6ed4f74f3e76efb',
    chains: [hederaTestnet],
});

export { config };