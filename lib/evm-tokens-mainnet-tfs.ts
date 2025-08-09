import {
    hederaTestnet
} from "./evm-chains-mainnet"; // Make sure this file exports hederaTestnet

// Export the native address constant
export const NATIVE_ADDRESS = '0x0000000000000000000000000000000000000000';

// Add the contract address for Hedera Testnet (replace with your actual contract address if available)
export const contractMainnetAddresses = {
    [hederaTestnet.id]: '0xd489751254123d74EB91c86CD3B2145Fe878234a', // Replace with your deployed contract address
};

export const SecurecontractMainnetAddresses = {
    [hederaTestnet.id]: '0xe7F03Fd0a14c38831dEcA1DE68D7C5D057083bE1', // Replace with your deployed contract address
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
            decimals: 18,
            priceFeed: ''
        },
       
    ]
};