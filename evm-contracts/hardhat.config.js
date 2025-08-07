require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const OPERATOR_KEY = process.env.OPERATOR_KEY;

module.exports = {
  solidity: "0.8.27",
  networks: {
    testnet: {
      url: "https://testnet.hashio.io/api", // Hedera Testnet RPC endpoint
      chainId: 296, // Hedera Testnet chain ID
      accounts: [OPERATOR_KEY], // Your ECDSA private key
    },
  },
};