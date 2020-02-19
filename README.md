# Cryptomons: A DApp Collectible Card Game with a React Front-end.

<img src="./screenshots/fighting_tab.png" alt="alt text" width="200em" height="20em">

This project was developed as a module coursework.

**Imperial College London:** MSc in Computing course
**Module:** Deep Learning
**Project Description:** Found in included [report](./report.pdf)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

***

**Steps for deployment and use of our Cryptomons DApp**

- Firstly, deploy our smart contract found in src/cryptomons.sol. We tested this localy on a private blockchain using [Ganache](https://www.trufflesuite.com/ganache)
- In the main file of our user interface src/App.js specify the address where you deployed the contract in the constant CONTRACT_ADDRESS.
- Install the [metamask](https://metamask.io/) extension on your browser to handle your provate blockchain account. the project has been tested with the Chrome and Mozilla browsers.
- In the project directory run:

    ### `npm install`

    This installs all the necessary dependencies to build our application
    
    ### `npm start`

    Runs the app in development mode.<br />

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser. You can see all the Cryptomons owned by the current metamask account and play the game.
