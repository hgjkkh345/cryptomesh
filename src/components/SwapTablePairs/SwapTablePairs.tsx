import React, { useEffect, useState } from "react"

import "../SwapTable/SwapTable.scss"
import { SimpleButton } from "../SimpleButton"
import { allCoins, moneyFormatter, routes } from "../../utils"

type Props = {
  stat: any[]
  onClick: (pool: any) => void
}

export const SwapTablePairs = ({ stat, onClick }: Props): JSX.Element => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(!open)

  return (
    <div className="swap-table">
      <div className="swap-table-content">
        <div className="swap-table-content-scroll">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Pool</th>
                <th className="right">TVL</th>
              </tr>
            </thead>
            <tbody>
              {(open ? stat : stat?.slice(0, 8))?.map((i, index) => (
                <tr
                  onClick={() => {
                    onClick(`${i.token}-${i.index}`)
                  }}
                  key={index}
                >
                  <td>{index + 1}</td>
                  <td className="swap-table-content-item">
                    <img
                      src={allCoins.find(coin => coin.id === i.id)?.icon}
                      alt="token"
                      className="swap-table-content-item-imgToken"
                    />
                    {`${i.token} - ${i.day} Day`}
                    {/*<div className="swap-table-content-item-percents">{i.bid_ask_spread_percentage}%</div>*/}
                  </td>
                  <td className="right">{moneyFormatter.format(i.tvl)}</td>
                  {/*<td className="right">{i.volume}</td>*/}
                  {/*<td className="right">{i.volume7}</td>*/}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SimpleButton onClick={toggleOpen} text={open ? "Hide" : "Show More"} variant="border" />
      </div>
    </div>
  )
}
