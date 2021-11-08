# Lokian.eth: A trading card game dapp featuring NFT cards, share, fight and breed mythical creatures in solidity blockchains.

<!-- <img src="./screenshots/fighting_tab.png" alt="" width="1000em" height="500em">
 -->
 <img src="./screenshots/project.eth.ss2.png" alt="" width="1000em" height="500em">

***

This project was developed as a module coursework.

Thanks to Stamatis Kourkotas from

**Imperial College London:** MSc in Computing (Software Engineering)<br />
**Module:** Principless of Distributed Ledgers<br />
**Project Description:** Found in included [report](./report.pdf)<br />

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps for deployment and use of our DApp

- Firstly, deploy our smart contract found in src/project.eth.sol. We tested this locally on a private blockchain using [Ganache](https://www.trufflesuite.com/ganache)
- In the main file of our user interface src/App.tsx specify the address where you deployed the contract in the constant CONTRACT_ADDRESS.
- Install the [metamask](https://metamask.io/) extension on your browser to handle your provate blockchain account. The project has been tested with the Chrome and Mozilla browsers.
- In the project directory run:

    **`npm install`** This installs all the necessary dependencies to build our application
    
    **`npm start`** This runs the app in development mode.<br />

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser. You can see all the Creatures owned by the current metamask account and play the game.

## Remaining Tasks

Finished
- Change naming e.g. cryptoMons to creatures 6/28/2021
- Change to 8bit theme for ui 07/02/2021
- Fix ui responsiveness and css, 07/14/2021
- Change creature names and artwork (mvp) 09/13/2021
- Convert frontend to typescript (mvp) 10/10/2021
- Fix wallet, use web3-react and injected connector (mvp) 10/10/2021
- Fix logo, create an 8 bit representation of the logo (mvp) 10/26/2021
- Create erc-1155 smart contract that will mint nfts, tests (mvp) 10/27/2021
    a. see test contract, 0x4C0ad3B895FdA61679E5FCec12824B25f0b0438e
- Create faucet page for getting nfts or tokens (mvp) 11/9/2021

Ongoing
- Change project contract to be an erc-1155 (mvp)
- Breeding calls mint, payable on mainnet (mvp)
- After breed or create mon, just add dynamic/random attributes then upload 
  minted nft to ipfs.
- Create the frontend in pinata or ipfs (mvp)
- Deploy and test to rinkeby or mumbai testnets (mvp)
- Deploy to eth or matic mainnets (mvp)

- Create landing page in ipfs, buy domain name($1-5), tg , twitr channel
- Submit to dappradar, IGOs, marketing/hyping, etc 

Roadmap
- October 2021, Development and Tests..ok
- November 2021, Test and deploy to testnet
- December 2021, Deploy to mainnet, Initial PvP metaVerse
- January 2022, PvP metaVerse test
- February 2022, PvP metaVerse deployment
- March 2022, Moba metaVerse development


