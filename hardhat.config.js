require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();
const polygonScanApi = fs.readFileSync(".polygonScanApi").toString().trim();
const ALCHEMY_URL = fs.readFileSync(".alchemyUrl").toString().trim();

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey]
    },
    matic: {
      url: ALCHEMY_URL,
      accounts: [privateKey],
    },
    moonriver: {
      url: "wss://wss.api.moonriver.moonbeam.network",
      accounts: [privateKey],
    },
    moonbeam: {
      url: 'https://rpc.api.moonbeam.network',
      accounts: [privateKey],	
    },
    bsc: {
      url: 'https://bsc-dataseed2.binance.org',
      accounts: [privateKey],	
    },
    avax: {
      url: 'https://rpc.ankr.com/avalanche	',
      accounts: [privateKey],	
    },
    boba_rinkeby: {
      url: 'https://rinkeby.boba.network',
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: polygonScanApi
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
}