import React, { useState } from "react"

import "./SwapPair.scss"
import { SimpleButton } from "../SimpleButton"
import { moneyFormatter, routes } from "../../utils"
import { useSearchParams } from "react-router-dom"

type Props = {
  pair: any
  stat: any
  hardSetSecond?: boolean
}

export const SwapPair = ({ pair, stat, hardSetSecond }: Props): JSX.Element => {
  const [search] = useSearchParams()

  return (
    <div className="swap-pair">
      <div className="swap-pair-content">
        <div className="swap-pair-left">
          <div className="swap-pair-left-header">
            <img src={pair?.icon || ""} alt="token" className="swap-pair-left-header-img" />
            {pair?.token} - {pair?.day} Days
            <div className="swap-pair-left-header-percents">{pair?.percent}%</div>
          </div>
          <div className="swap-pair-left-footer">
            <img src={pair?.icon} alt="token" className="swap-pair-left-footer-img" />1 {pair?.token} ={" "}
            {moneyFormatter.format(stat?.find(iOther => iOther?.id === pair?.id)?.current_price)}
          </div>
        </div>
        <div className="swap-pair-right">
          <SimpleButton
            href={`${routes.farms}?token=${pair?.token}&index=${pair?.index}&${search.toString()}`}
            text="Stake Now"
            variant="border"
          />
          <SimpleButton href={`${routes.swap}?${search.toString()}`} text="Trade" variant="colored"  />
        </div>
      </div>
    </div>
  )
}
