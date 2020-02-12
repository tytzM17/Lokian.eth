import React, {Component} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab, Tabs} from 'react-bootstrap';
import StatBar from './StatBar'

import Web3 from 'web3';    // Library to work with Etherium blockchain
import contrInterface from './interface.json';

const CONTRACT_ADDRESS = '0xd1e131032CD17A749eb97166F2Cb92F0e77915A0'

//const I = [...Array(151).keys()].map( x => x+".png");

async function getAccounts() {
  //console.log(window.ethereum.enable()); 
  return window.ethereum.enable() // Returns a promise with the account that logged in
}

async function getMons(web3, account) {
  const contr = new web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: account })
  const totalMons = parseInt(await contr.methods.totalMons().call())

  return Promise.all(
    [...Array(totalMons).keys()].map(
      id => contr.methods.mons(id).call()
    )
  )
}

class Cryptomons extends Component{

  constructor(props) {
    super(props);
    this.state = {
      cryptomons: [],
      myCryptomons:[],
      otherCryptomons:[],
      value: 0,             // Used in My Cryptomons tab for input in price text

      breedchoice1: null,   // Used in breeding tab
      breedchoice2: null,   // Used in breeding tab
    };
    this._getAccounts = null;
    this._getMons = null;

    this.handleChange = this.handleChange.bind(this);
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
        
        this.refreshMons()
      }
    );
    
  }

  componentWillUnmount() {
    if (this._getAccounts) {
      this._getAccounts.cancel();
    }

    if (this._getMons) {
      this._getMons.cancel();
    }
  }

  refreshMons() {
    this._getMons = getMons(this._web3, this._account).then((_mons)=> {
        this._getMons = null;
        this.setState({cryptomons: _mons});
        this.setState({myCryptomons: _mons.filter(mon => mon.owner.toLowerCase() === this._account)})
        this.setState({otherCryptomons: _mons.filter( mon =>
          (mon.owner.toLowerCase() !== this._account) && (mon.forSale) 
        )})
      }
    )
  }

  buyMon(id, price) {
    const contr = new this._web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: this._account })
    contr.methods.buyMon(id).send({value: price+1}).on('confirmation', () => {
      this.refreshMons();
    })
  }

  addForSale(id, price) {
    const contr = new this._web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: this._account })
    console.log(price)
    contr.methods.addForSale(id, price+"").send().on('confirmation', () => {
      this.refreshMons();
    })
  }

  removeFromSale(id) {
    const contr = new this._web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: this._account })
    contr.methods.removeFromSale(id).send().on('confirmation', () => {
      this.refreshMons();
    })
  }

  breedMons(id1, id2){
    const contr = new this._web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: this._account })
    contr.methods.breedMons(id1, id2).send().on('confirmation', () => {
      this.refreshMons();
    })
  }

  handleChange(id, event) {
    this.setState({value: event.target.value});
    //console.log(this.state.value[id], event.target.value)
  }

  render() {

    var imgDiv = (mon) => {
      return <div class="monBox"> <img class="monImg" src={require("./sprites/"+(parseInt(mon.species)+1)+".png")} alt={mon.species} /></div>
    }

    var statDiv = (mon) => {
      return (<div class="stat-area">
        <div class="stat-line"><label class="stat-label">Hp: </label><StatBar percentage={mon.hp*100/140} /></div>
        <div class="stat-line"><label class="stat-label">Attack: </label><StatBar percentage={mon.atk*100/140} /></div>
        <div class="stat-line"><label class="stat-label">Defense: </label><StatBar percentage={mon.def*100/140} /></div>
        <div class="stat-line"><label class="stat-label">Speed: </label><StatBar percentage={mon.speed*100/140} /></div>
      </div>)
    }

    // Create the div with add for sale button
    var addForSaleDiv = (mon) => {
      return (<div class="selling-area">
        <label class="add-for-sale-label">Set cryptomons price to:</label>
        <input type="number" class="add-for-sale-input" value={this.state.value} onChange={(e) => this.handleChange(mon.id, e)} />
        <button class="add-for-sale-btn" onClick={()=> this.addForSale(mon.id, this.state.value)}>Add for sale</button>
      </div>)
    }

    // Create the div with remove from sale button
    var removeFromSaleDiv = (mon) => {
      return (<div class="selling-area">
        <label class="add-for-sale-label">Price: {mon.price}</label>
        <button class="add-for-sale-btn" onClick={()=> this.removeFromSale(mon.id)}>Remove from sale</button>
      </div>)
    }

    var buyDiv = (mon) =>{
      return( <div class="selling-area">
        <label class="sale-price">Price: {mon.price} </label>
        <label class="sale-owner">Cryptomon Owner: {mon.owner} </label>
        <button class="sale-btn" onClick={()=> this.buyMon(mon.id, mon.price)}>Buy</button>
      </div>)
    }

    const myCryptomons = this.state.myCryptomons.filter( mon => (!mon.forSale)).map(mon =>
      <React.Fragment key={mon.id}>
        <div class="myMon">
          <figure class="my-figure">
            {imgDiv(mon)}
            <figcaption>
              {statDiv(mon)}
            </figcaption>
          </figure>
          {addForSaleDiv(mon)}
        </div>
      </React.Fragment>
    )

    const forSale = this.state.myCryptomons.filter( mon => (mon.forSale)).map(mon =>
      <React.Fragment key={mon.id}>
        <div class="myMon">
          <figure class="my-figure">
            {imgDiv(mon)}
            <figcaption>
              {statDiv(mon)}
            </figcaption>
          </figure>
          {removeFromSaleDiv(mon)}
        </div>
      </React.Fragment>
    )

    const otherCryptomons = this.state.otherCryptomons.map(mon =>
      <React.Fragment key={mon.id} >
        <div class="myMon">
          <figure class="my-figure">
            {imgDiv(mon)}
            <figcaption>
              {statDiv(mon)}
            </figcaption>
          </figure>
          {buyDiv(mon)}
        </div>
      </React.Fragment>
    )

    const forBreedCryptomons = this.state.myCryptomons.filter( mon => (!mon.forSale)).map(mon =>
      <React.Fragment key={mon.id}>
        <figure class="breedMon">
          {imgDiv(mon)}
          <figcaption>
            {statDiv(mon)}
            <button onClick={()=> {
              this.setState({breedchoice1: mon.id});
            }} >Breed 1</button>
            <button onClick={()=> {
              this.setState({breedchoice2: mon.id});
            }} >Breed 2</button>
          </figcaption>
        </figure>
      </React.Fragment>
    )

    return (
      <Tabs defaultActiveKey="myCryptomons" id="uncontrolled-tab-example">
        <Tab eventKey="myCryptomons" title="My Cryptomons">
          {myCryptomons}
        </Tab>
        <Tab eventKey="forSale" title="For sale">
          {forSale}
        </Tab>
        <Tab eventKey="buyCryptomons" title="Buy Cryptomons">
          {otherCryptomons}
        </Tab>
        <Tab eventKey="breedCryptomons" title="Breed Cryptomons">
          <button onClick={()=> this.breedMons(this.state.breedchoice1, this.state.breedchoice2)}>Breed choosen cryptomons</button>
          <div>
            {this.state.cryptomons.filter( mon => (mon.id === this.state.breedchoice1)).map(mon => mon.id)}
            {this.state.cryptomons.filter( mon => (mon.id === this.state.breedchoice2)).map(mon => mon.id)}
          </div>
          {forBreedCryptomons}
        </Tab>
        <Tab eventKey="fight" title="Fight">
          
        </Tab>
      </Tabs>

    );
  }
}

export default Cryptomons;
