import React from "react"

import "./SwapMover.scss"
import cn from "classnames"
import { moneyFormatter } from "../../utils"

type Props = {
  img: string
  pricePercents: number
  priceNow: number
  name: string
  onClick: () => void
}

export const SwapMover = ({ img, priceNow, pricePercents, name, onClick }: Props): JSX.Element => {
  return (
    <button onClick={onClick} className="swap-mover">
      <div className="swap-mover-content">
        <div className="swap-mover-header">
          <img src={img} alt="eth" className="swap-mover-header-img" />
          {name}
        </div>
        <div className="swap-mover-data">
          {moneyFormatter.format(priceNow)}
          <div
            className={cn("swap-mover-data-price", {
              green: pricePercents?.toString().includes("-"),
              red: pricePercents?.toString().includes("-"),
            })}
          >
            {pricePercents}%
          </div>
        </div>
      </div>
    </button>
  )
}
