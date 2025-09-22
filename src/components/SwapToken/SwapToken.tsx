import React from "react"

import "./SwapToken.scss"
import { SimpleButton } from "../SimpleButton"
import cn from "classnames"
import {moneyFormatter, routes} from "../../utils"

type Props = {
  token: any
}

export const SwapToken = ({ token }: Props): JSX.Element => {
  return (
    <div className="swap-token">
      <div className="swap-token-content">
        <div className="swap-token-left">
          <div className="swap-token-left-header">
            <img src={token?.image} alt="token" className="swap-token-left-header-img" />
            {token?.name}
            <div className="swap-token-left-header-desc">({token?.symbol.toString().toUpperCase()})</div>
          </div>
          <div className="swap-token-left-footer">
            {moneyFormatter.format(token?.current_price)}
            <div
              className={cn("swap-token-left-footer-percents", {
                green: !token?.price_change_24h?.toString().includes("-"),
                red: token?.price_change_24h?.toString().includes("-"),
              })}
            >
              {!token?.price_change_24h?.toString().includes("-") && "+"}
              {`${token?.price_change_24h?.toFixed(5)}$`}
            </div>
          </div>
        </div>
        <div className="swap-token-right">
          <SimpleButton text="Stake" variant="border" href={`${routes.farms}?token=${token?.symbol.toString().toUpperCase()}`} />
        </div>
      </div>
    </div>
  )
}
