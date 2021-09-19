/* global BigInt */
import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs } from "react-bootstrap";
import StatBar from "./StatBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Library to work with Etherium blockchain

import contrInterface from "./interface.json"; // Load contract json file
// Load all the background images for the 10 different Cryptomon types
import bg0 from "./sprites/background/0.png";
import bg1 from "./sprites/background/1.png";
import bg2 from "./sprites/background/2.png";
import bg3 from "./sprites/background/3.png";
import bg4 from "./sprites/background/4.png";
import bg5 from "./sprites/background/5.png";
import bg6 from "./sprites/background/6.png";
import bg7 from "./sprites/background/7.png";
import bg8 from "./sprites/background/8.png";
import bg9 from "./sprites/background/9.png";
import bg10 from "./sprites/background/10.png";
// Utils
import formatWallet from "./utils/formatWallet";

// The contact deployment address in an EVM based blockchain
const CONTRACT_ADDRESS = "0x69e8d9a132677A39629f749EE3135FBDB9FCe879"; // win-10-workstation-ganache-contract-address

// Add background images in an array for easy access
const bg = [bg0, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];

// Add all 151 Cryptomon names in an array
const names = [
  "Dryad",
  "Hamadryad",
  "Leshy",
  "Santelmo",
  "Cerberus",
  "Efreet",
  "Fastitocalon",
  "Aspidochelone",
  "Zaratan",
  "Arachne",
  "Jorogumo",
  "Tsuchigumo",
  "Pabilsag",
  "Girtablilu",
  "Selket",
  "Tsikavats",
  "Munnin",
  "Huginn",
  "Azeban",
  "Ratatoskr",
  "Stratim",
  "Navka",
  "Apep",
  "Nidhoggr",
  "Raiju",
  "Raijin",
  "Amphivena",
  "Basilisk",
  "Wolpertinger",
  "Ramidreju",
  "Echinemon",
  "Mujina",
  "Kamaitachi",
  "Lavellan",
  "Vila",
  "Huldra",
  "Chimera",
  "Kyuubi",
  "Nixie",
  "Tuathan",
  "Minyades",
  "Camazotz",
  "Curupira",
  "Penghou",
  "Ghillie_Dhu",
  "Myrmecoleon",
  "Myrmidon",
  "Mothman",
  "Moth_King",
  "Grootslang",
  "Yaoguai",
  "Cait_Sidhe",
  "Cath_Balug",
  "Nakki",
  "Kappa",
  "Satori",
  "Shojo",
  "Skohl",
  "Haet",
  "Vodyanoy",
  "Undine",
  "Melusine",
  "Vukodlak",
  "Chernobog",
  "Djinn",
  "Bauk",
  "Troll",
  "Jotun",
  "Spriggan",
  "Jubokko",
  "Kodama",
  "Bukavak",
  "Kraken",
  "Clayboy",
  "Met",
  "Emet",
  "Sleipnir",
  "Todorats",
  "Scylla",
  "Charybdis",
  "Brontes",
  "Arges",
  "Hraesvelgr",
  "Berunda",
  "Cockatrice",
  "Selkie",
  "Rusalka",
  "Tarasque",
  "Meretseger",
  "Carbuncle",
  "Shen",
  "Boogeyman",
  "Banshee",
  "Mare",
  "Dilong",
  "Incubus",
  "Succubus",
  "Cancer",
  "Karkinos",
  "Druk",
  "Shenlong",
  "Gan_Ceann",
  "Oni",
  "Tairanohone",
  "Gashadokuro",
  "Yeren",
  "Yeti",
  "Yowie",
  "Nezhit",
  "Chuma",
  "Sigbin",
  "Gargoyle",
  "Caladrius",
  "Umibozu",
  "Callisto",
  "Kelpie",
  "Makara",
  "Morgen",
  "Merrow",
  "Naiad",
  "Nereid",
  "Pixiu",
  "Khepri",
  "Likho",
  "kitsune",
  "Caorthannach",
  "Kaggen",
  "Audumbla",
  "Lochness",
  "Jormungandr",
  "Leviathan",
  "Doppelganger",
  "Skvader",
  "Fossegrim",
  "Valkyrie",
  "Basan",
  "Tsukumogami",
  "Luska",
  "Hydra",
  "Afanc",
  "Cetus",
  "Vedfolnir",
  "Baku",
  "Alkonost",
  "Quetzalcoatl",
  "Anzu",
  "Zmey",
  "Azhdaya",
  "Fafnir",
  "Baba_Yaga",
  "Baba_Roga",
];

async function getMons(web3, account) {
  const contr = new web3.eth.Contract(contrInterface, CONTRACT_ADDRESS, {
    from: account,
  });
  const totalMons = parseInt(await contr.methods.totalMons().call());
  return Promise.all(
    [...Array(totalMons).keys()].map((id) => contr.methods.mons(id).call())
  );
}

async function onClickConnect(self) {
  if (self && self._account) {
    alert("Account management modal");
  }

  // self.refreshMons();
}

class Cryptomons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptomons: [],
      myCryptomons: [],
      otherCryptomons: [],
      value: 0, // Used in My Cryptomons tab for input in price text

      breedChoice1: null, // Used in breeding tab
      breedChoice2: null, // Used in breeding tab

      fightChoice1: null, // Used in fighting tab
      fightChoice2: null, // Used in fighting tab

      winner: null, // Used to display winner of the last fight
      rounds: null, // Used to display number of rounds the fight lasted

      shareId: "", // Used in shareId form input field
      shareAddress: "", // Used in shareAddress form input field

      connectBtnTxt: "Connect Wallet",
    };

    this._getAccounts = null;
    this._getMons = null;

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {

    // const web3Modal = new Web3Modal();
    // const provider = await web3Modal.connect();
    // this._web3 = new Web3(provider);

    // console.log("getInjectedProvider", getInjectedProvider());
    // console.log("getInjectedProviderName", getInjectedProviderName());

    // const { name } = getInjectedProvider();

    // // if metamask
    // if (name === "MetaMask") {
    //   const accounts = await window.ethereum.request({
    //     method: "eth_requestAccounts",
    //   });

    //   this._account = accounts[0];
    //   this.setState({ connectBtnTxt: formatWallet(accounts[0]?.toString()) });

    //   if (typeof window.ethereum.autoRefreshOnNetworkChange !== "undefined") {
    //     window.ethereum.autoRefreshOnNetworkChange = false;
    //   }
    // }

    // // Subscribe to accounts change
    // provider.on("accountsChanged", (accounts) => {
    //   console.log('Accounts:', accounts);
    //   this.setState({ connectBtnTxt: formatWallet(accounts[0]?.toString()) });
    // });

    // // Subscribe to chainId change
    // provider.on("chainChanged", (chainId) => {
    //   console.log('Chain id:', chainId);
    // });

    // provider.on("connect", (info) => {
    //   console.log('Connect info:', info);
    // });

  }

  componentWillUnmount() {
    // if (this._getAccounts) {
    //   this._getAccounts.cancel();
    // }

    // if (this._getMons) {
    //   this._getMons.cancel();
    // }
  }

  // Change the list of created Crypromons saved in the state so UI refreshes after this call
  refreshMons() {
    this._getMons = getMons(this._web3, this._account).then((_mons) => {
      this._getMons = null;
      this.setState({ cryptomons: _mons });
      this.setState({
        myCryptomons: _mons.filter(
          (mon) =>
            mon.owner?.toString().toLowerCase() ===
            this._account?.toString().toLowerCase()
        ),
      });
      this.setState({
        otherCryptomons: _mons.filter(
          (mon) => mon.owner.toLowerCase() !== this._account
        ),
      });
    });
  }

  // Function that buys a Cryptomon through a smart contract function
  buyMon(id, price) {
    const contr = new this._web3.eth.Contract(
      contrInterface,
      CONTRACT_ADDRESS,
      { from: this._account }
    );
    contr.methods
      .buyMon(id)
      .send({ value: BigInt(price) + BigInt(1) + "" })
      .on("confirmation", () => {
        toast("Success");
        this.refreshMons();
      });
  }

  // Function that adds a Cryptomon for sale through a smart contract function
  addForSale(id, price) {
    if (price === 0 || price === "0") {
      toast.error("🦄 Dude, price should be above 0");
      return;
    }
    const contr = new this._web3.eth.Contract(
      contrInterface,
      CONTRACT_ADDRESS,
      { from: this._account }
    );
    contr.methods
      .addForSale(id, price)
      .send()
      .on("confirmation", () => {
        toast("Success");
        this.refreshMons();
      });
  }

  // Function that removes a Cryptomon from sale through a smart contract function
  removeFromSale(id) {
    const contr = new this._web3.eth.Contract(
      contrInterface,
      CONTRACT_ADDRESS,
      { from: this._account }
    );
    contr.methods
      .removeFromSale(id)
      .send()
      .on("confirmation", () => {
        toast("Success");
        this.refreshMons();
      });
  }

  // Function that breeds 2 Cryptomons through a smart contract function
  breedMons(id1, id2) {
    const contr = new this._web3.eth.Contract(
      contrInterface,
      CONTRACT_ADDRESS,
      { from: this._account, gas: 3000000 }
    );
    contr.methods
      .breedMons(id1, id2)
      .send()
      .on("confirmation", () => {
        toast("Success"); // alert user if success
        this.refreshMons();
      });
  }

  // Function that allows 2 Cryptomons to fight through a smart contract function
  async fight(id1, id2) {
    const contr = new this._web3.eth.Contract(
      contrInterface,
      CONTRACT_ADDRESS,
      { from: this._account }
    );
    var results = await contr.methods.fight(id1, id2).call();
    this.state.winner = results[0];
    this.state.rounds = results[1];
    this.refreshMons();
  }

  // Function that starts sharing a Cryptomon to another address through a smart contract function
  startSharing(id, address) {
    const contr = new this._web3.eth.Contract(
      contrInterface,
      CONTRACT_ADDRESS,
      { from: this._account }
    );
    contr.methods
      .startSharing(id, address)
      .send()
      .on("confirmation", () => {
        this.refreshMons();
      });
  }

  // Function that stops sharing a Cryptomon with other addresses through a smart contrct function
  stopSharing(id) {
    const contr = new this._web3.eth.Contract(
      contrInterface,
      CONTRACT_ADDRESS,
      { from: this._account }
    );
    contr.methods
      .stopSharing(id)
      .send()
      .on("confirmation", () => {
        this.refreshMons();
      });
  }

  // Handlers for form inputs
  handleShareId(event) {
    this.setState({ shareId: event.target.value });
  }
  handleShareAddress(event) {
    console.log(event.target.value);
    this.setState({ shareAddress: event.target.value });
  }

  handleChange(id, event) {
    this.setState({ value: event.target.value });
    //console.log(this.state.value[id], event.target.value)
  }

  // Function that does all the rendering of the application
  render() {
    // div that holds the name and id of each Cryptomon
    var nameDiv = (mon) => {
      return (
        <div>
          <label className="monName">{names[mon.species]}</label>
          <label className="" style={{ float: "right" }}>
            {"ID: " + mon.id}
          </label>
        </div>
      );
    };

    // Function that  returns the style of the background image according to Cryptomons' type
    var bgStyle = (Type) => ({
      backgroundImage: "url(" + bg[Type] + ")",
      backgroundSize: "210px 240px",
    });
    // div that holds the images (Cryptomon image and background image) of a Cryptomon
    var imgDiv = (mon) => {
      return (
        <div className="monBox" style={bgStyle(mon.monType)}>
          <img
            className="monImg"
            src={require("./sprites/" + (parseInt(mon.species) + 1) + ".png")}
            alt={mon.species}
          />
        </div>
      );
    };

    // div that holds the stats of a Cryptomon
    var statDiv = (mon) => {
      return (
        <div className="stat-area">
          <div className="stat-line">
            <label className="stat-label">Hp: </label>
            <StatBar percentage={(mon.hp * 100) / 140} />
          </div>
          <div className="stat-line">
            <label className="stat-label">Attack: </label>
            <StatBar percentage={(mon.atk * 100) / 140} />
          </div>
          <div className="stat-line">
            <label className="stat-label">Defense: </label>
            <StatBar percentage={(mon.def * 100) / 140} />
          </div>
          <div className="stat-line">
            <label className="stat-label">Speed: </label>
            <StatBar percentage={(mon.speed * 100) / 140} />
          </div>
        </div>
      );
    };

    // Create the div with add for sale button
    var addForSaleDiv = (mon) => {
      return (
        <div className="selling-div">
          <label className="add-for-sale-label">
            Set creatures price (in Wei):
          </label>
          <input
            type="number"
            className="add-for-sale-input"
            value={this.state.value}
            onChange={(e) => this.handleChange(mon.id, e)}
          />
          <button
            className="rpgui-button"
            type="button"
            style={{ float: "right" }}
            onClick={() => this.addForSale(mon.id, this.state.value)}
          >
            Add for sale
          </button>
        </div>
      );
    };

    // Create the div with remove from sale button
    var removeFromSaleDiv = (mon) => {
      return (
        <div className="selling-div">
          <label className="remove-from-sale-label">
            Price (in Wei):
            <br />
            {mon.price}
          </label>
          <button
            className="rpgui-button"
            type="button"
            style={{ float: "right" }}
            onClick={() => this.removeFromSale(mon.id)}
          >
            Remove from sale
          </button>
        </div>
      );
    };

    // Create the div with buy button
    var buyDiv = (mon) => {
      return (
        <div className="buying-div">
          <div className="sale-price">
            Price (in Wei):
            <br />
            {mon.price}{" "}
          </div>
          <div className="sale-owner">Creature Owner: {mon.owner} </div>
          <button
            className="sale-btn rpgui-button"
            type="button"
            style={{ float: "right" }}
            onClick={() => this.buyMon(mon.id, mon.price)}
          >
            Buy
          </button>
        </div>
      );
    };

    // Create the div with breed choice 1, choice 2 buttons
    var breedDiv = (mon) => {
      return (
        <div className="breed-choice-div">
          <button
            className="br-Choice-btn rpgui-button"
            type="button"
            style={{ float: "right" }}
            onClick={() => {
              this.setState({ breedChoice1: mon.id });
            }}
          >
            Choice 1
          </button>
          <button
            className="br-Choice-btn rpgui-button"
            type="button"
            style={{ float: "right" }}
            onClick={() => {
              this.setState({ breedChoice2: mon.id });
            }}
          >
            Choice 2
          </button>
        </div>
      );
    };

    var breedOption = (breedchoice) => {
      if (breedchoice === null) {
        return (
          <div className="mon">
            <figure className="my-figure">
              <figcaption>
                <div className="monBox">
                  {" "}
                  <img
                    className="monImg"
                    src={require("./sprites/0.png")}
                    alt={"empty"}
                  />
                </div>
              </figcaption>
            </figure>
          </div>
        );
      } else {
        return this.state.cryptomons
          .filter((mon) => mon.id === breedchoice)
          .map((mon) => (
            <React.Fragment key={mon.id}>
              <div className="mon">
                <figure className="my-figure">
                  {imgDiv(mon)}
                  <figcaption></figcaption>
                </figure>
              </div>
            </React.Fragment>
          ));
      }
    };

    // div with users Cryptomons
    const myCryptomons = this.state.myCryptomons
      .filter((mon) => !mon.forSale)
      .map((mon) => (
        <React.Fragment key={mon.id}>
          <div className="mon">
            <figure className="my-figure">
              {nameDiv(mon)}
              {imgDiv(mon)}
              <figcaption>{statDiv(mon)}</figcaption>
            </figure>
            {addForSaleDiv(mon)}
          </div>
        </React.Fragment>
      ));

    // div with user's Cryptomons that are for sale
    const forSaleCryptomons = this.state.myCryptomons
      .filter((mon) => mon.forSale)
      .map((mon) => (
        <React.Fragment key={mon.id}>
          <div className="mon">
            <figure className="my-figure">
              {nameDiv(mon)}
              {imgDiv(mon)}
              <figcaption>{statDiv(mon)}</figcaption>
            </figure>
            {removeFromSaleDiv(mon)}
          </div>
        </React.Fragment>
      ));

    // div with Cryptomons available for buy to the user
    const buyCryptomons = this.state.otherCryptomons
      .filter((mon) => mon.forSale)
      .map((mon) => (
        <React.Fragment key={mon.id}>
          <div className="mon">
            <figure className="my-figure">
              {nameDiv(mon)}
              {imgDiv(mon)}
              <figcaption>{statDiv(mon)}</figcaption>
            </figure>
            {buyDiv(mon)}
          </div>
        </React.Fragment>
      ));

    // div with user's Cryptomons that can be used for breeding
    const forBreedCryptomons = this.state.myCryptomons
      .filter((mon) => !mon.forSale)
      .map((mon) => (
        <React.Fragment key={mon.id}>
          <div className="mon">
            <figure className="my-figure">
              {nameDiv(mon)}
              {imgDiv(mon)}
              <figcaption>{statDiv(mon)}</figcaption>
            </figure>
            {breedDiv(mon)}
          </div>
        </React.Fragment>
      ));

    var cond = (mon) =>
      (mon.owner.toString().toLowerCase() ===
        this._account?.toString().toLowerCase() &&
        !mon.forSale) ||
      (mon.sharedTo.toString().toLowerCase() ===
        this._account?.toString().toLowerCase() &&
        mon.owner?.toString().toLowerCase() !==
          this._account?.toString().toLowerCase());
    // div with user's Cryptomons that can be used to fight with
    const forFightWithCryptomons = this.state.cryptomons
      .filter(cond)
      .map((mon) => (
        <React.Fragment key={mon.id}>
          <div className="mon">
            <figure className="my-figure">
              {nameDiv(mon)}
              {imgDiv(mon)}
              <figcaption>{statDiv(mon)}</figcaption>
            </figure>
            <div className="fight-choice-div">
              <button
                className="fight-Choice-btn rpgui-button"
                type="button"
                style={{ float: "right" }}
                onClick={() => {
                  this.setState({ fightChoice1: mon.id });
                }}
              >
                Choice 1
              </button>
            </div>
          </div>
        </React.Fragment>
      ));

    // div with Cryptomons that user can fight against
    const forFightAgainstCryptomons = this.state.otherCryptomons
      .filter((mon) => !mon.forSale)
      .map((mon) => (
        <React.Fragment key={mon.id}>
          <div className="mon">
            <figure className="my-figure">
              {nameDiv(mon)}
              {imgDiv(mon)}
              <figcaption>{statDiv(mon)}</figcaption>
            </figure>
            <div className="fight-choice-div">
              <button
                className="fight-Choice-btn rpgui-button"
                type="button"
                style={{ float: "right" }}
                onClick={() => {
                  this.setState({ fightChoice2: mon.id });
                }}
              >
                Choice 2
              </button>
            </div>
          </div>
        </React.Fragment>
      ));

    // div with user's shared Cryptomons
    const sharedByMe = this.state.myCryptomons
      .filter((mon) => mon.sharedTo.toLowerCase() !== this._account)
      .map((mon) => (
        <React.Fragment key={mon.id}>
          <div className="mon">
            <figure className="my-figure">
              {nameDiv(mon)}
              {imgDiv(mon)}
              <figcaption>{statDiv(mon)}</figcaption>
            </figure>
            <div className="sharing-div">
              <div className="shareTo-owner">
                Shared to address: {mon.sharedTo}{" "}
              </div>
              <button
                className="stop-sharing-btn rpgui-button"
                type="button"
                style={{ float: "right" }}
                onClick={() => this.stopSharing(mon.id)}
              >
                Stop sharing
              </button>
            </div>
          </div>
        </React.Fragment>
      ));

    // div with Cryptomons shared to the user
    const sharedToMe = this.state.otherCryptomons
      .filter((mon) => mon.sharedTo.toLowerCase() === this._account)
      .map((mon) => (
        <React.Fragment key={mon.id}>
          <div className="mon">
            <figure className="my-figure">
              {nameDiv(mon)}
              {imgDiv(mon)}
              <figcaption>{statDiv(mon)}</figcaption>
            </figure>
            <div className="sharing-div">
              <label className="shared-owner">
                Creature Owner: {mon.owner}{" "}
              </label>
              <button
                className="stop-sharing-btn rpgui-button"
                type="button"
                style={{ float: "right" }}
                onClick={() => this.stopSharing(mon.id)}
              >
                Stop sharing
              </button>
            </div>
          </div>
        </React.Fragment>
      ));

    return (
      // Creation of the different tabs of the UI
      <div className="rpgui-content">
        <ToastContainer />

        <div className="AppTitle">
          LOKIAN.ETH
          <span>
            <button
              className="rpgui-button golden"
              type="button"
              style={{
                float: "right",
                fontSize: "20px",
                marginTop: "6px",
                marginRight: "6px",
              }}
              onClick={() => onClickConnect(this)}
            >
              <p style={{ paddingTop: "12px" }}>{this.state.connectBtnTxt}</p>
            </button>
          </span>
        </div>

        <Tabs defaultActiveKey="myCryptomons" id="uncontrolled-tab-example">
          <Tab className="x" eventKey="myCryptomons" title="My Creatures">
            <div className="p1">Your Entries</div>
            {myCryptomons}
          </Tab>
          <Tab eventKey="forSale" title="For trade">
            <div className="p1">Manage Trade</div>
            {forSaleCryptomons}
          </Tab>
          <Tab eventKey="buyCryptomons" title="Trade Creatures">
            <div className="p1">Shop</div>
            {buyCryptomons}
          </Tab>
          <Tab eventKey="breedCryptomons" title="Breed Creatures">
            <div className="p1">Breeding Grounds</div>
            <div className="breeding-area">
              {breedOption(this.state.breedChoice1)}
              {breedOption(this.state.breedChoice2)}
              <button
                className="rpgui-button"
                type="button"
                style={{ width: "420px" }}
                onClick={() =>
                  this.breedMons(
                    this.state.breedChoice1,
                    this.state.breedChoice2
                  )
                }
              >
                Breed choosen creatures
              </button>
            </div>
            {forBreedCryptomons}
          </Tab>
          <Tab eventKey="fight" title="Fight">
            <div className="p1">Arena</div>
            <div className="fighting-area">
              {}
              {breedOption(this.state.fightChoice1)}
              {breedOption(this.state.fightChoice2)}
              <label className="winner-label">
                And the winner is...{" "}
                {
                  names[
                    this.state.cryptomons.find(
                      (mon) =>
                        mon.id?.toString() === this.state.winner?.toString()
                    )?.species
                  ]
                }
              </label>
              <br />
              <label className="winner-label">
                Winning creature's Id: {this.state.winner}
              </label>
              <br />
              <label className="winner-label">
                Rounds the fight lasted: {this.state.rounds}
              </label>
              <button
                className="rpgui-button"
                type="button"
                onClick={() =>
                  this.fight(this.state.fightChoice1, this.state.fightChoice2)
                }
              >
                Fight with choosen creatures
              </button>
            </div>
            <div className="fight-mons-<h1>Sharing Management</h1>area">
              <div className="fightWith-area border-gradient border-gradient-purple">
                <div className="p2">Your Creatures</div>
                {forFightWithCryptomons}
              </div>
              <div className="fightAgainst-area border-gradient border-gradient-purple">
                <div className="p2">Opponent Creatures</div>
                {forFightAgainstCryptomons}
              </div>
            </div>
          </Tab>
          <Tab eventKey="share" title="Share Creatures">
            <div className="p1">Sharing Management</div>
            <div className="sharing-area">
              <div className="form-line">
                <label className="form-label">Creature Id:</label>
                <input
                  className="form-input"
                  value={this.state.shareId}
                  onChange={(e) => this.handleShareId(e)}
                />
              </div>
              <div className="form-line">
                <label className="form-label">Share to address:</label>
                <input
                  className="form-input"
                  value={this.state.shareAddress}
                  onChange={(e) => this.handleShareAddress(e)}
                />
              </div>
              <div className="form-line">
                <button
                  className="rpgui-button"
                  type="button"
                  style={{ float: "right" }}
                  onClick={() =>
                    this.startSharing(
                      this.state.shareId,
                      this.state.shareAddress
                    )
                  }
                >
                  Share
                </button>
              </div>
            </div>
            {sharedByMe}
          </Tab>
          <Tab eventKey="sharedToMe" title="Shared To Me">
            <div className="p1">Shared To You</div>
            {sharedToMe}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Cryptomons;
