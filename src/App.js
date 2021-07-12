/* global BigInt */
import React, { Component } from 'react';
import './App.css';

import ReactTooltip from "react-tooltip";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs } from 'react-bootstrap';
import StatBar from './StatBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Web3 from 'web3';    // Library to work with Etherium blockchain
import contrInterface from './interface.json'; // Load contract json file

// Load all the background images for the 10 different Cryptomon types
import bg0 from './sprites/background/0.png';
import bg1 from './sprites/background/1.png';
import bg2 from './sprites/background/2.png';
import bg3 from './sprites/background/3.png';
import bg4 from './sprites/background/4.png';
import bg5 from './sprites/background/5.png';
import bg6 from './sprites/background/6.png';
import bg7 from './sprites/background/7.png';
import bg8 from './sprites/background/8.png';
import bg9 from './sprites/background/9.png';
import bg10 from './sprites/background/10.png';

// The contact deployment address in Etherium blockchain
// win-10-workstation-ganache-contract-address
const CONTRACT_ADDRESS = '0x373aD6Ce154C45aE99F2Fdcb61Ed02d514C9eF44'
// babaylan.eth.sol contract address ganache
// const CONTRACT_ADDRESS = "0x8B2d7e694398f820E038383B68341f737040bA42";

// Add background images in an array for easy access
const bg = [bg0, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];

// Add all 151 Cryptomon names in an array
const names = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 
'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 
'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 
'Sandshrew', 'Sandslash', 'Nidoran_f', 'Nidorina', 'Nidoqueen', 'Nidoran_m', 'Nidorino', 'Nidoking', 
'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 
'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian',
 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 
 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel',
  'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 
  'Magnemite', 'Magneton', 'Farfetch_d', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 
  'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 
  'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung',
   'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra',
    'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr_mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 
    'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 
    'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 
    'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mew', 'Mewtwo'];



async function getAccounts() {
  let web3 = new Web3(window.ethereum);

  web3.setProvider('http://localhost:7545');

  return await web3.eth.getAccounts() // Returns a promise with the account that logged in
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

async function onClickConnect(that) {
  that._web3 = new Web3(window.ethereum);
  that._web3.setProvider('http://localhost:7545');

  // change btn text to show 'Connect Wallet'
  // refresh
  try {

    // Will open the MetaMask UI
    // You should disable this button while the request is pending!

    // if we have an account then logout/disconnect or account = null
    if (that._account) {
      that._account = null;
      that.setState({ connectBtnTxt: "Connect Wallet" })
    } else {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      const shortenAccount = `${account?.toString().slice(0, 5)}...${account?.toString().slice(account.toString().length - 5)}` || "Connect Wallet"
      that.setState({ connectBtnTxt: shortenAccount });
      that._account = account?.toString() || "";
    }


    that.refreshMons();
  } catch (error) {
    console.error(error);
  }
};

class Cryptomons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cryptomons: [],
      myCryptomons: [],
      otherCryptomons: [],
      value: 0,             // Used in My Cryptomons tab for input in price text

      breedChoice1: null,   // Used in breeding tab
      breedChoice2: null,   // Used in breeding tab

      fightChoice1: null,   // Used in fighting tab
      fightChoice2: null,   // Used in fighting tab

      winner: null,         // Used to display winner of the last fight
      rounds: null,         // Used to display number of rounds the fight lasted

      shareId: "",          // Used in shareId form input field
      shareAddress: "",      // Used in shareAddress form input field

      connectBtnTxt: 'Connect Wallet'

    };

    this._getAccounts = null;
    this._getMons = null;


    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    // let web3 = new Web3('ws://localhost:7545');

    // Web3.setProvider('ws://localhost:8546');
    // this._getAccounts = getAccounts().then(
    //   accounts => {
    //     this._getAccounts = null;
    //     this._web3 = new Web3(window.ethereum);
    //     this._web3.setProvider('http://localhost:7545');

    //     // We only have one element in accounts but we need just the value
    //     // not the array accounts with the one element.
    //     // That's why we use accounts[0] instead of accounts.
    //     this._account = accounts[0];

    //     this.refreshMons()
    //   }
    // );

    if (window.ethereum) {
      // use MetaMask's provider
      this._web3 = new Web3(window.ethereum);
      this._web3.setProvider('http://localhost:7545');

      window.ethereum.enable(); // get permission to access accounts

      // detect Metamask account change
      window.ethereum.on('accountsChanged', (accounts) => {
        alert('Account Changed', accounts[0]);
        if (this._account) this._account = null;
        this.setState({ connectBtnTxt: "Connect Wallet" });
        this.refreshMons();

      });

      // detect Network account change
      window.ethereum.on('networkChanged', (networkId) => {
        alert('Network Changed', networkId);
        if (this._account) this._account = null;
        this.setState({ connectBtnTxt: "Connect Wallet" });
        this.refreshMons();
      });


    }
  }

  componentWillUnmount() {
    if (this._getAccounts) {
      this._getAccounts.cancel();
    }

    if (this._getMons) {
      this._getMons.cancel();
    }
  }

  // Change the list of created Crypromons saved in the state so UI refreshes after this call
  refreshMons() {
    this._getMons = getMons(this._web3, this._account).then((_mons) => {
      this._getMons = null;
      this.setState({ cryptomons: _mons });
      this.setState({ myCryptomons: _mons.filter(mon => mon.owner?.toString().toLowerCase() === this._account?.toString().toLowerCase()) })
      this.setState({
        otherCryptomons: _mons.filter(mon =>
          (mon.owner.toLowerCase() !== this._account)
        )
      })
    }
    )
  }

  // Function that buys a Cryptomon through a smart contract function
  buyMon(id, price) {
    const contr = new this._web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: this._account })
    contr.methods.buyMon(id).send({ value: BigInt(price) + BigInt(1) + "" }).on('confirmation', () => {
      toast("Success");
      this.refreshMons();
    })
  }

  // Function that adds a Cryptomon for sale through a smart contract function
  addForSale(id, price) {
    if (price === 0 || price === "0") {
      toast.error("🦄 Dude, price should be above 0");
      return;
    }
    const contr = new this._web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: this._account });
    contr.methods.addForSale(id, price).send().on('confirmation', () => {
      toast("Success");
      this.refreshMons();
    })
  }

  // Function that removes a Cryptomon from sale through a smart contract function
  removeFromSale(id) {
    const contr = new this._web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: this._account });
    contr.methods.removeFromSale(id).send().on('confirmation', () => {
      toast("Success");
      this.refreshMons();
    })
  }

  // Function that breeds 2 Cryptomons through a smart contract function
  breedMons(id1, id2) {
    const contr = new this._web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: this._account, gas: 3000000 });
    contr.methods.breedMons(id1, id2).send().on('confirmation', () => {
      toast("Success"); // alert user if success
      this.refreshMons();
    });
  }

  // Function that allows 2 Cryptomons to fight through a smart contract function
  async fight(id1, id2) {
    const contr = new this._web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: this._account });
    var results = await contr.methods.fight(id1, id2).call();
    this.state.winner = results[0];
    this.state.rounds = results[1];
    this.refreshMons();
  }

  // Function that starts sharing a Cryptomon to another address through a smart contract function
  startSharing(id, address) {
    const contr = new this._web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: this._account });
    contr.methods.startSharing(id, address).send().on('confirmation', () => {
      this.refreshMons();
    });
  }

  // Function that stops sharing a Cryptomon with other addresses through a smart contrct function
  stopSharing(id) {
    const contr = new this._web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, { from: this._account });
    contr.methods.stopSharing(id).send().on('confirmation', () => {
      this.refreshMons();
    });
  }

  // Handlers for form inputs
  handleShareId(event) { this.setState({ shareId: event.target.value }); }
  handleShareAddress(event) { console.log(event.target.value); this.setState({ shareAddress: event.target.value }); }

  handleChange(id, event) {
    this.setState({ value: event.target.value });
    //console.log(this.state.value[id], event.target.value)
  }


  // Function that does all the rendering of the application
  render() {

    // div that holds the name and id of each Cryptomon
    var nameDiv = (mon) => {
      return (<div>
        <label className="monName">{names[mon.species]}</label>
        <label className="" style={{ float: 'right' }}>{"ID: " + mon.id}</label>
      </div>)
    }

    // Function that  returns the style of the background image according to Cryptomons' type
    var bgStyle = (Type) => ({
      backgroundImage: 'url(' + bg[Type] + ')',
      backgroundSize: '210px 240px'
    })
    // div that holds the images (Cryptomon image and background image) of a Cryptomon
    var imgDiv = (mon) => {
      return <div className="monBox" style={bgStyle(mon.monType)}><img className="monImg" src={require("./sprites/" + (parseInt(mon.species) + 1) + ".png")} alt={mon.species} /></div>
    }

    // div that holds the stats of a Cryptomon
    var statDiv = (mon) => {
      return (<div className="stat-area">
        <div className="stat-line"><label className="stat-label">Hp: </label><StatBar percentage={mon.hp * 100 / 140} /></div>
        <div className="stat-line"><label className="stat-label">Attack: </label><StatBar percentage={mon.atk * 100 / 140} /></div>
        <div className="stat-line"><label className="stat-label">Defense: </label><StatBar percentage={mon.def * 100 / 140} /></div>
        <div className="stat-line"><label className="stat-label">Speed: </label><StatBar percentage={mon.speed * 100 / 140} /></div>
      </div>)
    }

    // Create the div with add for sale button
    var addForSaleDiv = (mon) => {
      return (<div className="selling-div">
        <label className="add-for-sale-label">Set cryptomons price (in Wei):</label>
        <input type="number" className="add-for-sale-input" value={this.state.value} onChange={(e) => this.handleChange(mon.id, e)} />
        <button className="rpgui-button" type="button" style={{float: "right"}} onClick={() => this.addForSale(mon.id, this.state.value)}>Add for sale</button>
      </div>)
    }

    // Create the div with remove from sale button
    var removeFromSaleDiv = (mon) => {
      return (<div className="selling-div">
        <label className="remove-from-sale-label">Price (in Wei):<br />{mon.price}</label>
        <button className="remove-from-sale-btn" onClick={() => this.removeFromSale(mon.id)}>Remove from sale</button>
      </div>)
    }

    // Create the div with buy button
    var buyDiv = (mon) => {
      return (<div className="buying-div">
        <label className="sale-price">Price (in Wei):<br />{mon.price} </label>
        <label className="sale-owner">Cryptomon Owner: {mon.owner} </label>
        <button className="sale-btn" onClick={() => this.buyMon(mon.id, mon.price)}>Buy</button>
      </div>)
    }

    // Create the div with breed choice 1, choice 2 buttons
    var breedDiv = (mon) => {
      return (<div className="breed-choice-div">
        <button className="br-Choice-btn" onClick={() => {
          this.setState({ breedChoice1: mon.id });
        }}>Choice 1</button>
        <button className="br-Choice-btn" onClick={() => {
          this.setState({ breedChoice2: mon.id });
        }} >Choice 2</button>
      </div>)
    }

    var breedOption = (breedchoice) => {
      if (breedchoice === null) {
        return (<div className="mon">
          <figure className="my-figure">
            <figcaption>
              <div className="monBox"> <img className="monImg" src={require("./sprites/0.png")} alt={"empty"} /></div>
            </figcaption>
          </figure>
        </div>)
      } else {
        return (this.state.cryptomons.filter(mon => (mon.id === breedchoice)).map(mon =>
          <React.Fragment key={mon.id}>
            <div className="mon">
              <figure className="my-figure">
                {imgDiv(mon)}
                <figcaption>
                </figcaption>
              </figure>
            </div>
          </React.Fragment>)
        )
      }
    }

    // div with users Cryptomons
    const myCryptomons = this.state.myCryptomons.filter(mon => (!mon.forSale)).map(mon =>
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>
              {statDiv(mon)}
            </figcaption>
          </figure>
          {addForSaleDiv(mon)}
        </div>
      </React.Fragment>
    )

    // div with user's Cryptomons that are for sale
    const forSaleCryptomons = this.state.myCryptomons.filter(mon => (mon.forSale)).map(mon =>
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>
              {statDiv(mon)}
            </figcaption>
          </figure>
          {removeFromSaleDiv(mon)}
        </div>
      </React.Fragment>
    )

    // div with Cryptomons available for buy to the user
    const buyCryptomons = this.state.otherCryptomons.filter(mon => (mon.forSale)).map(mon =>
      <React.Fragment key={mon.id} >
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>
              {statDiv(mon)}
            </figcaption>
          </figure>
          {buyDiv(mon)}
        </div>
      </React.Fragment>
    )

    // div with user's Cryptomons that can be used for breeding
    const forBreedCryptomons = this.state.myCryptomons.filter(mon => (!mon.forSale)).map(mon =>
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>
              {statDiv(mon)}
            </figcaption>
          </figure>
          {breedDiv(mon)}
        </div>
      </React.Fragment>
    )

    var cond = mon => (
      ((mon.owner.toString().toLowerCase() === this._account?.toString().toLowerCase()) && (!mon.forSale)) ||
      ((mon.sharedTo.toString().toLowerCase() === this._account?.toString().toLowerCase()) && (mon.owner?.toString().toLowerCase() !== this._account?.toString().toLowerCase()))
    );
    // div with user's Cryptomons that can be used to fight with
    const forFightWithCryptomons = this.state.cryptomons.filter(cond).map(mon =>
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>
              {statDiv(mon)}
            </figcaption>
          </figure>
          <div className="fight-choice-div">
            <button className="fight-Choice-btn" onClick={() => {
              this.setState({ fightChoice1: mon.id });
            }} >Choice 1</button>
          </div>
        </div>
      </React.Fragment>
    )

    // div with Cryptomons that user can fight against
    const forFightAgainstCryptomons = this.state.otherCryptomons.filter(mon => (!mon.forSale)).map(mon =>
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>
              {statDiv(mon)}
            </figcaption>
          </figure>
          <div className="fight-choice-div">
            <button className="fight-Choice-btn" onClick={() => {
              this.setState({ fightChoice2: mon.id });
            }} >Choice 2</button>
          </div>
        </div>
      </React.Fragment>
    )

    // div with user's shared Cryptomons
    const sharedByMe = this.state.myCryptomons.filter(mon => (mon.sharedTo.toLowerCase() !== this._account)).map(mon =>
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>
              {statDiv(mon)}
            </figcaption>
          </figure>
          <div className="sharing-div">
            <label className="shareTo-owner">Shared to address: {mon.sharedTo} </label>
            <button className="stop-sharing-btn" onClick={() => this.stopSharing(mon.id)}>Stop sharing</button>
          </div>
        </div>
      </React.Fragment>
    )

    // div with Cryptomons shared to the user
    const sharedToMe = this.state.otherCryptomons.filter(mon => (mon.sharedTo.toLowerCase() === this._account)).map(mon =>
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>
              {statDiv(mon)}
            </figcaption>
          </figure>
          <div className="sharing-div">
            <label className="shared-owner">Cryptomon Owner: {mon.owner} </label>
            <button className="stop-sharing-btn" onClick={() => this.stopSharing(mon.id)}>Stop sharing</button>
          </div>
        </div>
      </React.Fragment>
    )

    return (
      // Creation of the different tabs of the UI
      <div class="rpgui-content">
        <ToastContainer />

        <div className="AppTitle">
          Babaylan.eth {" "} <span>🧞</span>

            <span>
            <a data-tip data-for="walletLogout">
              <button
                class="rpgui-button golden" type="button"
                style={{ float: "right", fontSize: "20px", marginTop: "6px", marginRight: "6px" }}
                onClick={() => onClickConnect(this)}>
                {/* {this.state.connectBtnTxt !== "Connect Wallet" ? <span onClick={() => onClickConnect(this)}>&#10060;</span> : <></>} */}

                <p style={{ paddingTop: "12px" }}>{this.state.connectBtnTxt}</p>
              </button>
            </a>
          </span>

          {
            (this.state.connectBtnTxt !== "Connect Wallet") &&
            (
              <ReactTooltip id="walletLogout" lace="top" type="warning" effect="float">
                <span>Click to logout</span>
              </ReactTooltip>
            )
          }

        </div>

        <Tabs defaultActiveKey="myCryptomons" id="uncontrolled-tab-example">
          <Tab className="x" eventKey="myCryptomons" title="My Creatures">
            <div className="p1">Your Entries</div>
            {myCryptomons}
          </Tab>
          <Tab eventKey="forSale" title="For trade">
            <label className="p1">Manage Trade</label>
            {forSaleCryptomons}
          </Tab>
          <Tab eventKey="buyCryptomons" title="Trade Creatures">
            <label className="p1">Shop</label>
            {buyCryptomons}
          </Tab>
          <Tab eventKey="breedCryptomons" title="Breed Creatures">
            <label className="p1">Breeding Grounds</label>
            <div className="breeding-area">
              {breedOption(this.state.breedChoice1)}
              {breedOption(this.state.breedChoice2)}
              <button class="rpgui-button" type="button" style={{marginLeft: "24px"}} onClick={() => this.breedMons(this.state.breedChoice1, this.state.breedChoice2)}>Breed choosen creatures</button>
            </div>
            {forBreedCryptomons}
          </Tab>
          <Tab eventKey="fight" title="Fight">
            <label className="p1">Arena</label>
            <div className="fighting-area">
              {

              }
              {breedOption(this.state.fightChoice1)}
              {breedOption(this.state.fightChoice2)}
              <label className="winner-label">And the winner is...
                {" "}
                {
                  names[(this.state.cryptomons.find(mon => mon.id?.toString() === this.state.winner?.toString()))?.species]
                }
              </label><br />
              <label className="winner-label">Winning creature's Id: {this.state.winner}</label><br />
              <label className="winner-label">Rounds the fight lasted: {this.state.rounds}</label>
              <button class="rpgui-button" type="button"  onClick={() => this.fight(this.state.fightChoice1, this.state.fightChoice2)}>Fight with choosen creatures</button>
            </div>
            <div className="fight-mons-<h1>Sharing Management</h1>area">
              <div className="fightWith-area">
                <label className="p2">Your Creatures</label>
                {forFightWithCryptomons}
              </div>
              <div className="fightAgainst-area">
                <label className="p2">Opponent Creatures</label>
                {forFightAgainstCryptomons}
              </div>
            </div>
          </Tab>
          <Tab eventKey="share" title="Share Creatures">
            <label className="p1">Sharing Management</label>
            <div className="sharing-area">
              <div className="form-line">
                <label className="form-label">Creature Id:</label>
                <input className="form-input" value={this.state.shareId} onChange={(e) => this.handleShareId(e)} />
              </div>
              <div className="form-line">
                <label className="form-label">Share to address:</label>
                <input className="form-input" value={this.state.shareAddress} onChange={(e) => this.handleShareAddress(e)} />
              </div>
              <div className="form-line">
                <button class="rpgui-button" type="button" style={{float: "right"}} onClick={() => this.startSharing(this.state.shareId, this.state.shareAddress)}>Share</button>
              </div>
            </div>
            {sharedByMe}
          </Tab>
          <Tab eventKey="sharedToMe" title="Shared To Me">
            <label className="p1">Shared To You</label>
            {sharedToMe}
          </Tab>
        </Tabs></div>

    );
  }
}

export default Cryptomons;
