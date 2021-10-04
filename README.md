# Lokian.eth: A dapp collectible card game featuring mythical creatures nft, farm tokens for defi, will be deployed soon on evm-based networks.

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

- Firstly, deploy our smart contract found in src/contract.sol (project.eth.sol). We tested this localy on a private blockchain using [Ganache](https://www.trufflesuite.com/ganache)
- In the main file of our user interface src/App.js specify the address where you deployed the contract in the constant CONTRACT_ADDRESS.
- Install the [metamask](https://metamask.io/) extension on your browser to handle your provate blockchain account. the project has been tested with the Chrome and Mozilla browsers.
- In the project directory run:

    **`npm install`** This installs all the necessary dependencies to build our application
    
    **`npm start`** This runs the app in development mode.<br />

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser. You can see all the Creatures owned by the current metamask account and play the game.

## Remaining Tasks

Finished
- Change naming e.g. cryptoMons to creatures 6/28
- Change to 8bit theme for ui 07/02
- Fix ui responsiveness and css, 07/14
- Change creature names and artwork (mvp) 09/13

Ongoing
- Convert frontend to typescript (mvp)

- Fix wallet, use web3-react and injected connector (mvp)

- Fix logo, create an 8 bit representaion of the logo (mvp)

- Create NFT Shop replace default shop, that will mint 151 nfts (mvp)

- Test and polish (mvp)

- Add erc20, add tokenomics, token utilities, etc (feature)

- NFT cards could be glowing aura or eyes (feature) 

- Deploy to matic, bsc, moonriver testnets
- Deploy to matic, bsc, moonriver mainnets

- Create landing page, tg ann channel
- Advertise, submit to dappradar, etc. 

