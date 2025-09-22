import React from "react"

import "./TokenLockedSmall.scss"
import cn from "classnames"
import { moneyFormatter } from "../../utils"

type Props = {
  totalValue: number
  token: any
}

export const TokenLockedSmall = ({ totalValue, token }: Props): JSX.Element => {
  return (
    <div className="token-locked-small">
      <div className="token-locked-small-content">
        <div className="token-locked-small-block">
          <div className="token-locked-small-block-title">TVL</div>
          <div className="token-locked-small-block-big">{moneyFormatter.format(totalValue)}</div>
          <div
            className={cn("token-locked-small-block-percent", {
              green: token?.price_change_percentage_24h?.toString().includes("-"),
              red: token?.price_change_percentage_24h?.toString().includes("-"),
            })}
          >
            {token?.price_change_percentage_24h}%
          </div>
        </div>
        <div className="token-locked-small-block">
          <div className="token-locked-small-block-title">Market Cap Rank</div>
          <div className="token-locked-small-block-big">#{token?.market_cap_rank}</div>
        </div>
        <div className="token-locked-small-block">
          <div className="token-locked-small-block-title">Market Cap</div>
          <div className="token-locked-small-block-big">{moneyFormatter.format(token?.market_cap_rank)}</div>
        </div>
        <div className="token-locked-small-block">
          <div className="token-locked-small-block-title">Fully Diluted Valuation</div>
          <div className="token-locked-small-block-big">{moneyFormatter.format(token?.fully_diluted_valuation)}</div>
        </div>
        <div className="token-locked-small-block">
          <div className="token-locked-small-block-title">Trading Volume</div>
          <div className="token-locked-small-block-big">{moneyFormatter.format(token?.total_volume)}</div>
        </div>
        <div className="token-locked-small-block">
          <div className="token-locked-small-block-title">24H High</div>
          <div className="token-locked-small-block-big">{moneyFormatter.format(token?.high_24h)}</div>
        </div>
        <div className="token-locked-small-block">
          <div className="token-locked-small-block-title">24H Low</div>
          <div className="token-locked-small-block-big">{moneyFormatter.format(token?.low_24h)}</div>
        </div>
        <div className="token-locked-small-block">
          <div className="token-locked-small-block-title">Available Supply</div>
          <div className="token-locked-small-block-big">{moneyFormatter.format(token?.circulating_supply)}</div>
        </div>
      </div>
    </div>
  )
}
