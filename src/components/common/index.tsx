// Load all the background images for the 10 different Cryptomon types
import bg0 from '../../sprites-copy/background/0.png'
import bg1 from '../../sprites-copy/background/1.png'
import bg2 from '../../sprites-copy/background/2.png'
import bg3 from '../../sprites-copy/background/3.png'
import bg4 from '../../sprites-copy/background/4.png'
import bg5 from '../../sprites-copy/background/5.png'
import bg6 from '../../sprites-copy/background/6.png'
import bg7 from '../../sprites-copy/background/7.png'
import bg8 from '../../sprites-copy/background/8.png'
import bg9 from '../../sprites-copy/background/9.png'
import bg10 from '../../sprites-copy/background/10.png'

import MonImages from '../../sprites-copy'
import StatBar from '../../StatBar'
import Spinner from '../spinner'
import { formatUnits } from '@ethersproject/units'
import React from 'react'
import { Lokimon } from '../models'
import './common.css'

// Add all 151 Cryptomon names in an array
const names = [
  'Dryad',
  'Hamadryad',
  'Leshy',
  'Santelmo',
  'Cerberus',
  'Efreet',
  'Fastitocalon',
  'Aspidochelone',
  'Zaratan',
  'Arachne',
  'Jorogumo',
  'Tsuchigumo',
  'Pabilsag',
  'Girtablilu',
  'Selket',
  'Tsikavats',
  'Munnin',
  'Huginn',
  'Azeban',
  'Ratatoskr',
  'Stratim',
  'Navka',
  'Apep',
  'Nidhoggr',
  'Raiju',
  'Raijin',
  'Amphivena',
  'Basilisk',
  'Wolpertinger',
  'Ramidreju',
  'Echinemon',
  'Mujina',
  'Kamaitachi',
  'Lavellan',
  'Vila',
  'Huldra',
  'Chimera',
  'Kyuubi',
  'Nixie',
  'Tuathan',
  'Minyades',
  'Camazotz',
  'Curupira',
  'Penghou',
  'Ghillie_Dhu',
  'Myrmecoleon',
  'Myrmidon',
  'Mothman',
  'Moth_King',
  'Grootslang',
  'Yaoguai',
  'Cait_Sidhe',
  'Cath_Balug',
  'Nakki',
  'Kappa',
  'Satori',
  'Shojo',
  'Skohl',
  'Haet',
  'Vodyanoy',
  'Undine',
  'Melusine',
  'Vukodlak',
  'Chernobog',
  'Djinn',
  'Bauk',
  'Troll',
  'Jotun',
  'Spriggan',
  'Jubokko',
  'Kodama',
  'Bukavak',
  'Kraken',
  'Clayboy',
  'Met',
  'Emet',
  'Sleipnir',
  'Todorats',
  'Scylla',
  'Charybdis',
  'Brontes',
  'Arges',
  'Hraesvelgr',
  'Berunda',
  'Cockatrice',
  'Selkie',
  'Rusalka',
  'Tarasque',
  'Meretseger',
  'Carbuncle',
  'Shen',
  'Boogeyman',
  'Banshee',
  'Mare',
  'Dilong',
  'Incubus',
  'Succubus',
  'Cancer',
  'Karkinos',
  'Druk',
  'Shenlong',
  'Gan_Ceann',
  'Oni',
  'Tairanohone',
  'Gashadokuro',
  'Yeren',
  'Yeti',
  'Yowie',
  'Nezhit',
  'Chuma',
  'Sigbin',
  'Gargoyle',
  'Caladrius',
  'Umibozu',
  'Callisto',
  'Kelpie',
  'Makara',
  'Morgen',
  'Merrow',
  'Naiad',
  'Nereid',
  'Pixiu',
  'Khepri',
  'Likho',
  'kitsune',
  'Caorthannach',
  'Kaggen',
  'Audumbla',
  'Lochness',
  'Jormungandr',
  'Leviathan',
  'Doppelganger',
  'Skvader',
  'Fossegrim',
  'Valkyrie',
  'Basan',
  'Tsukumogami',
  'Luska',
  'Hydra',
  'Afanc',
  'Cetus',
  'Vedfolnir',
  'Baku',
  'Alkonost',
  'Quetzalcoatl',
  'Anzu',
  'Zmey',
  'Azhdaya',
  'Fafnir',
  'Baba_Yaga',
  'Baba_Roga',
]

// Add background images in an array for easy access
const bg = [bg0, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10]

export const monName = (specie: number) => names[specie]

export const nameDiv = (mon: Lokimon) => {
  return (
    <div>
      <label className="monName">{names[mon?.species]}</label>
      <label className="" style={{ float: 'right' }}>
        {'#' + mon?.id}
      </label>
    </div>
  )
}

// Function that  returns the style of the background image according to Cryptomons' type
export const bgStyle = (Type) => ({
  backgroundImage: 'url(' + bg[Type] + ')',
  backgroundSize: '210px 240px',
})

// div that holds the images (Cryptomon image and background image) of a Cryptomon
export const imgDiv = (mon: Lokimon) => {
  return (
    <div className="monBox monBox-320-scrn" style={bgStyle(mon?.monType)}>
      <img
        className="monImg"
        src={MonImages[`${parseInt(mon?.species?.toString()) + 1}`]}
        alt={mon?.species?.toString()}
        height="32"
        width="32"
      />
    </div>
  )
}

// div that holds the stats of a Cryptomon
export const statDiv = (mon: Lokimon) => {
  return (
    <div className="stat-area">
      <div className="stat-line">
        <label className="stat-label">Hp: </label>
        <StatBar percentage={(mon?.hp * 100) / 160} />
      </div>
      <div className="stat-line">
        <label className="stat-label">Attack: </label>
        <StatBar percentage={(mon?.atk * 100) / 160} />
      </div>
      <div className="stat-line">
        <label className="stat-label">Defense: </label>
        <StatBar percentage={(mon?.def * 100) / 160} />
      </div>
      <div className="stat-line">
        <label className="stat-label">Speed: </label>
        <StatBar percentage={(mon?.speed * 100) / 160} />
      </div>
    </div>
  )
}

// Create the div with add for sale button
export const addForSaleDiv = (mon: Lokimon, value, handleChange, isAddForSaleLoading, addForSale) => {
  return (
    <div className="selling-div">
      <label className="add-for-sale-label">Set lokimons price:</label>
      <input type="number" className="add-for-sale-input" value={value} onChange={(e) => handleChange(mon?.id, e)} />
      {isAddForSaleLoading ? (
        <button className="rpgui-button" type="button" style={{ width: '100%' }}>
          <Spinner color="#000" />
        </button>
      ) : (
        <button
          className="rpgui-button"
          type="button"
          // style={{ float: 'right' }}
          onClick={() => addForSale(mon?.id, value)}
        >
          {/* Add for sale */}
          Sell
        </button>
      )}
    </div>
  )
}

// Create the div with remove from sale button
export const removeFromSaleDiv = (mon: Lokimon, isRemoveFromSaleLoading, removeFromSale) => {
  return (
    <div className="selling-div">
      <label className="remove-from-sale-label">
        Price:
        <br />
        {formatUnits(mon?.price)}
      </label>
      {isRemoveFromSaleLoading ? (
        <button className="rpgui-button" type="button" style={{ width: '100%' }}>
          <Spinner color="#000" />
        </button>
      ) : (
        <button
          className="rpgui-button"
          type="button"
          onClick={() => removeFromSale(mon?.id)}
        >
          Delist
          {isRemoveFromSaleLoading && <Spinner color="#000" />}
        </button>
      )}
    </div>
  )
}

// Create the div with buy button
export const buyDiv = (mon: Lokimon, isBuyMonLoading, buyMon) => {
  return (
    <div className="buying-div">
      <div className="sale-price">
        Price:
        <br />
        {formatUnits(mon?.price, 18)}
      </div>
      <div className="sale-owner">Creature Owner: {mon?.owner} </div>
      {isBuyMonLoading ? (
        <button className="rpgui-button" type="button" style={{ width: '100%' }}>
          <Spinner color="#000" />
        </button>
      ) : (
        <button
          className="sale-btn rpgui-button"
          type="button"
          style={{ float: 'right' }}
          onClick={() => buyMon(mon?.id, mon?.price)}
        >
          Buy
        </button>
      )}
    </div>
  )
}

// Create the div with breed choice 1, choice 2 buttons
export const breedDiv = (mon: Lokimon, setBreedChoice1Func, setBreedChoice2Func) => {
  return (
    <div className="breed-choice-div">
      <button
        className="br-Choice-btn rpgui-button"
        type="button"
        style={{ float: 'right' }}
        onClick={() => {
          setBreedChoice1Func(mon?.id)
        }}
      >
        Choice 1
      </button>
      <button
        className="br-Choice-btn rpgui-button"
        type="button"
        style={{ float: 'right' }}
        onClick={() => {
          setBreedChoice2Func(mon?.id)
        }}
      >
        Choice 2
      </button>
    </div>
  )
}

export const breedOption = (breedchoice: number, lokimons = []) => {
  if (breedchoice === null) {
    return (
      <div className="mon mon-320-scrn">
        <figure className="my-figure my-figure-320-scrn">
          <figcaption>
            <div className="monBox monBox-320-scrn">
              {' '}
              <img className="monImg" src={MonImages['0']} alt={'empty'} />
            </div>
          </figcaption>
        </figure>
      </div>
    )
  } else {
    return lokimons
      .filter((mon) => mon.id === breedchoice)
      .map((mon) => (
        <React.Fragment key={mon.id}>
          <div className="mon mon-320-scrn">
            <figure className="my-figure my-figure-320-scrn">
              {imgDiv(mon)}
              <figcaption></figcaption>
            </figure>
          </div>
        </React.Fragment>
      ))
  }
}
