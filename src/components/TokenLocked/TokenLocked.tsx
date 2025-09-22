import React, { useState } from "react"

import "./TokenLocked.scss"
import { moneyFormatter } from "../../utils"

type Props = {
  pair: any
  totalLocked: number
  pairTvl: number
}

export const TokenLocked = ({ pair, totalLocked, pairTvl }: Props): JSX.Element => {
  return (
    <div className="token-locked">
      <div className="token-locked-content">
        <div className="token-locked-header">
          <div className="token-locked-header-title">Total Tokens Locked</div>
          <div className="token-locked-header-item first">
            <div className="token-locked-header-item-token">
              <img src={pair?.icon} alt="token" /> {pair?.token}
            </div>
            <div className="token-locked-header-item-value">{moneyFormatter.format(totalLocked)}</div>
          </div>
        </div>
        {/*<div className="token-locked-block">*/}
        {/*  <div className="token-locked-block-title">Fees 24h</div>*/}
        {/*  <div className="token-locked-block-big">$96.90</div>*/}
        {/*</div>*/}
        <div className="token-locked-block">
          <div className="token-locked-block-title">TVL</div>
          <div className="token-locked-block-big">{moneyFormatter.format(pairTvl)}</div>
          {/*<div*/}
          {/*  className={cn("token-locked-block-percent", {*/}
          {/*    green: true,*/}
          {/*    red: false,*/}
          {/*  })}*/}
          {/*>*/}
          {/*  0.35%*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}
