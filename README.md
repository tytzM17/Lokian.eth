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
- Fix logo, create an 8 bit representaion of the logo (mvp) 10/26/2021
- Create erc-1155 smart contract that will mint nfts, tests (mvp) 10/27/2021
    a. see test contract, 0x4C0ad3B895FdA61679E5FCec12824B25f0b0438e

Ongoing
- Create faucet page for getting nfts or tokens by entering email (mvp)
- Change project contract to accept erc-1155 (e.g. class Cryptomon is ERC1155Holder, mvp)
- Breeding will be payable and calls safeTransfer from contract owner (mvp)
- Fighting will be sparring only to the contract owner's sparring fighters (mvp, PvP soon)
- Code in every mon's attribute, in nft json file

- Create account in nft marketplaces or deploy an erc1155 contract (mvp)
    a. Total of 148 creatures x 1000 nft mint x $0.12 each
    b. Total of 3 rare creatures (skvader/evee, baba roga, baba yaga) x 100 nft mint x $9.99
    c. Total of 1 Billion GOLD (10**9) fungible token (for future use, e.g. rewards, pvp fees)

- Test and polish (mvp)

- Create the frontend in pinata/ipfs or namecheap (mvp)
- Deploy and test to bsc or rinkeby testnets (mvp)
- Deploy to bsc, matic, eth mainnets (mvp)

- Create landing page in ipfs, buy domain name($10), tg , twittr channel
- Submit to dappradar, IGOs, etc 

Roadmap
- October 2021, Development and Tests
- November 2021, Test and deploy to testnet
- December 2021, Deploy to mainnet
- January 2022, PvP alpha and beta
- February 2022, PvP deployment (In PvP, winner will take the loser's card)
- March 2022, Initial tokenomics
- April 2022, Token Utilities
- May 2022 , MOBA development

