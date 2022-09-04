require("@nomiclabs/hardhat-ethers");
// require("nomiclabs/hardhat-ethers");

// require("@nomiclabs/hardhat-etherscan");

const fs = require('fs');
// const privateKey = fs.readFileSync(".secret").toString().trim();
// const polygonScanApi = fs.readFileSync(".polygonScanApi").toString().trim();
// const moonScanApi = fs.readFileSync(".moonscanApi").toString().trim();
// const ALCHEMY_URL = fs.readFileSync(".alchemyUrl").toString().trim();
// const bwareLabsNodes =  require("./bwareLabsNodes")
// const moralisNodes = require("./moralisNodes")
// const etherscanKeys = require("./etherscan")
// const AVAX_URL = fs.readFileSync(".avaxUrl").toString().trim();

module.exports = {
  // defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    // mumbai: {
    //   url: "https://rpc-mumbai.maticvigil.com",
    //   accounts: [privateKey]
    // },
    // matic: {
    //   url: ALCHEMY_URL,
    //   accounts: [privateKey],
    // },
    // moonriver: {
    //   url: "https://moonriver.api.onfinality.io/public",
    //   accounts: [privateKey],
    // },
    // moonbeam: {
    //   url: "https://rpc.api.moonbeam.network",
    //   accounts: [privateKey],	
    // },
    // bsc: {
    //   url: moralisNodes?.bscMainnet || "https://bsc-dataseed2.binance.org",
    //   accounts: [privateKey],	
    // },
    // astar: {
    //   url: bwareLabsNodes?.astarMainnet || "https://rpc.astar.network:8545",
    //   accounts: [privateKey],	
    // },
    // avax: {
    //   url: moralisNodes?.avaxMainnet || AVAX_URL,
    //   accounts: [privateKey],	
    // },
    // ftm: {
    //   url: moralisNodes?.ftmMainnet || "https://rpc2.fantom.network	",
    //   accounts: [privateKey],	
    // },
    // boba_rinkeby: {
    //   url: "https://rinkeby.boba.network",
    //   accounts: [privateKey],
    // },
  },
  // etherscan: {
  //   apiKey: {
  //     moonriver: moonScanApi,
  //     polygon: polygonScanApi,
  //     bsc: etherscanKeys.bsc,
  //     avalanche: etherscanKeys.avax,
  //     opera: etherscanKeys.ftm,
  //   }
  // },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}