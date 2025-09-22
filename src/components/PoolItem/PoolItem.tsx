import React from "react"

import "./PoolItem.scss"
import { moneyFormatter, routes } from "../../utils"
import { Link, useSearchParams } from "react-router-dom"

type Props = {
  pool: any
  totalBalance: number
  walletBalance: number
}

export const PoolItem = ({ pool, totalBalance, walletBalance }: Props): JSX.Element => {
  const [search] = useSearchParams()

  return (
    <Link to={`${routes.farms}?token=${pool.token}&${search.toString()}`} className="pool-item">
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
          <dt className="pool-item-content-block-label">Total Value Locked</dt>
          <dd className="pool-item-content-block-value">
            {totalBalance === 0 ? "Loading..." : moneyFormatter.format(totalBalance)}
          </dd>
        </div>
        <div className="pool-item-content-block">
          <dt className="pool-item-content-block-label">Wallet Balance</dt>
          <dd className="pool-item-content-block-value">{moneyFormatter.format(walletBalance)}</dd>
        </div>
      </div>
    </Link>
  )
}
