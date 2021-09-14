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
- Change naming e.g. cryptoMons to creatures..ok..6/28
- Change to 8bit theme for ui..ok..07/02
- Fix ui responsiveness and css, etc..ok..07/14

Ongoing
- Change creature names and artwork from cryptomons to mythical creatures (mvp) ..100%
- Fix wallet connection try multi-wallet with web3modal, (if refreshed, wallet is not connected) (mvp)
- Fix logo, create an 8 bit representaion of the logo (mvp)
- Add token or erc20, for buying of cards, and fees, etc. 
tokenomics 100 billion capped, 45% rewards, 12% creators, 23% infrastructure like landing page,domain name etc.,
20% amm liquidity (mvp)
- All will be NFTs for $39, baba's, doppelganger and skvader are $100 each. Create NFT Shop replace shop. (mvp)
- NFT cards could be glowing aura or glowing eyes (glow colors are based on element type) (mvp) 

- Deploy to matic, bsc, avax, moonbeam or ethereum compatible test networks
- Deploy to matic, bsc, avax, moonbeam or ethereum compatible main networks

- Create landing page, twitter, discord, and tg
- Advertise, submit to dappradar, coingecko, shill in tg's, etc., 

Future Plan
- Add mini game (e.g. mini pet sim, mini pet rpg, etc), take entrance fee(erc20),  untill (25%) rewards are exhausted (feature)

