import {
    hederaTestnet
} from "./evm-chains-mainnet";

// Export the native address constant
export const NATIVE_ADDRESS = '0x0000000000000000000000000000000000000000';

// Example contract address for Hedera Testnet (replace with your actual contract address if you have one)
export const contractMainnetAddresses = {
    [hederaTestnet.id]: '0x0000000000000000000000000000000000000000', // Placeholder, as no contract address is provided in the sources
};

// Token interface with optional priceFeed field
export interface Token {
    symbol: string;
    address: string;
    decimals: number;
    priceFeed?: string;
}

export const tokensPerMainnetChain: { [chainId: number]: Token[] } = {
    [hederaTestnet.id]: [
        {
            symbol: 'HBAR',
            address: '0x0000000000000000000000000000000000000000', // Native HBAR
            decimals: 18, // MetaMask requires 18 decimals, even though HBAR has 8
            priceFeed: ''
        }
        // No other token addresses are available in the knowledge sources
    ]
};