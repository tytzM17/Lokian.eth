# Lokian.eth: A trading card game dapp featuring NFTs, share, fight and breed mythical creatures in solidity blockchains.

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

## Polygon, Moonriver, Fantom and Avalanche mainnet official addresses
- lokians erc20 deployed to: 0x4d8d24968458af521ef02aefD95f161dF3f9Ea01
- LokianItems erc1155 deployed to: 0x8227767903Fa90A90060E28a45506318E03997aD
- LokianEth deployed to: 0x5148A559cFaaEC1A915ae41e00A8Dd2Fa17ba64f

## BSC mainnet official addresses, visit bsc.lokians.monster
- Lokians erc20 deployed to: 0x7664e0A3862819C48A01648CE5139Ad25dAC12c0
- LokianItems erc1155 deployed to: 0xD2f9F7C2CD1b8e1C91d89F271EF80eBFf75F183C
- LokianEth deployed to: 0x6d88cBBD35E19958eFB4500f93D346c126bB7Df2

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
- Create faucet page for getting nfts or tokens (mvp) 11/9/2021
- Breed then mint, pinJson, payable (mvp) 11/21/2021
- free packs are not nft not payable, basic to advance packs are nfts and payable (mvp) 11/29/2021
- breed mons are nft, payable (mvp) 11/29/2021
- Change contract to accept IERC20 e.g. USDT, instead of native token. For easy price maintenance. (mvp)  12/8/2021
- Create meme token functions (100 trillion, mvp) 12/8/2021
- Fight function extension, earn meme token when you win (mvp) 12/8/2021
- Record highscore function in game contract. 12/16/2021
- Removed memetoken and highscore functions
- Removed buyMon, addForSale, and removeFromSale functions
- Removed startSharing and stopSharing functions
- Remove stable coin as payment.
- Remove NFT pack buying
- Token for duel rewards and donations (mvp) done
- Test token functionalities (mvp) done
- Display token amount on top right
- Fix fight function
- Contract tests, okay
- Create token tab, buy items (ERC1155) and burn functions (mvp)
- Create token tab, your items, buy items, give to skeleton people(burn) UI (mvp)
- UI Tests (mvp)
- Add unit tests (mvp)
- Deploy and test to evm compatible testnet (mvp)
- ERC20 Lokians deployed to polygon mumbai testnet: 0x2683EbB22FE772dB15C09b99897bD38B2Bf2487E
- ERC1155 LokianItems NFT to polygon mumbai testnet: 
0xC924448D65D0b20629eaAD25eE79bC2911E8690a
- Contract Lokian.eth to polygon mumbai testnet: 
0xb1e821c9550463b0d3d2aA4846bE79D6aB5Ec6ea
- Game prototype deployed at https://tytzm17.github.io/Lokian.eth/
- Beta test in testnet (burn FAIL(solution: set gas limit t0 140k or set gas limit in app)), test OK
- Add spinner in breed and sharing mons, remove from sale, add to sale, test OK
- Refactor UI code, remove and clean (mvp)
- fix connect wallet UI (OK) and Token UI buy nft alignment is off (OK)
- Buy domain in cloudfare registrar for site and app(subdomain?) for $5-10 one time
- Host app and site in cloudfare, moralis or gh-pages with ssl or depends on listing requirements, Refactor react code upon hosting (mvp)
- Deploy to evm compatible mainnets, polygon OK and moonbeam (mvp)
- Provide liquidity on dexes first, sushiswap OK , quickswap, or uniswap.
- Submit to dappradar, state of dapps, etc (mvp)

Ongoing
- Add moonriver addresses in lokian.monster site
- List erc20 token in coingecko and gate.io (mvp)
- Create whitepaper/litepaper for gate.io, see report.pdf 

Future
- GameFi, staking
- DAO
- Metaverse, with duels or royal rumble



