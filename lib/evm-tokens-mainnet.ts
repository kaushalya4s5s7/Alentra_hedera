import {
    hederaTestnet
} from "./evm-chains-mainnet";

// Export the native address constant
export const NATIVE_ADDRESS = '0x0000000000000000000000000000000000000000';

// Example contract address for Hedera Testnet (replace with your actual contract address if you have one)
export const contractMainnetAddresses = {
    [hederaTestnet.id]: '0xd489751254123d74EB91c86CD3B2145Fe878234a', // Placeholder, as no contract address is provided in the sources
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
            // Note: HBAR price feeds on Hedera EVM might not be available via Chainlink
            // Will fallback to CoinGecko API which is more reliable for HBAR
            priceFeed: undefined // No Chainlink price feed available, will use CoinGecko
        },
        // You can add wrapped HBAR or other Hedera-based tokens here if needed
        {
            symbol: 'WHBAR',
            address: '0xb1F616b8134F602c3Bb465fB5b5e6565cCAd37Ed', 
            decimals: 18,
            priceFeed: undefined // Same as HBAR, use CoinGecko
        }
        // Add other Hedera testnet tokens as needed
    ]
};