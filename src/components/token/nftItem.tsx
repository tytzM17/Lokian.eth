import { Row } from 'react-bootstrap'
import { BigNumber } from '@ethersproject/bignumber'
import './token.css'
import React from 'react'

const NftItem = ({ item, icon, slot }) => {
  const nftItem = BigNumber.from(item).toBigInt()
  return (
    <>
      <Row>
        <div className="nft-item">
          <div className={`rpgui-icon ${nftItem ? icon : slot}`}></div>
          <span>X</span>
          <span className="nft-item-count">{`${nftItem}`}</span>
        </div>
      </Row>
    </>
  )
}

export default NftItem
