import React, {useEffect, useState} from "react"

import "./SwapTable.scss"
import { SimpleButton } from "../SimpleButton"
import cn from "classnames"
import { moneyFormatter } from "../../utils"
import img22 from "assets/icons/all-chains/base1.svg"

type Props = {
  onClick?: (v: string) => void
  tokens: any[]
}

export const SwapTable = ({ onClick, tokens }: Props): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [sortedCoins, setSortedCoins] = useState([])

  const toggleOpen = () => setOpen(!open)

  useEffect(() => {
    if (!!tokens) {
      const localTokens = tokens;
      const ethToken = localTokens.find(i => i.id === 'ethereum')
      localTokens.push({
        ...ethToken,
        symbol: 'ETH(Base)',
        image: img22,
      })
      setSortedCoins(localTokens.sort((a, b) => Number(b.market_cap) - Number(a.market_cap)))
    }
  }, [tokens])

  return (
    <div className="swap-table">
      <div className="swap-table-content">
        <div className="swap-table-content-scroll">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Token</th>
                <th className="right">Price</th>
                <th className="right">Price Change</th>
                <th className="right">Marketcap</th>
              </tr>
            </thead>
            <tbody>
              {(open ? sortedCoins : sortedCoins.slice(0, 8)).map((i, index) => (
                <tr
                  onClick={() => {
                    onClick && onClick(`${i?.id}`)
                  }}
                  key={index}
                  className={cn({
                    click: onClick,
                  })}
                >
                  <td>{index + 1}</td>
                  <td className="swap-table-content-item">
                    <img src={i?.image} alt="token" /> {i?.symbol.toUpperCase()}
                  </td>
                  <td className="right">{moneyFormatter.format(i?.current_price)}</td>
                  <td
                    className={cn("right", {
                      green: !i?.price_change_24h?.toString().includes("-"),
                      red: i?.price_change_24h?.toString().includes("-"),
                    })}
                  >
                    {!i?.price_change_24h?.toString().includes("-") && "+"}
                    {`${i?.price_change_24h?.toFixed(5)}$`}
                  </td>
                  <td className="right">{moneyFormatter.format(i?.market_cap)}</td>
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
