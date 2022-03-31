require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();
const polygonScanApi = fs.readFileSync(".polygonScanApi").toString().trim();


module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey]
    }
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
}