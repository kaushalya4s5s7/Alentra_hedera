import { defineChain } from 'viem'
export const NATIVE_ADDRESS = `0x0000000000000000000000000000000000000000`

export const hederaTestnet = defineChain({
    id: 296,
    name: 'Hedera Testnet',
    nativeCurrency: { decimals: 18, name: 'HBAR', symbol: 'HBAR' },
    rpcUrls: {
        default: { http: ['/api/hashioProxy'] },
    },
    blockExplorers: {
        default: { name: 'HashScan', url: 'https://hashscan.io/testnet' },
    },
})

export const allMainnetChains = [
    hederaTestnet,
]