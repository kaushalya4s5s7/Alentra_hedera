import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';

const hederaTestnet = {
  id: 296,
  name: "Hedera Testnet",
  iconUrl: "https://hedera.com/_nuxt/img/hedera-logo.8b8b6c5.svg", // Optional: Hedera logo
  nativeCurrency: {
    name: "HBAR",
    symbol: "HBAR",
    decimals: 18 // MetaMask requires 18 decimals, even though HBAR has 8
  },
  rpcUrls: {
    default: {
      http: [
        '/api/hashioProxy'
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