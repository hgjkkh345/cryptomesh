import React from "react"

import "../PoolItem/PoolItem.scss"
import { moneyFormatter, routes } from "../../utils"
import { Link, useSearchParams } from "react-router-dom"
import cn from "classnames"

type Props = {
  pool: any
  staked: number
  walletBalance: number
  notHide: boolean
}

export const PoolItemStaked = ({ pool, staked, walletBalance, notHide }: Props): JSX.Element => {
  const [search] = useSearchParams()

  return (
    <Link
      to={`${routes.farms}?token=${pool.token}&${search.toString()}`}
      className={cn("pool-item", {
        hide: !notHide,
      })}
    >
      <div className="pool-item-header">
        <img alt="pool" src={pool?.icon} className="pool-item-header-img" />
        <div className="pool-item-header-title">{pool?.name}</div>
      </div>
      <div className="pool-item-content">
        <div className="pool-item-content-block">
          <dt className="pool-item-content-block-label">Token</dt>
          <dd className="pool-item-content-block-value">{pool?.token}</dd>
        </div>
        <div className="pool-item-content-block">
          <dt className="pool-item-content-block-label">Staked</dt>
          <dd className="pool-item-content-block-value">{staked}</dd>
        </div>
        <div className="pool-item-content-block">
          <dt className="pool-item-content-block-label">Wallet Balance</dt>
          <dd className="pool-item-content-block-value">{moneyFormatter.format(walletBalance)}</dd>
        </div>
      </div>
    </Link>
  )
}
