import React, {Component} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-bootstrap';

import Web3 from 'web3';    // Library to work with Etherium blockchain
import contrInterface from './interface.json';

const CONTRACT_ADDRESS = '0xf71057AaF6204aFa1D5Abd7F0a1034FcfDC612Be'

//const I = [...Array(151).keys()].map( x => x+".png");

async function getAccounts() {
  //console.log(window.ethereum.enable()); 
  return window.ethereum.enable() // Returns a promise with the account that logged in
}

async function getCards(web3, account) {
  const contr = new web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: account })
  const totalCards = parseInt(await contr.methods.totalCards().call())

  return Promise.all(
    [...Array(totalCards).keys()].map(
      id => contr.methods.cards(id).call()
    )
  )
}

class Cryptomons extends Component{

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      myCards:[],
      otherCards:[]
    };
    this._getAccounts = null;
    this._getCards = null;
  }

  componentDidMount() {
    this._getAccounts = getAccounts().then(
      
      accounts => {
        this._getAccounts = null;
        this._web3 = new Web3(window.ethereum);

        // We only have one element in accounts but we need just the value
        // not the array accounts with the one element.
        // That's why we use accounts[0] instead of accounts.
        this._account = accounts[0];

        // For debug
        //console.log(this._getAccounts);
        //console.log(this._web3);
        //console.log(accounts);
        //console.log(this._account);
        
        this.refreshCards()
      }
    );
    
  }

  componentWillUnmount() {
    if (this._getAccounts) {
      this._getAccounts.cancel();
    }

    if (this._getCards) {
      this._getCards.cancel();
    }
  }

  refreshCards() {
    this._getCards = getCards(this._web3, this._account).then((_cards)=> {
        this._getCards = null;
        this.setState({cards: _cards});
        this.setState({myCards: _cards.filter(card => card.owner.toLowerCase() === this._account)})
        this.setState({otherCards: _cards.filter(card => card.owner.toLowerCase() !== this._account)})
      
      }
    )
  }

  buyCard(id, price) {
    const contr = new this._web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: this._account })
    console.log(contr.options)
    contr.methods.buyCard(id).send({value: price+1}).on('confirmation', () => {
      this.refreshCards();
      this.render();
    })
  }

  render() {

    /*const cards = this.state.cards.map(card =>
      <React.Fragment key={card.id}>
        <figure>
          <img src={require("./sprites/"+(parseInt(card.species)+1)+".png")} alt={card.species} />
          <figcaption>Price: {card.price} | Owner: {card.owner} |
            <button onClick={()=> this.buyCard(card.id, parseInt(card.price))}>Buy</button>
          </figcaption>
        </figure>
      </React.Fragment>
    )*/

    const myCards = this.state.myCards.map(card =>
      <React.Fragment key={card.id}>
        <figure>
          <img src={require("./sprites/"+(parseInt(card.species)+1)+".png")} alt={card.species} />
          <figcaption>Price: {card.price} | Owner: {card.owner} |
            <button onClick={()=> this.buyCard(card.id, parseInt(card.price))}>Buy</button>
          </figcaption>
        </figure>
      </React.Fragment>
    )

    const otherCards = this.state.otherCards.map(card =>
      <React.Fragment key={card.id}>
        <figure>
          <img src={require("./sprites/"+(parseInt(card.species)+1)+".png")} alt={card.species} />
          <figcaption>Price: {card.price} | Owner: {card.owner} |
            <button onClick={()=> this.buyCard(card.id, parseInt(card.price))}>Buy</button>
          </figcaption>
        </figure>
      </React.Fragment>
    )

    return (
      <Tabs defaultActiveKey="myCards" id="uncontrolled-tab-example">
        <Tab eventKey="myCards" title="My Cards">
          {myCards}
        </Tab>
        <Tab eventKey="buyCards" title="Buy Cards">
          {otherCards}
        </Tab>
        <Tab eventKey="breedCards" title="Breed Cards">
        </Tab>
        <Tab eventKey="fight" title="Fight">
        </Tab>
      </Tabs>

    );
  }
}

export default Cryptomons;
